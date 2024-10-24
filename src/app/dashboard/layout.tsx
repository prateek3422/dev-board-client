import { Sidebars } from "@/components";
import { DashWrapper } from "@/lib";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashWrapper>
      <main>
        <Sidebars children={children} />
      </main>
    </DashWrapper>
  );
}
