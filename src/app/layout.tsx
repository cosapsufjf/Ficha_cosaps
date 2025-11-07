import "./globals.css";
import "./globals_phone.css";

import type { Metadata } from "next";
import { FormProvider } from "@/managed_context/FormContext";

export const metadata: Metadata & { version: string } = {
  title: "Ficha COSAPS",
  description: "Projeto de ficha interativa do Cosaps, que converte em planilha",
  version: "0.9.0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}