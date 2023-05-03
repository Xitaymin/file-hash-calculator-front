import React from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import StartHashing from "./StartHashing";
import {useStoredState} from "../common/Storage";

const hashFunctions = ["SHA1", "SHA256", "MD5"] as const
export type HashType = typeof hashFunctions[number]

interface Props {
}

export const ControlPanel: React.FC<Props> = () => {

    const [path, setPath] = useStoredState<string>("path","" )
    const [hashTypes, setHashTypes] = useStoredState<HashType[]>("hashTypes", [])

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPath(event.target.value);
    };

    return (
        <Grid spacing={2} justifyContent="center" direction={"column"} container={true} alignItems={"center"} rowSpacing={2} columnSpacing={2}>
            <Grid item width={"85%"}>
                <TextField
                    id="outlined-basic"
                    label="Enter path to file"
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                    value={path}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={8}>
                <FormGroup row={true}>
                    {hashFunctions.map(element => {
                        return (
                            <FormControlLabel key={element} control={
                                <Checkbox
                                    onChange={e => setHashTypes(prev => e.target.checked ? [...prev, element] : prev.filter(it => it !== element))}
                                    checked={hashTypes.includes(element)}/>}
                                    label={element}/>
                        )
                    })
                    }
                    <StartHashing path={path} hashTypes={hashTypes} />
                </FormGroup>
            </Grid>
        </Grid>
    );
};