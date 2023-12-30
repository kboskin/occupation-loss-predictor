import Header from "../../components/header";
import MainVideo from "../../components/video";
import {useTranslation} from "next-i18next";
import Footer from "../../components/footer";
import LossesTable from "../../components/losses/table";
import {useGetLossesQuery} from "../../redux/losses/lossesApi";
import LineChart from "../../components/losses/chart";
import GroupChart from "../../components/losses/groupChart";


const Home = () => {
    const {t} = useTranslation("common");
    const {data, isLoading, error} = useGetLossesQuery({});

    return (
        <div>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={isLoading} losses={data}/>
            <GroupChart data={data}/>
            <Footer/>
        </div>
    );
}


export default Home;
