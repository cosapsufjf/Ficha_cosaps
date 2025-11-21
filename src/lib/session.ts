// precisa revisar esse código

import crypto from "crypto";

type Payload = { [key: string]: any; exp?: number };

const ALGO = "sha256";

function base64url(input: Buffer | string) {
  const b = typeof input === "string" ? Buffer.from(input) : input;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export function signToken(payload: Payload, maxAgeSeconds = 60 * 60) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Missing SESSION_SECRET env var");

  const header = { alg: "HS256", typ: "JWT" };
  const exp = nowSeconds() + maxAgeSeconds;
  const body = { ...payload, exp };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedBody = base64url(JSON.stringify(body));
  const data = `${encodedHeader}.${encodedBody}`;

  const hmac = crypto.createHmac(ALGO, secret).update(data).digest();
  const signature = base64url(hmac);

  return `${data}.${signature}`;
}

export function verifyToken(token: string) {
  try {
    const secret = process.env.SESSION_SECRET;
    if (!secret) throw new Error("Missing SESSION_SECRET env var");

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedBody, signature] = parts;
    const data = `${encodedHeader}.${encodedBody}`;

    const expectedHmac = crypto.createHmac(ALGO, secret).update(data).digest();
    const expectedSig = base64url(expectedHmac);

    const sigIsValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig));
    if (!sigIsValid) return null;

    const bodyJson = Buffer.from(encodedBody.replace(/_/g, "/").replace(/-/g, "+") + "===", "base64").toString();
    const body = JSON.parse(bodyJson) as Payload;

    if (typeof body.exp === "number" && body.exp < nowSeconds()) return null;

    return body;
  } catch (err) {
    return null;
  }
}