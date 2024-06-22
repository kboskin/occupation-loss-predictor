import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {useTranslation} from "next-i18next";
import Link from "next/link";

const Footer = () => {
    const {t} = useTranslation()
    return (
        <footer className="content-center">
            <Table className="footer pt-2" aria-label="AI losses footer">
                <TableHeader>
                    <TableColumn className="footer-title text-lg text-center text-amber-300">
                        {t('common.footer_column_disclaimer')}
                    </TableColumn>
                    <TableColumn
                        className="footer-title text-lg">{t('common.footer_column_navigation')}</TableColumn>
                    <TableColumn
                        className="footer-title text-lg">{t('common.footer_column_contacts')}</TableColumn>

                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell
                            className="width-45 text-center">{t('common.footer_column_disclaimer_approximate')}</TableCell>
                        <TableCell><Link href={"#"}>{t('common.footer_column_total_losses_aggregation')}</Link></TableCell>
                        <TableCell className="width-30">✌🏻🇺🇦</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell className="width-45 text-center whitespace-pre-wrap">
                            {t('common.footer_column_disclaimer_ai')}
                        </TableCell>
                        <TableCell><Link href={"#"}>{t('common.footer_column_tomorrow_forecast')}</Link></TableCell>
                        <TableCell className="width-30">{t('common.contacts_email')}</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell
                            className="width-45 text-center whitespace-pre-wrap">{t('common.footer_column_source')}</TableCell>
                        <TableCell><Link href={"#"}>{t('common.footer_column_support_project')}</Link></TableCell>
                        <TableCell className="width-30"><Link className="hidden" href="https://cloudflex.team" rel="dofollow">Developed by CloudFlex - custom software development</Link></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <p className="text-center mt-8">{t('common.footer_copyright')}</p>
        </footer>
    );
};

export default Footer;
