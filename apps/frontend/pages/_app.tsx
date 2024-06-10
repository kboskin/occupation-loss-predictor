import "../styles/globals.scss";
import {appWithTranslation} from 'next-i18next'
import {NextUIProvider} from "@nextui-org/react";
import React from 'react';
import {AppProps} from 'next/app';
import {Providers} from "../redux/provider";
import { Ubuntu } from 'next/font/google'
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const ubuntu = Ubuntu({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin', 'cyrillic-ext'],
    display: 'swap',
})


const MyApp = ({Component, pageProps}: AppProps) => {
    return (
        <Providers>
            <NextUIProvider>
                <main className={"text-foreground bg-background " + ubuntu.className}>
                    <Component {...pageProps} />
                </main>
            </NextUIProvider>
        </Providers>
    );
}


export default appWithTranslation(MyApp);