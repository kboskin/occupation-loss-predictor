import {Image} from "@nextui-org/react";

interface LogoProps {
    width: number,
    height: number
}
export default function Logo(props: LogoProps) {
    return (
        <Image
            alt="Russian army losses prediction logo"
            width={props.width}
            height={props.height}
            src="/images/img_logo.png"
        />
    )
}