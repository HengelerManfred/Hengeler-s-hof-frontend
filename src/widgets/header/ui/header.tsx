import { AuthButtons } from "@/features/auth/authButtons";
import { LanguagePicker } from "@/features/header/ui/languagePicker";
import { Navbar } from "@/features/header/ui/navbar";
import { TextLogo } from "@/shared/ui/textLogo";
import clsx from "clsx";

export default function Header({ hasImage }: { hasImage?: boolean }) {
  return (
    <header
      id="header"
      className={clsx(
        "w-[100dvw] hidden [@media(min-width:1248px)]:flex justify-center z-1000",
        "transition-bg duration-300 ease-in-out",
        !hasImage && "bg-[var(--accent)] relative",
        hasImage && "bg-transparent absolute"
      )}
    >
      <div className="flex justify-between items-center gap-9 py-[10px] min-w-3/4">
        <h1>
          <TextLogo/>
        </h1>
        <span className="flex items-center gap-[15px]">
          <Navbar />
          <LanguagePicker />
          <AuthButtons />
        </span>
      </div>
    </header>
  );
}
