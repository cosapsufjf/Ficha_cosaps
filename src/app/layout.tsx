import "./globals.css";
import "./globals_phone.css";

import type { Metadata } from "next";
import { FormProvider } from "@/managed_context/FormContext";

export const metadata: Metadata & { version: string } = {
  title: "Ficha COSAPS",
  description: "Projeto de ficha interativa do Cosaps, que permite a visualização de dados de pacientes a partir do google drive",
  version: "1.1.1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body>
        <FormProvider>
          {children}
        </FormProvider>
      </body>
    </html>
  );
}