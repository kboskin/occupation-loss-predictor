import {Button, Image, Link} from "@nextui-org/react";
import {useTranslation} from "next-i18next";

interface SupportImageProps {
    title: string
    src: string
    link: string
    address: string
}
const SupportCryptoBlock = ({title, src, link, address}: SupportImageProps) => {
    const {t} = useTranslation()

    return <>
        <div className="flex flex-col justify-center text-center w-7/12 mt-8">
            <h3 className="text-2xl mb-8 mt-4 font-bold w-full">{title}</h3>
            <Image
                alt={title}
                src={src}
            />
            <Button variant="bordered" color="warning" onClick={() => copyToClipboard(address)} className="mt-4 w-full text-center">{t('common.support_the_twt_address')}</Button>
            <Link showAnchorIcon target="_blank" href={link} color="secondary" className="mt-4 w-full text-center">{t('common.support_the_twt')}</Link>
        </div>
    </>
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error(err);
  }
};

export default SupportCryptoBlock