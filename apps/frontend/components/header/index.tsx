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


export default function Header() {
    const {t} = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen} maxWidth={'2xl'}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"/>
                <NavbarBrand justify="start">
                    <Logo width={50} height={50} />
                    <p className="font-bold text-inherit px-10">{t("app_title")}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex" justify="center">
                <NavbarItem>
                    <Link
                        className="w-auto px-8"
                        href="#">
                        {t("header_item_losses")}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="w-auto px-8"
                        href="#">
                        {t("header_item_numbers")}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className="w-auto px-8"
                        color="warning"
                        href="#">
                        {t("header_item_support_us")}
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex" justify="end">
                <NavbarItem>
                    <Button as={Link} color="danger" href="#" variant="flat">
                        {t('header_item_army_support')}
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem key={"item_losses"}>
                    <Link
                        className="w-auto"
                        href="#"
                        size="lg">
                        {t("header_item_losses")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key={`item_numbers`}>
                    <Link
                        className="w-auto"
                        href="#"
                        size="lg">
                        {t("header_item_numbers")}
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem key={`item_support_us`}>
                    <Link
                        className="w-auto"
                        color={"warning"}
                        href="#"
                        size="lg">
                        {t("header_item_support_us")}
                    </Link>
                </NavbarMenuItem>
                 <NavbarMenuItem>
                    <Link color="danger" href="#" variant="flat">
                        {t('header_item_army_support')}
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}
