import Image from "next/image";


export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className="relative h-screen w-screen">
      <Image src="/images/login.jpg" alt="login" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/30"></div>
      {children}
    </main>
  );
}
