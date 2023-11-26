import {Image} from "@nextui-org/react";

export default function Logo(props) {
    return (
        <Image
            width={props.width}
            height={props.height}
            src="images/img_logo.png"
        />
    )
}