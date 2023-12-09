import "../styles/globals.scss";
import { appWithTranslation } from 'next-i18next'
import {NextUIProvider} from "@nextui-org/react";
import React from 'react';
import { AppProps } from 'next/app';


const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <NextUIProvider>
            <main className="dark text-foreground bg-background">
                <Component {...pageProps} />
            </main>
        </NextUIProvider>
    );
}


export default appWithTranslation(MyApp);