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


const Home = () => {
    const {t} = useTranslation("common");
    const {data: lossesData, isLoading: lossesLoading, error: lossesError} = useGetLossesQuery({});
    const {data: yearlyData, isLoading: yearlyLoading, error: yearlyError} = useGetYearlyAggregationQuery({});
    const {data: categoryData, isLoading: categoryLoading, error: categoryError} = useGetCategoryAggregationQuery({});

    return (
        <div>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={lossesLoading} losses={lossesData}/>
            <GroupChart data={lossesData}/>
            <SupportTheProject />
            <RadialGroupChart data={yearlyData} isLoading={yearlyLoading}/>
            <Separator/>
            <CategoryBarGroupChart data={categoryData} isLoading={categoryLoading}/>
            <Footer/>
        </div>
    );
}


export default Home;
