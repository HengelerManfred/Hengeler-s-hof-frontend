import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative h-screen w-screen">
      <img
        src="/images/login.jpg"
        alt="login"
        className="object-cover w-full h-full absolute inset-0"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30"></div>
      {children}
    </main>
  );
}
