import {
    ButtonGroup,
    Spinner,
    Table,
    TableBody,
    TableColumn,
    TableHeader,
    TableRow,
    TableCell,
    Image
} from "@nextui-org/react";
import {useMemo, useState} from "react";
import {useTranslation} from "next-i18next";
import LossesColumnHeader from "./header";
import {Loss, LossType} from "../../../redux/losses/models";
import moment, {MomentInput} from "moment";
import {Button} from "@nextui-org/button";
import {mapCategoryToTranslation, mapCategoryToImage} from "../../../utils/category";

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
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
}

const LossesTable = (props: LossesTableProps) => {

    const {t} = useTranslation()
    const [period, setPeriod] = useState(Periods.DAY)
    const today = moment();

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col">
                <h2 className="text-start text-2xl lg:text-4xl mb-8 lg:mb-4 font-bold text-white">{t('losses_table_header')}</h2>
                <h3 className="text-start text-xl lg:text-2xl font-thin text-white">{t('losses_table_subheader')}</h3>

                <h3 className="text-center text-xl font-thin mt-8 text-white">{t('losses_table_subheader_statistics')}</h3>

                <div className="flex justify-center gap-4 lg:gap-12 items-end mt-8">
                    <ButtonGroup
                        radius="sm"
                        variant="bordered"
                        size="md"
                    >
                        <LossesColumnHeader name={t('losses_header_last_day')} selected={period == Periods.DAY}
                                            onSelect={() => setPeriod(Periods.DAY)}/>
                        <LossesColumnHeader name={t('losses_header_last_week')} selected={period == Periods.WEEK}
                                            onSelect={() => setPeriod(Periods.WEEK)}/>
                        <LossesColumnHeader name={t('losses_header_last_month')} selected={period == Periods.MONTH}
                                            onSelect={() => setPeriod(Periods.MONTH)}/>
                        <LossesColumnHeader name={t('losses_header_last_year')} selected={period == Periods.YEAR}
                                            onSelect={() => setPeriod(Periods.YEAR)}/>
                    </ButtonGroup>
                </div>
            </div>
        )
    }, [period])

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
            // item is a categorized input

            let lossesIncr = item.history
                .map((item) => item.day_increment)
                .reduce((i1, i2) => i1 + i2, 0)

            // it's in response, simply getting
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
                    <TableCell
                        className="text-start">
                        <Button
                            disabled
                            variant="light"
                            className="text-large text-light-grey"
                            startContent={
                                <Image
                                    className="border-none text-light-grey w-[18px] md:w-[35px] lg:w-[50px]"
                                    src={mapCategoryToImage(aggrItem.type)}
                                    alt={`${aggrItem.type} representation icon`}/>
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
                                        alt={`${aggrItem.type} growth icon`}/>
                                    : null
                            }>
                            {aggrItem.periodIncr < 1 ? t('losses_no_changes') : `+ ${aggrItem.periodIncr}`}
                        </Button>
                    </TableCell>
                </TableRow>
            )
        })

    return (
        <div className="pl-2 pr-2">
            <Table
                removeWrapper
                isHeaderSticky
                hideHeader
                aria-label="Losses table"
                topContent={props.isLoading ? [] : topContent}
                topContentPlacement="outside"
                className="pt-6 min-h-[300px] text-center max-w-[650px] m-auto text-light-grey"
                bottomContentPlacement="outside"
            >
                <TableHeader>
                    <TableColumn key="name">Category</TableColumn>
                    <TableColumn key="height">Loss count</TableColumn>
                    <TableColumn key="mass">Increase</TableColumn>
                </TableHeader>
                <TableBody
                    className="center"
                    isLoading={props.isLoading}
                    loadingContent={<Spinner color="white"/>}>
                    {mapLossesToRows(props?.losses ?? [], period)}
                </TableBody>
            </Table>
        </div>
    );
}

export default LossesTable