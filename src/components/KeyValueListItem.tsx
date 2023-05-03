import {ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {Link} from "react-router-dom";
interface Props{
    name: string,
    value: string,
    address?: string,
    suffix?: string
}

export function KeyValueListItem(props: Props) {
    let element = props.address === undefined ? props.value : <Link to = {props.address}>{props.value}</Link>

    return <ListItem>
        <Typography sx={{marginRight: 2, marginLeft: 2}} display="inline"
                    variant={"subtitle2"}
                    color={"grey"}>{props.name}: </Typography>
        <Typography display="inline" variant={"subtitle2"}
                    color={"black"}>{element} {props.suffix} </Typography>
    </ListItem>;
}