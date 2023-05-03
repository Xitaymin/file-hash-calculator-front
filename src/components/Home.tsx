import ButtonAppBar from "./BasicAppBar";
import {Grid} from "@mui/material";
import {ControlPanel} from "./ControlPanel";
import {HashResults} from "./HashResults";
import React from "react";

export function Home(){
    return <>
        <ButtonAppBar/>

        <Grid container={true}
              width={"100%"}
              padding={5}
              spacing={3}
              alignItems='center'
              direction='column'
        >

            <ControlPanel/>

            <Grid padding={2}>
                <HashResults pollingInterval={1000}/>
            </Grid>

        </Grid>
    </>
}
