import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {GetStaticProps} from "next";
import {analytics} from "../firebase";
import {useTranslation} from "next-i18next";
import {lossesApi,} from "../redux/losses/lossesApi";
import MainVideo from "../components/video";
import LossesTable from "../components/losses/table";
import GroupChart from "../components/losses/groupLineChart";
import SupportTheProject from "../components/support";
import RadialGroupChart from "../components/losses/aggregation/yearGroupChart";
import Separator from "../components/separator";
import CategoryBarGroupChart from "../components/losses/aggregation/categoryGroupChart";
import SeoHead from "../components/seo";
import Header from "../components/header";
import {Loss} from "../redux/losses/models";
import FAQ from "../components/faq";
import Footer from "../components/footer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {store} from "../redux/store";
import BreadcrumbItems from "../components/breadcrumbs";
import {SideBySideLayout} from "../components/news/combined_news_row";

interface HomeProps {
    lossesData: Loss[];
    yearlyData: AggregationResult;
    categoryData: ChartAggregationResult;
}

const Home = ({lossesData, yearlyData, categoryData}: HomeProps) => {
    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "main_page_viewed");
        }
    }, []);

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

    const {t} = useTranslation();

    return (
        <>
            <SeoHead
                title={t("main_page.main_page_title")}
                description={t("main_page.main_page_description")}
                imagePath={`/images/img_logo.png`}
            />
            {/*<SideBySideLayout newsItems={items} losses={lossesData} period={'day'}/>*/}
            <Header/>
            <MainVideo/>
            <BreadcrumbItems/>
            <LossesTable isLoading={false} losses={lossesData}/>
            <Separator/>
            <GroupChart data={lossesData}/>
            <Separator/>
            <SupportTheProject/>
            <Separator/>
            <RadialGroupChart data={yearlyData} isLoading={false}/>
            <Separator/>
            <CategoryBarGroupChart data={categoryData} isLoading={false}/>
            <FAQ
                faqTitle={t("main_page.faq_title")}
                faqs={Array.from(Array(6).keys()).map((number) => ({
                    question: t(`main_page.faq_main_q_${number}`),
                    answer: t(`main_page.faq_main_a_${number}`),
                }))}
            />
            <Footer/>
        </>
    );
};


export const getStaticProps: GetStaticProps = async ({locale}) => {

    // Fetch data using RTK Query endpoints
    const lossesData = await store.dispatch(lossesApi.endpoints.getLosses.initiate("")).unwrap();
    const yearlyData = await store.dispatch(lossesApi.endpoints.getYearlyAggregation.initiate("")).unwrap();
    const categoryData = await store.dispatch(lossesApi.endpoints.getCategoryAggregation.initiate("")).unwrap();

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
            lossesData,
            yearlyData,
            categoryData,
        },
        revalidate: 7200, // Revalidate every 2 hours
    };
};

export default Home;