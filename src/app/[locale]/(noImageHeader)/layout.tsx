import "./../../globals.css";
import Header from "@/widgets/header/ui/header";
import BurgerHeader from "@/widgets/header/ui/burgerHeader";
import { loadContacts } from "@/entities/api/contact.service";

export default async function NoImageHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contacts = await loadContacts();
  return (
    <>
      <Header hasImage={false} />
      <BurgerHeader contacts={contacts} hasImage={false} />
      {children}
    </>
  );
}
