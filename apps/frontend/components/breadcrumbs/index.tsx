import {usePathname} from "next/navigation";
import React from "react";
import {BreadcrumbItem, Breadcrumbs, Button, DropdownItem, DropdownMenu} from "@nextui-org/react";
import {Dropdown, DropdownTrigger} from "@nextui-org/dropdown";
import AVAILABLE_LOCALES from "../../utils/available_locales";

interface BreadcrumbItemsProps {

}

const BreadcrumbItems = (_: BreadcrumbItemsProps) => {
    const paths = usePathname()
    const pathNames = [...paths.split('/').filter(path => path)]
    const localeNames = AVAILABLE_LOCALES

    return (
        <Breadcrumbs
            className="lg:ms-20 ms-2 mt-4 mb-4"
            maxItems={5}
            itemsBeforeCollapse={1}
            itemsAfterCollapse={pathNames.length}
            renderEllipsis={({items, ellipsisIcon, separator}) => (
                <div className="flex items-center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                isIconOnly
                                className="min-w-6 w-6 h-6"
                                size="sm"
                                variant="flat"
                            >
                                {ellipsisIcon}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Routes">
                            {items.map((item, index) => (
                                <DropdownItem key={index} href={item.href}>
                                    {item.children}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    {separator}
                </div>
            )}
        >
            <BreadcrumbItem href={"/"}>
                {"Home"}
            </BreadcrumbItem>
            {localeNames.map(value => {
                return (
                    <BreadcrumbItem key={value} href={`/${value}`}>
                        {value}
                    </BreadcrumbItem>)
                }
            )}
            {pathNames.map((value) => {
                return (<BreadcrumbItem key={value}>{value}</BreadcrumbItem>)
            })}
        </Breadcrumbs>
    )
}

export default BreadcrumbItems