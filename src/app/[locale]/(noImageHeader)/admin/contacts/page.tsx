
import { loadContacts } from "@/entities/api/contact.service";
import AdminContactsClient from "@/widgets/contacts/contactsFrom";

export default async function AdminContacts() {
  const contacts = await loadContacts();

  return <AdminContactsClient initialContacts={contacts} />;
}
