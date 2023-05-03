import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TaskDetailInfo} from "./components/TaskDetailInfo";
import {Home} from "./components/Home";
import {FinishedTaskInfo} from "./components/FinishedTaskInfo";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path = "/progress/:taskId" element={<TaskDetailInfo/> }/>
                <Route path = "/result/:taskId" element={<FinishedTaskInfo/> }/>
                <Route path = "/" element={<Home/>}/>
            </Routes>

        </BrowserRouter>

    </React.StrictMode>
);

