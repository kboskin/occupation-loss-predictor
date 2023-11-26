import {Image} from "@nextui-org/react";

export default function Logo(props) {
    return (
        <Image
            alt="Russian army losses prediction logo"
            width={props.width}
            height={props.height}
            src="images/img_logo.png"
        />
    )
}