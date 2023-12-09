/* eslint-disable  @typescript-eslint/no-explicit-any */

import Home from "./home";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
})

export default Home