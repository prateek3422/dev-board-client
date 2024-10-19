import { ReactQueryProvider } from "@/lib";

import "@/styles/globals.css";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body className=" bg:background dark:bg-background inter">
        <ReactQueryProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ReactQueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
