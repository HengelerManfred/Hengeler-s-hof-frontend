import { loadFeatures, loadPriceList } from "@/entities/api/adminSettings.service";
import { loadContacts } from "@/entities/api/contact.service";
import { loadHeaderSlider } from "@/entities/api/slider.service";
import { Attractions } from "@/widgets/mainPage/attractions";
import { HeaderCarousel } from "@/widgets/mainPage/headerCarousel";
import { MainMap } from "@/widgets/mainPage/mainMap";
import { Rooms } from "@/widgets/mainPage/rooms";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const locale = (await params).locale;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_CURRENT_HOST!),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        de: "/de",
        uk: "/uk",
      },
    },
  };
};
// const slides = [
//   {
//     id: "1",
//     titleKey: "slide1.title",
//     textKey: "",
//     image: "/images/main.png",
//   },
//   {
//     id: "2",
//     titleKey: "slide5.title",
//     textKey: "",
//     image: "/images/deer.jpg"
//   },
//   {
//     id: "3",
//     titleKey: "slide4.title",
//     textKey: "slide4.text",
//     image: "/images/house2.jpg"
//   },
//   {
//     id: "4",
//     titleKey: "slide6.title",
//     textKey: "slide6.text",
//     image: "/images/house3.jpg"
//   },
//   {
//     id: "5",
//     titleKey: "slide3.title",
//     textKey: "slide3.text",
//     image: "/images/bicycles.png",
//   },
// ];

export default async function Home() {
  let contacts;
  let headerSlides;
  let priceList;
  let features;
  try {
    contacts = await loadContacts();
    headerSlides = await loadHeaderSlider();
    priceList = await loadPriceList();
    features = await loadFeatures();
    if (!contacts || !headerSlides) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <main className="w-[100dvw] flex pb-[24px] flex-col items-center gap-[24px]">
      <HeaderCarousel slides={headerSlides.slides} />
      <Rooms priceList={priceList} features={features} />
      <Attractions />
      <MainMap contacts={contacts} />
    </main>
  );
}
