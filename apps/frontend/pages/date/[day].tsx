import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {useTranslation} from "next-i18next";

import {GetServerSideProps} from "next";
import {analytics} from "../../firebase";
import SeoHead from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {getServerSideTranslations} from "../../utils/locale";
import NewsRow3top2bottom, {NewsGrid} from "../../components/news";
import SupportTheProject from "../../components/support";
import Separator from "../../components/separator";
import BreadcrumbItems from "../../components/breadcrumbs";

interface DayPageParams {
    day: string
}

const DayPage = (props: DayPageParams) => {

    const {t} = useTranslation();

    useEffect(() => {
        analytics && logEvent(analytics, `day_${props.day}_page_viewed`);
    }, [props.day])

    const items = [
        {
            title: "What to watch",
            subtitle: "Stream the Acme event",
            imageUrl: "https://nextui.org/images/card-example-4.jpeg",
            footerTitle: "New",
            footerSubtitle: "Available soon.",
            buttonText: "Notify Me"
        },
        {
            title: "Plant a tree",
            subtitle: "Contribute to the planet",
            imageUrl: "https://nextui.org/images/card-example-3.jpeg",
            footerTitle: "Your day your way",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App"
        }
    ];
    return (
        <>
            <SeoHead title={t('day_page.day_page_title')} description={t('day_page.day_page_description')}
                     imagePath={`/images/img_logo.png`}/>
            <Header/>
            <BreadcrumbItems/>
            <Separator/>
            <NewsRow3top2bottom items={items}/>
            <Separator/>
            <SupportTheProject />
            <Separator/>
            <NewsGrid items={items}/>
            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = getServerSideTranslations;


export default DayPage