import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {GetServerSideProps, GetStaticProps} from "next";
import {analytics} from "../firebase";
import {useTranslation} from "next-i18next";
import {
    lossesApi,
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
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { store } from "../redux/store";

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
        imagePath={`${process.env.NEXT_PUBLIC_SITE_URL}images/img_logo.png`}
      />
      <Header />
      <MainVideo />
      <LossesTable isLoading={false} losses={lossesData} />
      <GroupChart data={lossesData} />
      <SupportTheProject />
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