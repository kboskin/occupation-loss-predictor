import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {GetServerSideProps, GetStaticProps} from "next";
import {analytics} from "../firebase";
import {useTranslation} from "next-i18next";
import {
    useGetCategoryAggregationQuery,
    useGetLossesQuery,
    useGetYearlyAggregationQuery
} from "../redux/losses/lossesApi";
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
import {getServerSideTranslations} from "../utils/locale";

interface HomeProps { }

const Home = (_: HomeProps) => {

    useEffect(() => {
        analytics && logEvent(analytics, 'main_page_viewed');
    }, [])

    const {t} = useTranslation();
    const {data: lossesData, isLoading: lossesLoading, error: lossesError} = useGetLossesQuery("");
    const {data: yearlyData, isLoading: yearlyLoading, error: yearlyError} = useGetYearlyAggregationQuery("");
    const {data: categoryData, isLoading: categoryLoading, error: categoryError} = useGetCategoryAggregationQuery("");

    return (
        <>
            <SeoHead title={t('main_page.main_page_title')} description={t('main_page.main_page_description')} imagePath={`${process.env.NEXT_PUBLIC_SITE_URL}images/img_logo.png`}/>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={lossesLoading} losses={lossesData as Loss[]}/>
            <GroupChart data={lossesData as Loss[]}/>
            <SupportTheProject />
            <RadialGroupChart data={yearlyData} isLoading={yearlyLoading}/>
            <Separator/>
            <CategoryBarGroupChart data={categoryData} isLoading={categoryLoading}/>
            <FAQ faqTitle={t('main_page.faq_title')} faqs={[...Array.from(Array(6).keys())].map((number) => {
                return {question: t(`main_page.faq_main_q_${number}`), answer: t(`main_page.faq_main_a_${number}`)}
            })}/>
            <Footer/>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = getServerSideTranslations;

export default Home