'use client';

import { useState } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import clsx from "clsx";
import { Contacts } from "@/entities/model/contacts";
import { updateContacts, updateSocialMedia } from "@/entities/api/contact.service";
import { useTranslations } from "next-intl";

interface Props {
  initialContacts: Contacts;
}

export default function AdminContactsClient({ initialContacts }: Props) {
  const  t  = useTranslations("AdminSettings");
  const tCommon  = useTranslations("Common");
  const [contacts, setContacts] = useState<Contacts>(initialContacts);
  const [saving, setSaving] = useState(false);

  const inputBaseClass =
    'bg-[var(--section-bg)] h-[30px] border-1 outline-none border-[var(--section-border)] rounded-lg p-2';
  const socialInputClass =
    'flex items-center gap-3 bg-[var(--section-bg)] border-1 border-[var(--section-border)] rounded-lg p-2';

  const handleChange = (key: keyof Contacts, value: string) => {
    setContacts({ ...contacts, [key]: value });
  };

  const handleSaveContacts = async () => {
    setSaving(true);
    try {
      await updateContacts(contacts);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async () => {
    setSaving(true);
    try {
      await updateSocialMedia(contacts);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-9/10 lg:w-3/4 flex gap-3">
      <div className="w-2/5 rounded bg-[var(--section-bg)] py-[10px] px-5 border-1 border-[var(--section-border)] flex flex-col gap-4">
        <span className="text-[20px] font-medium">{t('adminPanel')}</span>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="country" className="text-[16px]">
            {tCommon('country') || 'Country'}
          </label>
          <input id="country" name="Country" className={clsx(inputBaseClass)} value={contacts.country} onChange={e => handleChange("country", e.target.value)} />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex w-[48%] flex-col">
            <label htmlFor="post" className="text-[16px]">
              {tCommon('plz') || 'Postal code'}
            </label>
            <input id="post" name="Post" className={clsx(inputBaseClass)} value={contacts.postalCode} onChange={e => handleChange("postalCode", e.target.value)} />
          </div>
          <div className="flex w-[48%] flex-col">
            <label htmlFor="street" className="text-[16px]">
              {tCommon('street') || 'Street'}
            </label>
            <input id="street" name="Street" className={clsx(inputBaseClass)} value={contacts.street} onChange={e => handleChange("street", e.target.value)} />
          </div>
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="city" className="text-[16px]">
            {tCommon('city') || 'City'}
          </label>
          <input id="city" name="City" className={clsx(inputBaseClass)} value={contacts.city} onChange={e => handleChange("city", e.target.value)} />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex w-[48%] flex-col">
            <label htmlFor="telefon" className="text-[16px]">
              {tCommon('phone') || 'Phone number'}
            </label>
            <input id="telefon" name="telefon" className={clsx(inputBaseClass)} value={contacts.phoneNumber} onChange={e => handleChange("phoneNumber", e.target.value)} />
          </div>
          <div className="flex w-[48%] flex-col">
            <label htmlFor="email" className="text-[16px]">
              {tCommon('email') || 'Email'}
            </label>
            <input id="email" name="Email" className={clsx(inputBaseClass)} value={contacts.email} onChange={e => handleChange("email", e.target.value)} />
          </div>
        </div>

        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={saving}
          type="button"
          onClick={handleSaveContacts}
          sx={{
            backgroundColor: 'var(--accent)',
            '&:hover': {
              backgroundColor: 'var(--accent)',
            },
            alignSelf: 'start',
          }}
        >
          {tCommon('save') || 'Save'}
        </Button>
      </div>

      <div className="w-2/5 h-fit rounded bg-[var(--section-bg)] border-1 border-[var(--section-border)] p-5 flex flex-col gap-4">
        <span className="text-[20px] font-medium">{tCommon('socialMedia') || 'Social Media'}</span>

        {[
          { key: "facebook", icon: <FacebookIcon />, placeholder: "Facebook URL" },
          { key: "telegram", icon: <TelegramIcon />, placeholder: "@username" },
          { key: "whatsapp", icon: <WhatsAppIcon />, placeholder: "+49 123 456789" },
          { key: "instagram", icon: <InstagramIcon />, placeholder: "@insta_username" },
        ].map(({ key, icon, placeholder }) => (
          <div className={socialInputClass} key={key}>
            {icon}
            <input
              type="text"
              placeholder={placeholder}
              name={key}
              className="w-full bg-transparent outline-none text-[15px]"
              value={(contacts as unknown as Record<string, string>)[key]}
              onChange={e => handleChange(key as keyof Contacts, e.target.value)}
            />
          </div>
        ))}

        <Button
          variant="contained"
          type="button"
          startIcon={<SaveIcon />}
          disabled={saving}
          onClick={handleSaveSocialMedia}
          sx={{
            backgroundColor: 'var(--accent)',
            '&:hover': {
              backgroundColor: 'var(--accent)',
            },
            alignSelf: 'start',
          }}
        >
          {tCommon('save') || 'Save'}
        </Button>
      </div>
    </div>
  );
}
