import React, { useEffect } from "react";
import { logEvent } from "@firebase/analytics";
import { GetStaticProps } from "next";
import { analytics } from "../firebase";
import { useTranslation } from "next-i18next";
import { lossesApi } from "../redux/losses/lossesApi";
import MainVideo from "../components/video";
import LossesTable from "../components/losses/table";
import GroupChart from "../components/losses/groupLineChart";
import SupportTheProject from "../components/support";
import RadialGroupChart from "../components/losses/aggregation/yearGroupChart";
import Separator from "../components/separator";
import CategoryBarGroupChart from "../components/losses/aggregation/categoryGroupChart";
import SeoHead from "../components/seo";
import Header from "../components/header";
import { Loss } from "../redux/losses/models";
import FAQ from "../components/faq";
import Footer from "../components/footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { store } from "../redux/store";
import BreadcrumbItems from "../components/breadcrumbs";

interface HomeProps {
    lossesData: Loss[];
    yearlyData: AggregationResult;
    categoryData: ChartAggregationResult;
}

const Home = ({ lossesData, yearlyData, categoryData }: HomeProps) => {
    useEffect(() => {
        if (analytics) {
            logEvent(analytics, "main_page_viewed");
        }
    }, []);


    const { t } = useTranslation();

    return (
        <>
            <SeoHead
                title={t("main_page.main_page_title")}
                description={t("main_page.main_page_description")}
                imagePath={`/images/img_logo.png`}
            />
            <Header />
            <MainVideo />
            <BreadcrumbItems />
            <LossesTable isLoading={false} losses={lossesData} isDayStyle={false} />
            <Separator />
            <GroupChart data={lossesData} />
            <Separator />
            <SupportTheProject />
            <Separator />
            <RadialGroupChart data={yearlyData} isLoading={false} />
            <Separator />
            <CategoryBarGroupChart data={categoryData} isLoading={false} />
            <FAQ
                faqTitle={t("main_page.faq_title")}
                faqs={Array.from(Array(6).keys()).map((number) => ({
                    question: t(`main_page.faq_main_q_${number}`),
                    answer: t(`main_page.faq_main_a_${number}`),
                }))}
            />
            <Footer />
        </>
    );
};


export const getStaticProps: GetStaticProps = async ({locale}) => {
    console.log('Revalidating data...');

    // Fetch data using RTK Query endpoints
    const lossesData = await store.dispatch(lossesApi.endpoints.getLosses.initiate({}, { forceRefetch: true })).unwrap();
    const yearlyData = await store.dispatch(lossesApi.endpoints.getYearlyAggregation.initiate("", { forceRefetch: true })).unwrap();
    const categoryData = await store.dispatch(lossesApi.endpoints.getCategoryAggregation.initiate("", { forceRefetch: true })).unwrap();

    // console.log(lossesData[0]['history'].filter((value) => value['time'] == '2024-07-03T00:00:00'))
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ['common'])),
            lossesData,
            yearlyData,
            categoryData,
        },
        revalidate: 3600, // Revalidate every 2 hours
    };
};

export default Home;