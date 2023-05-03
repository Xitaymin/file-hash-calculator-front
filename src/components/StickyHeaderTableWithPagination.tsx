import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {MultiHashTaskResult} from "./HashResults";
import {Link} from "react-router-dom";

interface Props {
    rows: MultiHashTaskResult[],
}

export default function StickyHeadTable({rows}: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table sx={{minWidth: 650}} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Path</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Function</TableCell>
                            <TableCell align="center">Results</TableCell>
                            <TableCell align="center">Average speed (Mb/s)</TableCell>
                            <TableCell align="center">Duration</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left"><Link to = {`result/${row.id}`}>{row.settings.path}</Link></TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.settings.hashTypes.map((type) => (<p>{type}</p>))}
                                </TableCell>
                                <TableCell align="left">
                                    {
                                        Object.values(row.result).map((hash) => <p>{hash} </p>)
                                    }

                                </TableCell>
                                <TableCell align="right">{row.averageSpeed}</TableCell>
                                <TableCell align="right">{row.duration.value} {row.duration.timeUnit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}