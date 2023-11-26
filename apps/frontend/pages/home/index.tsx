import Header from "../../components/header";
import { useTranslation } from "next-i18next";


const Home = () => {
    const { t } = useTranslation("common");

    return (
        <div>
            <Header/>
            <div>
                {t("app_title")}
            </div>
            <div>
                {t("app_title")}
            </div>
        </div>
    );
}


export default Home;
