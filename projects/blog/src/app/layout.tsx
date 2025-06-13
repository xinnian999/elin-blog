import type { Metadata } from "next";
import { Layout, GlobalProvider } from "@/components";
import "./globals.css";
import { getTheme, getLang } from "@/async";

export const metadata: Metadata = {
  title: "Elin's Blog",
  description: "This is Elin's Blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  const theme = await getTheme();

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        <GlobalProvider value={{ theme, lang }}>
          <Layout>{children}</Layout>
        </GlobalProvider>
      </body>
    </html>
  );
}
