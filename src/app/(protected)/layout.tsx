import { Navbar } from "@/components/molecules/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="py-10 px-8">{children}</main>
      <Toaster
        position="top-right"
        duration={2500}
        toastOptions={{
          classNames: {
            toast: "bg-green-200 border-green-300 text-green-700",
          },
        }}
      />
    </>
  );
}
