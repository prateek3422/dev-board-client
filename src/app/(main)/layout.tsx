import type { Metadata } from "next";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: "Devwave",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer/> */}
    </>
  );
}
