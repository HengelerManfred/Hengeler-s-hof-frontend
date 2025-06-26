
import { loadSlides } from "@/entities/api/slide.service";import { CreateSlide} from "@/widgets/settings/createSlide";
import { SlideList } from "@/widgets/settings/slideList";
// const slides = [
//     {
//         id: "1",
//         titleKey: "slide1.title",
//         descriptionKey: "",
//         imageUrl: "/images/main.png",
//     },
//     {
//         id: "2",
//         titleKey: "slide5.title",
//         descriptionKey: "",
//         imageUrl: "/images/deer.jpg"
//     },
//     {
//         id: "3",
//         titleKey: "slide4.title",
//         descriptionKey: "slide4.text",
//         imageUrl: "/images/house2.jpg"
//     },
//     {
//         id: "4",
//         titleKey: "slide6.title",
//         descriptionKey: "slide6.text",
//         imageUrl: "/images/house3.jpg"
//     },
//     {
//         id: "5",
//         titleKey: "slide3.title",
//         descriptionKey: "slide3.text",
//         imageUrl: "/images/bicycles.png",
//     },
// ];

export default async function AdminMainPage() {
    const slides = await loadSlides() ?? [];

    return (
        <div className="relative w-6/8 flex gap-3">
            <CreateSlide />
            <SlideList slides={slides} />
        </div>
    );
}