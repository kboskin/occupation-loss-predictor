import Header from "../../components/header";
import MainVideo from "../../components/video";
import {useTranslation} from "next-i18next";
import Footer from "../../components/footer";
import LossesTable from "../../components/losses/table";
import {useGetLossesQuery, useGetYearlyAggregationQuery} from "../../redux/losses/lossesApi";
import SupportTheProject from "../../components/support";
import RadialGroupChart from "../../components/losses/aggregation/yearGroupChart";
import GroupChart from "../../components/losses/groupLineChart";


const Home = () => {
    const {t} = useTranslation("common");
    const {data: lossesData, isLoading: lossesLoading, error: lossesError} = useGetLossesQuery({});
    const {data, isLoading, error} = useGetYearlyAggregationQuery({});

    return (
        <div>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={lossesLoading} losses={lossesData}/>
            <GroupChart data={lossesData}/>
            <SupportTheProject />
            <RadialGroupChart data={data} isLoading={isLoading}/>
            <Footer/>
        </div>
    );
}


export default Home;
