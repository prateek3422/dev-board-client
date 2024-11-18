import {ReactQueryProvider} from "@/lib";

import "@/styles/globals.css";

import {Toaster} from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="Vector.ico" sizes="any" />
      </head>
      <body className=" bg:background dark:bg-neutral-900 inter " >
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
