import React, {useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button
} from "@nextui-org/react";
import Logo from "../logo";
import {useTranslation} from "next-i18next";


const Header = () => {
    const {t} = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen} maxWidth={'2xl'}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"/>
                <NavbarBrand>
                    <Logo width={50} height={50} />
                    <p className="font-bold text-inherit px-10">{t("common.app_title")}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden lg:flex" justify="center">
                <NavbarItem key={"header_item_statistic"}>
                    <Link
                        className="w-auto px-8 text-white"
                        href="/#numerical-losses-statistics">
                        {t("common.header_item_statistic")}
                    </Link>
                </NavbarItem>
                <NavbarItem key={"header_item_forecast"}>
                    <Link
                        className="w-auto px-8 text-white"
                        href="/#forecast-charts">
                        {t("common.header_item_forecast")}
                    </Link>
                </NavbarItem>
                <NavbarItem key={"header_item_aggregation"}>
                    <Link
                        className="w-auto px-8 text-white"
                        href="/#aggregation-chart">
                        {t("common.header_item_aggregation")}
                    </Link>
                </NavbarItem>
                <NavbarItem key={"header_item_support_us"}>
                    <Link
                        className="w-auto px-8"
                        color="warning"
                        href="/#support-project-container">
                        {t("common.header_item_support_us")}
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden lg:flex" justify="end">
                <NavbarItem>
                    <Link href={t('common.link_support_army')} target="_blank" rel="noopener noreferrer">
                        <Button color="danger" href={t('common.link_support_army')} variant="flat" >
                            {t('common.header_item_army_support')}
                        </Button>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key={"header_item_statistic"}>
                    <Link
                        className="w-auto text-white"
                        href="/#numerical-losses-statistics"
                        size="lg">
                        {t("common.header_item_statistic")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key={"header_item_forecast"}>
                    <Link
                        className="w-auto text-white"
                        href="/#forecast-charts"
                        size="lg">
                        {t("common.header_item_forecast")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key={`header_item_aggregation`}>
                    <Link
                        className="w-auto text-white"
                        href="/#aggregation-chart"
                        size="lg">
                        {t("common.header_item_aggregation")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key={`header_item_support_us`}>
                    <Link
                        className="w-auto"
                        color="warning"
                        href="/#support-project-container"
                        size="lg">
                        {t("common.header_item_support_us")}
                    </Link>
                </NavbarMenuItem>
                 <NavbarMenuItem>
                    <Link color="danger" size="lg" href={t('common.link_support_army')} target="_blank" rel="noopener noreferrer">
                        {t('common.header_item_army_support')}
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

export default Header