import React from "react";
import {Card, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/react";
import NewsCardFooter from "./news_card_footer";

interface NewsRowProps {
    items: {
        title: string;
        subtitle: string;
        imageUrl: string;
        url: string;
        footerTitle: string;
        footerSubtitle: string;
    }[];
}


const NewsRow3top2bottom = ({items}: NewsRowProps) => {

    const getColumnSpanClass = (index: number) => {
        if (index === 3) return "col-span-12 sm:col-span-5";
        if (index === 4) return "col-span-12 sm:col-span-7";
        return "col-span-12 sm:col-span-4";
    };

    return (
        <div className="flex text-center m-auto justify-center">
            <div className="gap-6 grid grid-cols-12 grid-rows-2 px-2">
                {items.map((item, index) => (
                    <Card key={index} className={`h-[300px] ${getColumnSpanClass(index)}`}>
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
                        <NewsCardFooter title={item.footerTitle} subtitle={item.footerSubtitle}></NewsCardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

const NewsGrid = (props: NewsRowProps) => {

    return (
        <div className="flex text-center m-auto justify-center">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2">
                {props.items.map((item, index) => (
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
                        <NewsCardFooter title={item.footerTitle} subtitle={item.footerSubtitle}></NewsCardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export {NewsGrid};

export default NewsRow3top2bottom