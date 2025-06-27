"use client";

import { useRouter } from "next/navigation";

interface AcceptButtonProps {
  text: string;
}

const COOKIE_NAME = "cookies-accepted";

export function AcceptButton({ text }: AcceptButtonProps) {
  const router = useRouter();
  const acceptCookies = () => {
    document.cookie = `${COOKIE_NAME}=true; max-age=${
      60 * 60 * 24 * 365
    }; path=/`;
    router.refresh();
  };

  return (
    <button
      aria-label="Accept cookies"
      className="bg-[var(--main-bg)] text-[var(--primary-text)] px-4 py-2 rounded-md"
      onClick={acceptCookies}
    >
      {text}
    </button>
  );
}
