import Header from "../../components/header";
import MainVideo from "../../components/video";
import {useTranslation} from "next-i18next";
import Footer from "../../components/footer";
import LossesTable from "../../components/losses/table";
import {useGetLossesQuery} from "../../redux/losses/lossesApi";
import LineChart from "../../components/losses/chart";


const Home = () => {
    const {t} = useTranslation("common");
    const {data, isLoading, error} = useGetLossesQuery({});

    return (
        <div>
            <Header/>
            <MainVideo/>
            <LossesTable isLoading={isLoading} losses={data}/>
            {data && data.map((dataItem) =>
                <LineChart data={dataItem.history.slice(-30)}
                           forecast={dataItem.prediction.slice(-30)}
                           category={dataItem.type}/>
            )}
            <Footer/>
        </div>
    );
}


export default Home;
