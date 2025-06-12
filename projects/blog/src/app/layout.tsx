import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Layout, GlobalProvider } from "@/components";
import "./globals.css";
import { getTheme } from "@/async";

export const metadata: Metadata = {
  title: "Elin's Blog",
  description: "This is Elin's Blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = (await getLocale()) as Lang;

  const messages = await getMessages();

  const theme = await getTheme();

  return (
    <html lang={lang} data-theme={theme}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <GlobalProvider value={{ theme, lang }}>
            <Layout>{children}</Layout>
          </GlobalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
