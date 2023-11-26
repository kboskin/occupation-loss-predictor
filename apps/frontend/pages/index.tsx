import Home from "./home";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Page(props) {
  return <Home props={props} />;
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
})