import {useState} from "react";
import { Data, Options } from "../../pages/DataPage";
import {
    TableCell,
    TableHeaderCell,
    TableRow,
    TableFooter,
    TableCellActions
} from './styled'
import { Paper, Table, TableContainer } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
interface DataTableInterface{
    data: Data[];
    title?: string;
    subtitle?: string;
    date?: string;
    optionsData?: Options;
}

export function DataTable({
    data,
    title,
    subtitle,
    date,
    optionsData
}: DataTableInterface){
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const rows = data;
    const columnsRepetidasAux = [
        "Inst",
        "Max",
        "Min",
    ]
    const columnsRepetidas = [...columnsRepetidasAux, ...columnsRepetidasAux, ...columnsRepetidasAux,...columnsRepetidasAux, "Vel(m/s)", "Dir. (°)", "Raj. (m/s)", "Kj/m²", "mm"]
    const fields = [
        "Data",
        "Hora",
        "Temperatura (°C)",
        "Umidade (%)",
        "Ponto de Orvalho (°C)",
        "Pressão (hPa)",
        "Vento",
        "Radiação",
        "Chuva"
    ]

    const colSpansFields = [
        "Temperatura (°C)",
        "Umidade (%)",
        "Ponto de Orvalho (°C)",
        "Pressão (hPa)",
        "Vento",
    ]

    const columns = Object.keys(rows[0]);


    console.log(rows, columns)
    return(
        <><h3>Data de referencia: {optionsData?.dataInicio} - {optionsData?.dataFim}</h3><Paper sx={{ width: '95%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <tr>
                            {fields.map((field, index) => (
                                <TableHeaderCell key={index} sortable={true} colSpan={colSpansFields.filter(
                                    (colSpanField) => field.includes(colSpanField)
                                ).length > 0 ? 3 : 1}>
                                    {field}
                                </TableHeaderCell>
                            ))}
                        </tr>
                        <tr>
                            <TableHeaderCell  sortable={true}>
                                </TableHeaderCell>
                            <TableHeaderCell  sortable={true}>UTC
                                </TableHeaderCell>
                            {columnsRepetidas.map((column, index) => (
                                <TableHeaderCell key={index} sortable={true}>
                                    {column}
                                </TableHeaderCell>
                            ))}
                        </tr>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column, index) => (
                                    <TableCell key={index}>
                                        {row[column as keyof Data]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <p>Mostrando {page * rowsPerPage + 1} - {page * rowsPerPage + rowsPerPage} de {rows.length} resultados</p>
                    <div>
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Anterior</button>
                        <button onClick={() => setPage(page + 1)} disabled={page === Math.floor(rows.length / rowsPerPage)}>Próximo</button>
                    </div>
                </TableFooter>
            </TableContainer>
        </Paper></>
    )
}