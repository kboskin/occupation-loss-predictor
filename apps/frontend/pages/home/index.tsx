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


const Home = () => {
    const {t} = useTranslation("common");
    const {data: lossesData, isLoading: lossesLoading, error: lossesError} = useGetLossesQuery("");
    const {data: yearlyData, isLoading: yearlyLoading, error: yearlyError} = useGetYearlyAggregationQuery("");
    const {data: categoryData, isLoading: categoryLoading, error: categoryError} = useGetCategoryAggregationQuery("");

    return (
        <div>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={lossesLoading} losses={lossesData as Loss[]}/>
            <GroupChart data={lossesData as Loss[]}/>
            <SupportTheProject />
            <RadialGroupChart data={yearlyData} isLoading={yearlyLoading}/>
            <Separator/>
            <CategoryBarGroupChart data={categoryData} isLoading={categoryLoading}/>
            <FAQ faqs={[{question: "Test", answer: "quest"}, {question: "Test2", answer: "quest2"}]}/>
            <Footer/>
        </div>
    );
}


export default Home;
