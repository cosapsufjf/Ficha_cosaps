import { NextRequest, NextResponse } from 'next/server';
import { baixarArquivoDrive } from '@/utils/utils'; 
import path from 'path';

// Você pode customizar para responder download direto (stream), ou enviar por link/JSON.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get('fileId');
  const tipo = searchParams.get('google') || 'binario';
  const mimeExport = searchParams.get('mimeExport') || '';
  const nomeDestinoRaw = searchParams.get('nomeDestino');

  const nomeDestino = nomeDestinoRaw ? path.basename(nomeDestinoRaw) : 'arquivo_drive';

  if (!fileId) {
    return NextResponse.json({ success: false, error: 'Parâmetro fileId obrigatório' }, { status: 400 });
  }

  try {
    await baixarArquivoDrive(fileId, `/tmp/${nomeDestino}`, "google", mimeExport);

    const fs = (await import('fs')).promises;
    const fileBuffer = await fs.readFile(`/tmp/${nomeDestino}`);

    const mimeType = mimeExport || 'application/octet-stream';

    return new NextResponse(fileBuffer as BodyInit, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${nomeDestino}"`,
      },
      status: 200,
    });
  } catch (err: any) {
    console.error('Erro ao baixar arquivo do Drive:', err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}