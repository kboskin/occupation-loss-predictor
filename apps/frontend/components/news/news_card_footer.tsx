import {Button} from "@nextui-org/react";
import {CardFooter} from "@nextui-org/card";
import React from "react";
import {useTranslation} from "next-i18next";

interface CardFooterProps {
    title: string
    subtitle: string
}

const NewsCardFooter = ({title, subtitle}: CardFooterProps) => {

    const {t} = useTranslation()
    return <>
        <CardFooter
            className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
                <div className="flex flex-col">
                    <p className="text-tiny text-white/60">{title}</p>
                    <p className="text-tiny text-white/60">{subtitle}</p>
                </div>
                <Button radius="full" size="sm">{t('day_page.read_button_text')}</Button>
            </div>
        </CardFooter>
    </>
}

export default NewsCardFooter