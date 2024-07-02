import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {GetServerSideProps} from "next";

export const getServerSideTranslations: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])), // Add other namespaces as needed
    },
  };
};