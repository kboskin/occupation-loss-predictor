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
        <div className="flex flex-col justify-center text-center w-7/12 mt-8">
            <h3 className="text-2xl mb-8 mt-4 font-bold w-full">{title}</h3>
            <Image
                alt={title}
                src={src}
            />
            <Link showAnchorIcon href={link} color="secondary" className="mt-4 w-full text-center">{t('support_the_twt')}</Link>
        </div>
    </>
}

export default SupportCryptoBlock