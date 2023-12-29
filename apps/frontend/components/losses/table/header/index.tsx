import {Button} from "@nextui-org/react";

interface LossesColumnHeaderProps {
    name: string,
    selected: boolean,
    onSelect: VoidFunction
}

const LossesColumnHeader = (props: LossesColumnHeaderProps) => {
    return (
        <Button color="default" onClick={props.onSelect}
                className={props.selected ? "fill-grey text-black" : "text-light-grey"}>
            {props.name}
        </Button>
    )
}

export default LossesColumnHeader

