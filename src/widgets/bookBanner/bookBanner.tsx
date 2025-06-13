import { getTranslations } from "next-intl/server";
import { BookButton } from "@/shared/ui/buttons/bookButton";

export async function BookBanner() {
    const t = await getTranslations("HomePage");
    return (
        <div className="gap-2 flex items-center justify-center lg:px-4 lg:py-3 rounded-[8px] fixed left-1/2 top-11/12 -translate-x-1/2 -translate-y-1/2 bg-transparent lg:bg-[var(--accent-2)] lg:shadow-md z-[2] max-w-[90%] w-fit flex-wrap text-center">
            <span className="hidden lg:block text-[var(--section-bg)]">{t("bannerText")}</span>
            <BookButton disabled={false} />
        </div>
    )
}