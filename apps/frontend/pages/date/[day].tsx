import React, {useEffect} from "react";
import {logEvent} from "@firebase/analytics";
import {useTranslation} from "next-i18next";

import {GetServerSideProps, GetStaticPaths, GetStaticProps} from "next";
import {analytics} from "../../firebase";
import SeoHead from "../../components/seo";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {getServerSideTranslations} from "../../utils/locale";
import NewsRow from "../../components/news";
import SupportTheProject from "../../components/support";

interface DayPageParams {
    day: string
}

const DayPage = (props: DayPageParams) => {

    const {t} = useTranslation();

    useEffect(() => {
        analytics && logEvent(analytics, `day_${props.day}_page_viewed`);
    }, [props.day])

    return (
        <>
            <SeoHead title={t('day_page.day_page_title')} description={t('day_page.day_page_description')}
                     imagePath={`${process.env.NEXT_PUBLIC_SITE_URL}images/img_logo.png`}/>
            <Header/>
            <NewsRow/>
            <SupportTheProject />
            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = getServerSideTranslations;


export default DayPage