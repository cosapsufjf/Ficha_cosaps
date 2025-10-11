import "../style/style.css";
import type { Metadata } from "next";
import { FormProvider } from "@/managed_context/FormContext";

export const metadata: Metadata = {
  title: "Ficha COSAPS",
  description: "Projeto de ficha interativa do Cosaps, que converte em planilha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <head>
          <link rel="stylesheet" href="/Ficha_cosaps/_next/static/css/style.css" />
        </head>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}