import {List} from "@mui/material";
import {KeyValueListItem} from "./KeyValueListItem";
import React, {useEffect, useState} from "react";
import {MultiHashTaskResult} from "./HashResults";
import {useParams} from "react-router-dom";
import {getHashResult} from "../api/Api";
import ButtonAppBar from "./BasicAppBar";
import {Root} from "./StartHashing";


export function FinishedTaskInfo() {

    const [hashResult, setHashResult] = useState<MultiHashTaskResult>()

    let {taskId} = useParams();

    useEffect(() => {
        getHashResult(taskId!!)
            .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
            .then((result) => setHashResult(result))
            .catch((reason => console.log(reason)))
    }, [taskId])

    let view = <h2>{`Task with id = ${taskId} not found`}</h2>

    if (hashResult !== undefined) {
        view = <Root>
            <List key={hashResult.id}>
                <KeyValueListItem name="Path" value={hashResult.settings.path}/>
                {hashResult.status !== "Finished" ? <KeyValueListItem name="Functions" value={hashResult.settings.hashTypes.toString()}/> : null}
                <KeyValueListItem name="Status" value={hashResult.status}/>
                <KeyValueListItem name="Average speed" value={hashResult.averageSpeed.toString()} suffix={" Mb/s"}/>
                <KeyValueListItem name="Duration" value={hashResult.duration.value + " " + hashResult.duration.timeUnit}/>
                {Object.entries(hashResult.result).map(([first, second]) => <KeyValueListItem name={first} value={second}/>)}
            </List>
        </Root>
    }

    return <>
        <ButtonAppBar/>
        {view}
    </>
}

