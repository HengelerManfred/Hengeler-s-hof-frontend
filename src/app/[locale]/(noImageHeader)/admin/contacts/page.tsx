import { getTranslations } from "next-intl/server";
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import clsx from "clsx";

export default async function AdminContacts() {
    const t = await getTranslations("AdminSettings");
    const tCommon = await getTranslations("Common");
    const inputBaseClass =
        'bg-[var(--section-bg)] h-[30px] border-1 outline-none border-[var(--section-border)] rounded-lg p-2';
    const socialInputClass =
        'flex items-center gap-3 bg-[var(--section-bg)] border-1 border-[var(--section-border)] rounded-lg p-2';

    return (
        <div className="w-9/10 lg:w-3/4 flex gap-3">
            <div className="w-2/5 rounded bg-[var(--section-bg)] py-[10px] px-5 border-1 border-[var(--section-border)] flex flex-col gap-4">
                <span className="text-[20px] font-medium">{t('adminPanel')}</span>

                <div className="flex flex-col w-[48%]">
                    <label htmlFor="country" className="text-[16px]">
                        {tCommon('country', { defaultMessage: 'Country' })}
                    </label>
                    <input id="country" name="Country" className={clsx(inputBaseClass)} />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex w-[48%] flex-col">
                        <label htmlFor="post" className="text-[16px]">
                            {tCommon('plz', { defaultMessage: 'Postal code' })}
                        </label>
                        <input id="post" name="Post" className={clsx(inputBaseClass)} />
                    </div>
                    <div className="flex w-[48%] flex-col">
                        <label htmlFor="street" className="text-[16px]">
                            {tCommon('street', { defaultMessage: 'Street' })}
                        </label>
                        <input id="street" name="Street" className={clsx(inputBaseClass)} />
                    </div>
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="city" className="text-[16px]">
                        {tCommon('city', { defaultMessage: 'City' })}
                    </label>
                    <input id="city" name="City" className={clsx(inputBaseClass)} />
                </div>

                <div className="flex justify-between gap-4">
                    <div className="flex w-[48%] flex-col">
                        <label htmlFor="telefon" className="text-[16px]">
                            {tCommon('phone', { defaultMessage: 'Phone number' })}
                        </label>
                        <input id="telefon" name="telefon" className={clsx(inputBaseClass)} />
                    </div>
                    <div className="flex w-[48%] flex-col">
                        <label htmlFor="email" className="text-[16px]">
                            {tCommon('email', { defaultMessage: 'Email' })}
                        </label>
                        <input id="email" name="Email" className={clsx(inputBaseClass)} />
                    </div>
                </div>

                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                        backgroundColor: 'var(--accent)',
                        '&:hover': {
                            backgroundColor: 'var(--accent)',
                        },
                        alignSelf: 'start',
                    }}
                >
                    {tCommon('save', { defaultMessage: 'Save' })}
                </Button>
            </div>
            <div className="w-2/5 h-fit rounded bg-[var(--section-bg)] border-1 border-[var(--section-border)] p-5 flex flex-col gap-4">
                <span className="text-[20px] font-medium">{tCommon('socialMedia', { defaultMessage: 'Social Media' })}</span>

                <div className={socialInputClass}>
                    <FacebookIcon sx={{ color: 'var(--primary-text)' }} />
                    <input
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        className="w-full bg-transparent outline-none text-[15px]"
                    />
                </div>

                <div className={socialInputClass}>
                    <TelegramIcon sx={{ color: 'var(--primary-text)' }} />
                    <input
                        type="text"
                        placeholder="@username"
                        name="telegram"
                        className="w-full bg-transparent outline-none text-[15px]"
                    />
                </div>

                <div className={socialInputClass}>
                    <WhatsAppIcon sx={{ color: 'var(--primary-text)' }} />
                    <input
                        type="text"
                        placeholder="+49 123 456789"
                        name="whatsapp"
                        className="w-full bg-transparent outline-none text-[15px]"
                    />
                </div>

                <div className={socialInputClass}>
                    <InstagramIcon sx={{ color: 'var(--primary-text)' }} />
                    <input
                        type="text"
                        placeholder="@insta_username"
                        name="instagram"
                        className="w-full bg-transparent outline-none text-[15px]"
                    />
                </div>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                        backgroundColor: 'var(--accent)',
                        '&:hover': {
                            backgroundColor: 'var(--accent)',
                        },
                        alignSelf: 'start',
                    }}
                >
                    {tCommon('save', { defaultMessage: 'Save' })}
                </Button>
            </div>
        </div>
    )
}