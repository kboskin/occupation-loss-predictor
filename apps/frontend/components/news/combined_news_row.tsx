import React, { useMemo, useState } from "react";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, Image, Spinner, Table, TableBody, TableCell, TableRow } from "@nextui-org/react";
import moment, { MomentInput } from "moment";
import { useTranslation } from "next-i18next";
import {Loss, LossType} from "../../redux/losses/models";
import {mapCategoryToImage, mapCategoryToTranslation} from "../../utils/category";

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

interface LossesTableProps {
    isLoading: boolean,
    losses: Loss[]
}

interface AggrDataPoint {
    periodIncr: number,
    periodTotal: number,
    type: LossType
}

enum Periods {
    DAY = 'day'
}

/**
 * NewsGrid component displays a responsive grid of news items.
 * The layout adjusts for 1 to 2 items per row based on screen size.
 */
const NewsGrid: React.FC<NewsRowProps> = ({ items }) => {
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
                        {item.footerTitle && item.footerSubtitle && (
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                <div className="flex flex-grow gap-2 items-center">
                                    <div className="flex flex-col">
                                        <p className="text-tiny text-white/60">{item.footerTitle}</p>
                                        <p className="text-tiny text-white/60">{item.footerSubtitle}</p>
                                    </div>
                                    {item.buttonText && (
                                        <Button radius="full" size="sm">{item.buttonText}</Button>
                                    )}
                                </div>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}

const LossesTable: React.FC<LossesTableProps> = (props) => {
    const { t } = useTranslation();
    const [period, setPeriod] = useState(Periods.DAY);
    const today = moment();

    const mapLossesToRows = (losses: Loss[], period: Periods) =>
        losses.map((lossItem) => {
            let updatedHistory = lossItem
                .history
                .filter((point) => moment(point.time as MomentInput).isSame(today, period))

            let updatedItem: Loss = {
                history: updatedHistory,
                type: lossItem.type,
                prediction: lossItem.prediction
            }

            return updatedItem
        }).map((item) => {
            let lossesIncr = item.history
                .map((item) => item.day_increment)
                .reduce((i1, i2) => i1 + i2, 0)

            let history = item.history.at(-1)
            let periodAggr = -1
            if (history) {
                periodAggr = history.losses
            }

            const aggrData: AggrDataPoint = {
                periodTotal: periodAggr,
                periodIncr: lossesIncr,
                type: item.type
            }
            return aggrData
        }).map((aggrItem) => {
            return (
                <TableRow key={aggrItem.type}>
                    <TableCell className="text-start">
                        <Button
                            disabled
                            variant="light"
                            className="text-large text-light-grey"
                            startContent={
                                <Image
                                    className="border-none text-light-grey w-[18px] md:w-[35px] lg:w-[50px]"
                                    src={mapCategoryToImage(aggrItem.type)}
                                    alt={`${aggrItem.type} representation icon`} />
                            }>
                            <strong>{mapCategoryToTranslation(aggrItem.type, t)}</strong>
                        </Button>
                    </TableCell>
                    <TableCell className="text-large text-end">{aggrItem.periodTotal}</TableCell>
                    <TableCell className="text-start text-large">
                        <Button
                            disabled
                            className="text-light-grey"
                            variant="light"
                            startContent={
                                aggrItem.periodIncr >= 1 ?
                                    <Image
                                        className="border-none text-light-grey"
                                        src={"images/ic_arrow_up.svg"}
                                        alt={`${aggrItem.type} growth icon`} />
                                    : null
                            }>
                            {aggrItem.periodIncr < 1 ? t('main_page.losses_no_changes') : `+ ${aggrItem.periodIncr}`}
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })

    return (
        <div className="pl-2 pr-2">
            <Table
                removeWrapper
                isHeaderSticky={false}
                aria-label="Losses table"
                className="pt-6 min-h-[300px] text-center max-w-[650px] m-auto text-light-grey"
            >
                <TableBody
                    className="center"
                    isLoading={props.isLoading}
                    loadingContent={<Spinner color="white" />}>
                    {mapLossesToRows(props?.losses ?? [], period)}
                </TableBody>
            </Table>
        </div>
    );
}

const SideBySideLayout: React.FC<{ newsItems: NewsRowProps['items'], losses: Loss[], period: Periods }> = ({ newsItems, losses }) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-4">
                <NewsGrid items={newsItems} />
            </div>
            <div className="w-full lg:w-1/2 p-4">
                <LossesTable isLoading={false} losses={losses} />
            </div>
        </div>
    );
}

export { NewsGrid, LossesTable, SideBySideLayout };
