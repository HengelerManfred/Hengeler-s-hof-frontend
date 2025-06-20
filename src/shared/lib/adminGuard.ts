import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";

export const useAdminGuard = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (!process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").includes(data?.user?.email ?? "")) {
      router.push("/");
    }
  }, [data, router, status]);

};
