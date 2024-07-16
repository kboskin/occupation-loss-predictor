import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {useTranslation} from "next-i18next";
import {GetStaticPaths, GetStaticProps} from "next";
import {analytics} from "../../firebase";
import SeoHead from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {lossesApi} from "../../redux/losses/lossesApi";
import SupportTheProject from "../../components/support";
import Separator from "../../components/separator";
import BreadcrumbItems from "../../components/breadcrumbs";
import {NewsAndStatistics} from "../../components/news/combined_news_row";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import store from "../../redux/store";
import NewsRow3top2bottom from "../../components/news";
import AVAILABLE_DATES from "../../utils/availdable_days";
import {Loss} from "../../redux/losses/models";
import FAQ from "../../components/faq";

interface DayPageProps {
    day: string;
    lossesData: Loss[]; // Adjust the type based on your actual data structure
}

const DayPage = ({day, lossesData}: DayPageProps) => {
    const {t} = useTranslation();

    useEffect(() => {
        if (analytics) {
            logEvent(analytics, `day_${day}_page_viewed`);
        }
    }, [day]);

    const items = [
        {
            title: "What to watch",
            subtitle: "Stream the Acme event",
            imageUrl: "https://nextui.org/images/card-example-4.jpeg",
            footerTitle: "New",
            footerSubtitle: "Available soon.",
            buttonText: "Notify Me",
            url: "test"
        },
        {
            title: "Plant a tree",
            subtitle: "Contribute to the planet",
            imageUrl: "https://nextui.org/images/card-example-3.jpeg",
            footerTitle: "Your day your way",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App",
            url: "test"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App",
            url: "test"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App",
            url: "test"
        },
        {
            title: "Supercharged",
            subtitle: "Creates beauty like a beast",
            imageUrl: "https://nextui.org/images/card-example-2.jpeg",
            footerTitle: "Breathing App",
            footerSubtitle: "Get a good night sleep.",
            buttonText: "Get App",
            url: "test"
        },
    ];

    return (
        <>
            <SeoHead
                title={t("day_page.day_page_title")}
                description={t("day_page.day_page_description")}
                imagePath={`/images/img_logo.png`}
            />
            <Header/>
            <BreadcrumbItems/>
            <NewsAndStatistics newsItems={items} losses={lossesData} day={day}/>
            <SupportTheProject/>
            <Separator/>
            <NewsRow3top2bottom items={items}/>
            <Separator/>
            <FAQ faqTitle={} faqs={}></FAQ>
            <Footer/>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Generate paths for each day
    const paths = AVAILABLE_DATES.map((day) => ({
        params: {day},
    }));

    return {
        paths,
        fallback: "blocking", // If a day isn't pre-rendered, Next.js will generate it on-demand
    };
};

export const getStaticProps: GetStaticProps = async ({locale, params}) => {
    const day = (params?.day || '') as string; // Get the day parameter

    if (day === '') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
        }
    }

    // Fetch data using RTK Query endpoints
    const paramsToFetch = {
        dateFrom: day,
        dateTo: day,
    };

    store.dispatch(lossesApi.util.resetApiState());

    const lossesData = await store.dispatch(
        lossesApi.endpoints.getLosses.initiate(paramsToFetch, {forceRefetch: true})
    ).unwrap();

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"])),
            day,
            lossesData,
        },
        revalidate: 3600, // Revalidate every 1 hours
    };
};

export default DayPage;
