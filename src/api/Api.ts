import {HashResponse, MultiHashTask} from "../components/HashResults";
import {MultiHashSettings} from "../components/StartHashing";

export async function sendStartHashRequest(settings: MultiHashSettings) {
    return await fetchBy({url: "http://localhost:8080/api/hash/start", method: "POST", body: JSON.stringify(settings)})
}

export async function stopHashTask(taskId: string) {
    return fetchBy({url: "http://localhost:8080/api/hash/stop", method: "POST", body: taskId})
}

export async function getHashResult(taskId: string) {
    return await fetchBy({url: `http://localhost:8080/api/hash/result`, method: "GET", pathParam: taskId})
}

export function getPeriodicHashResults(setData: (value: HashResponse) => void, interval: number) {
    return updatePeriodicResult<HashResponse>(interval,setData, "http://localhost:8080/api/hash/tasks", )
}

export function getPeriodicHashResult(setData: (value: MultiHashTask) => void, interval: number, id: string) {
    return updatePeriodicResult<MultiHashTask>(interval,setData, "http://localhost:8080/api/hash/progress", id)
}

function updatePeriodicResult<T>(interval: number, setData: (value: T) => void, url: string, pathParam?: string){

    let suffix = pathParam ? `/${pathParam}` : ""

    return setInterval(() => {
        fetch(`${url}${suffix}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => setData(data))
            .catch(error => {
                console.error(`Failed to get response: ${error}`);
            });
    }, interval);
}

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const
type HttpMethod = typeof methods[number]

async function fetchBy({
                           url,
                           method,
                           body,
                           pathParam
                       }: { url: string, method: HttpMethod, body?: string, pathParam?: string }) {

    let suffix = pathParam ? `/${pathParam}` : ""

    return await fetch(`${url}${suffix}`, {
        method: method,
        headers: {"Content-Type": "text/plain"},
        body: body
    });
}


