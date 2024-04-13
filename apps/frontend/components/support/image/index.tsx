import {Image, Link} from "@nextui-org/react";
import {useTranslation} from "next-i18next";

interface SupportImageProps {
    title: string
    src: string
    link: string
}
const SupportCryptoBlock = ({title, src, link}: SupportImageProps) => {
    const {t} = useTranslation()

    return <>
        <div className="flex flex-col justify-center w-2/6 text-center">
            <h3 className="text-2xl mb-8 mt-4 font-bold">{title}</h3>
            <Image
                alt={title}
                src={src}
            />
            <Link isBlock showAnchorIcon href={link} color="secondary" className="mt-4">{t('support_the_twt')}</Link>
        </div>
    </>
}

export default SupportCryptoBlock