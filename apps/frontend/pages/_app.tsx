import "../styles/globals.scss";
import { appWithTranslation } from 'next-i18next'
import {NextUIProvider} from "@nextui-org/react";
import React, { Suspense } from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
// no remove
// import '../i18n';


const MyApp = ({ Component, pageProps }) => {
    return (
        <NextUIProvider>
            <main className="dark text-foreground bg-background">
                <Component {...pageProps} />
            </main>
        </NextUIProvider>
    );
}


export default appWithTranslation(MyApp);