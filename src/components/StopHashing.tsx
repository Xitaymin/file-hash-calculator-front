import {Button} from "@mui/material";
import {stopHashTask} from "../api/Api";

export function StopHashing({taskId}: { taskId: string }) {

    const handleSubmit = async () => {
        try {
            await stopHashTask(taskId);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant="contained" onClick={
            handleSubmit
        }>Stop
        </Button>
    );
}