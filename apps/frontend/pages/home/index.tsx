import Header from "../../components/header";
import MainVideo from "../../components/video";
import {useTranslation} from "next-i18next";
import Footer from "../../components/footer";
import LossesTable from "../../components/losses/table";
import {
    useGetCategoryAggregationQuery,
    useGetLossesQuery,
    useGetYearlyAggregationQuery
} from "../../redux/losses/lossesApi";
import SupportTheProject from "../../components/support";
import RadialGroupChart from "../../components/losses/aggregation/yearGroupChart";
import GroupChart from "../../components/losses/groupLineChart";
import CategoryBarGroupChart from "../../components/losses/aggregation/categoryGroupChart";
import Separator from "../../components/separator";
import {Loss} from "../../redux/losses/models";
import FAQ from "../../components/faq";
import SeoHead from "../../components/seo";
import {analytics} from "../../firebase";
import {useEffect} from "react";
import {logEvent} from "@firebase/analytics";


const Home = () => {

    useEffect(() => {
        analytics && logEvent(analytics, 'main_page_viewed');
    }, [])

    const {t} = useTranslation("common");
    const {data: lossesData, isLoading: lossesLoading, error: lossesError} = useGetLossesQuery("");
    const {data: yearlyData, isLoading: yearlyLoading, error: yearlyError} = useGetYearlyAggregationQuery("");
    const {data: categoryData, isLoading: categoryLoading, error: categoryError} = useGetCategoryAggregationQuery("");

    return (
        <>
            <SeoHead title={t('main_page_title')} description={t('main_page_description')} imagePath={`${process.env.NEXT_PUBLIC_SITE_URL}images/img_logo.png`}/>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={lossesLoading} losses={lossesData as Loss[]}/>
            <GroupChart data={lossesData as Loss[]}/>
            <SupportTheProject />
            <RadialGroupChart data={yearlyData} isLoading={yearlyLoading}/>
            <Separator/>
            <CategoryBarGroupChart data={categoryData} isLoading={categoryLoading}/>
            <FAQ faqs={[...Array.from(Array(6).keys())].map((number) => {
                return {question: t(`faq_main_q_${number}`), answer: t(`faq_main_a_${number}`)}
            })}/>
            <Footer/>
        </>
    );
}


export default Home;
