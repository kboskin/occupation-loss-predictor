import Header from "../../components/header";
import MainVideo from "../../components/main_video";
import { useTranslation } from "next-i18next";
import Footer from "../../components/footer";


const Home = () => {
    const { t } = useTranslation("common");

    return (
        <div>
            <Header/>
            <MainVideo/>
            <Footer/>
        </div>
    );
}


export default Home;
