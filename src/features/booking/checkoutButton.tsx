import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { http } from "@/shared/api/http";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CalendarMonth } from "@mui/icons-material";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function CheckoutButton({
  roomId,
  numberOfDays,
  price,
  startDate,
  endDate,
  moreThanTwoPats,
  wholeHouse,
}: {
  roomId: string;
  numberOfDays: number;
  price: number;
  startDate: Date;
  endDate: Date;
  moreThanTwoPats: boolean;
  wholeHouse: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const t = useTranslations("BookingForm");

  const handleClick = async () => {
    if (
      !(roomId && price && numberOfDays && startDate && endDate) ||
      numberOfDays < 3
    ) {
      if (numberOfDays < 3) {
        toast.error(t("minStay", { count: 3 }));
      } else {
        toast.error(t("errors.fieldsNotFilled"));
      }
      return;
    }

    setLoading(true);

    if (!session.data?.user) {
      const params = new URLSearchParams({
        redirect: `/booking/${roomId}`,
        roomId,
        price: price.toString(),
        numberOfDays: numberOfDays.toString(),
        startDate: startDate.toLocaleDateString("sv-SE"),
        endDate: endDate.toLocaleDateString("sv-SE"),
        moreThanTwoPats: moreThanTwoPats.toString(),
        wholeHouse: wholeHouse.toString(),
      });

      router.push(`/auth/login?${params.toString()}`);
      return;
    }

    try {
      const { sessionId } = await http<{ sessionId: string }>(
        "Booking/create-stripe-session",
        {
          method: "POST",
          body: JSON.stringify({
            roomId,
            userId: session.data?.user.id,
            price,
            numberOfDays,
            startDate: startDate.toLocaleDateString("sv-SE"),
            endDate: endDate.toLocaleDateString("sv-SE"),
            moreThanTwoPats,
            wholeHouse,
          }),
        }
      );

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch {
      toast.error(t("errors.unknownError"));
    }

    setLoading(false);
  };

  return (
    <button
      className="w-full bg-[var(--accent)] text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={handleClick}
      disabled={loading}
    >
      <CalendarMonth />
      {loading
        ? `${t("loading")}`
        : `${t("bookNow")}` + (price ? ` ${price}€` : "")}
    </button>
  );
}
