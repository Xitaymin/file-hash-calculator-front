import {LinearProgress, List, ListItem} from "@mui/material";
import {StopHashing} from "./StopHashing";
import React from "react";
import {MultiHashTask} from "./HashResults";
import {KeyValueListItem} from "./KeyValueListItem";

interface Props {
    response: MultiHashTask,
    withLink: boolean

}
export function ActiveTaskInfo(props: Props){
    let address = props.withLink ? `progress/${props.response.id}` : undefined

    return  <List key={props.response.id}>
        <KeyValueListItem name= "Path" value = {props.response.settings.path} address = {address}/>
        <KeyValueListItem name= "Functions" value = {props.response.settings.hashTypes.toString()}/>
        <KeyValueListItem name= "Speed" value={props.response.speed.toFixed(2)} suffix= " Mb/s"/>

        <ListItem>
            <LinearProgress style={{width: "100%"}} variant="determinate"
                            value={props.response.progress}/>
        </ListItem>

        <ListItem>
            <StopHashing taskId={props.response.id}/>
        </ListItem>
    </List>


}