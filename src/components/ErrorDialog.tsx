import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React from "react";

interface Props {
    opened: boolean;
    error: string;
    onClose(): void;
}

export function ErrorDialog(props: Props) {
    return <Dialog onClose={props.onClose} open={props.opened}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
            <DialogContentText>{props.error}</DialogContentText>
        </DialogContent>
    </Dialog>;
}