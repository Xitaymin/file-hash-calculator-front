import React, {useCallback, useState} from "react";
import {Button} from "@mui/material";
import {sendStartHashRequest} from "../api/Api";
import {ErrorDialog} from "./ErrorDialog";
import {HashType} from "./ControlPanel";
import styled from "@emotion/styled";

export interface MultiHashSettings {
    path: string;
    hashTypes: HashType[];
}

export const Root = styled.div`
  display: flex;
  alignItems: center;
  justifyContent: center;
`

const StartHashing: React.FC<MultiHashSettings> = ({path, hashTypes}) => {
    const [, setResponse] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {

        if(path.length === 0) {
            setError(()=> "Please enter path to file")
            return
        }

        if(hashTypes.length === 0) {
            setError(()=> "Choose at least one hash function")
        return
        }


        try {
            const response = await sendStartHashRequest({path, hashTypes});
            if (response.ok) {
                setResponse(await response.json());
            } else {
                console.log(response);
                setError(await response.text())
            }
        } catch (error) {
            console.log("error :: ", error)
        }
    };

    return (
        <Root>
            <Button style={{
                position: 'relative',
                padding: '5px',
                alignItems: 'center',
                justifyContent: 'center'
            }} variant="contained"
                    onClick={
                        handleSubmit
                    }
            >
                Start
            </Button>
            <ErrorDialog error={error ?? ""} opened={!!error} onClose={() => setError(null)} />
        </Root>
    );
};

export default StartHashing;
