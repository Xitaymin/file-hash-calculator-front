import Typography from "@mui/material/Typography";
import React from "react";

export function BlockTitle({title}: { title: string }) {
    return <Typography align={"center"} variant={"subtitle1"} color={"primary"}
                       sx={{margin: 2}}>{title}</Typography>;
}