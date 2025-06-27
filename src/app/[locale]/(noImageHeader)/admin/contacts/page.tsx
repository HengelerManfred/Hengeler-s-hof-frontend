
import { loadContacts } from "@/entities/api/contact.service";
import AdminContactsClient from "@/widgets/contacts/contactsFrom";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  robots: {
    index: false,
    follow: false,
  },
});

export default async function AdminContacts() {
  const contacts = await loadContacts();

  return <AdminContactsClient initialContacts={contacts} />;
}
