import React, {useCallback, useEffect, useMemo, useState} from 'react';

import StickyHeadTable from "./StickyHeaderTableWithPagination";
import {getPeriodicHashResults} from "../api/Api";
import {BlockTitle} from "./BlockTitle";
import {ActiveTaskInfo} from "./ActiveTaskInfo";
import {isType} from "../common/Utils";
import SockJS from "sockjs-client";

interface MultiHashSettings {
    path: string;
    hashTypes: string[];
}

export interface MultiHashTask {
    settings: MultiHashSettings;
    progress: number;
    id: string;
    speed: number;
}

interface Duration{
    timeUnit: string,
    value: number
}

const statuses = ['Finished', 'Stopped', 'Failed'] as const
type Status = typeof statuses[number]

export const isHashProgress = isType<MultiHashTask>(["progress", "settings", "speed"])

export interface MultiHashTaskResult{
    id: string;
    settings: MultiHashSettings;
    status: Status;
    result: { [key: string]: string };
    duration: Duration;
    averageSpeed: number;
}

export const isHashResult = isType<MultiHashTaskResult>(["result", "id", "settings", "status", "averageSpeed", "duration"])

export interface HashResponse {
    activeTasks: MultiHashTask[];
    finishedTasks: MultiHashTaskResult[]
}

export function HashResults({pollingInterval}: {pollingInterval: number}) {
    const [data, setData] = useState<HashResponse>();

    useEffect(() => {
        const interval = getPeriodicHashResults(setData, pollingInterval);
        return () => clearInterval(interval);
    }, [pollingInterval]);

    return (
        <div>
            {(data?.activeTasks.length) ?
                <div>
                    <BlockTitle title={"Active hashing tasks: "}/>

                    {data.activeTasks.map((response) => (
                        <ActiveTaskInfo response = {response} withLink={true}/>
                    ))}
                </div> : null}

            {data?.finishedTasks && data?.finishedTasks.length !== 0 &&
                <div>
                    <BlockTitle title="Completed, stopped and failed hashing tasks: " />
                    <StickyHeadTable rows={data.finishedTasks}/>
                </div>
            }
        </div>
    );
};
