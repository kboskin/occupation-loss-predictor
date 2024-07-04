import React from "react";
import {Card, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/react";
import {Loss} from "../../redux/losses/models";
import LossesTable from "../losses/table";
import NewsCardFooter from "./news_card_footer";
import {useTranslation} from "next-i18next";

interface NewsRowProps {
    items: {
        title: string;
        subtitle: string;
        imageUrl: string;
        url: string;
        footerTitle: string;
        footerSubtitle: string;
        buttonText: string;
    }[];
}

/**
 * NewsGrid component displays a responsive grid of news items.
 * The layout adjusts for 1 to 2 items per row based on screen size.
 */
const NewsGrid: React.FC<NewsRowProps> = ({items}) => {
    return (
        <div className="flex text-center m-auto justify-center">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 px-2">
                {items.map((item, index) => (
                    <Card key={index} className="w-full h-[300px]">
                        <CardHeader className="absolute z-10 top-1 flex-col items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">{item.subtitle}</p>
                            <h3 className="text-white font-medium text-large">{item.title}</h3>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src={item.imageUrl}
                        />
                        <NewsCardFooter title={item.title} subtitle={item.subtitle}></NewsCardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
const NewsAndStatistics: React.FC<{ newsItems: NewsRowProps['items'], losses: Loss[], day: string }> =
    ({newsItems, losses, day}) => {

    const { t } = useTranslation()
        return (
            <>
                <h2 className="text-3xl mt-4 font-bold mb-8 text-center">{t('day_page.page_heading').replace("%s", day)}</h2>
                <div className="flex flex-col lg:flex-row justify-center">
                    <div className="w-full lg:w-1/3">
                        <LossesTable isLoading={false} losses={losses} isDayStyle={true}/>
                    </div>
                    <div className="w-full lg:w-1/2 p-4">
                        <NewsGrid items={newsItems}/>
                    </div>
                </div>
            </>
        );
    }

export {NewsGrid, LossesTable, NewsAndStatistics};
