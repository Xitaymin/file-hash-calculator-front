import ButtonAppBar from "./BasicAppBar";
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {isHashProgress, isHashResult, MultiHashTask, MultiHashTaskResult} from "./HashResults";
import {getPeriodicHashResult} from "../api/Api";
import {ActiveTaskInfo} from "./ActiveTaskInfo";


export function TaskDetailInfo(){
    const [hashTask, setHashTask] = useState<MultiHashTask | MultiHashTaskResult>()

    let {taskId} = useParams();

    useEffect(() => {
        const interval = getPeriodicHashResult(setHashTask, 1000, taskId!!);
        return () => clearInterval(interval);
    }, [taskId]);

    let view = null

    if(hashTask !== undefined && isHashProgress(hashTask)) {
        view = <ActiveTaskInfo withLink={false} response={hashTask}/>
    }

    if(hashTask !== undefined && isHashResult(hashTask)){
        return <Navigate to = {`/result/${hashTask.id}`}/>
    }

    return <>
    <ButtonAppBar/>
        {view}
        </>
}