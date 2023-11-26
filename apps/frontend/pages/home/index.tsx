import Header from "../../components/header";
import MainVideo from "../../components/main_video";
import { useTranslation } from "next-i18next";


const Home = () => {
    const { t } = useTranslation("common");

    return (
        <div>
            <Header/>
            <MainVideo/>
        </div>
    );
}


export default Home;
