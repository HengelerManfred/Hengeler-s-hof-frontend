import { BookBanner } from "@/widgets/bookBanner/bookBanner";

export default async function ImageHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <BookBanner />
      {children}
    </>
  );
}
