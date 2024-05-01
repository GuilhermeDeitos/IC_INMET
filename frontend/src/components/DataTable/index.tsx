import { useState } from "react";
import { Data, Options } from "../../pages/DataPage";
import {
  TableCell,
  TableHeaderCell,
  TableRow,
  TableFooter,
  HeaderTextContainer,
} from "./styled";
import { Paper, Table, TableContainer, Select, Button, MenuItem } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { CSVExport, ExcelExport, formatDate, PDFExport } from "./exportArchive";
import {ModalPersonalizada} from "../Modal";
import { FormModalPDF } from "../FormModalPDF";
interface DataTableInterface {
  data: Data[];
  date?: string;
  optionsData: Options;
}



export function DataTable({ data, optionsData }: DataTableInterface) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [downloadOption, setDownloadOption] = useState(".xlsx");

  const rows = data;
  const columnsRepetidasAux = ["Inst", "Max", "Min"];
  const columnsRepetidas = [
    ...columnsRepetidasAux,
    ...columnsRepetidasAux,
    ...columnsRepetidasAux,
    ...columnsRepetidasAux,
    "Vel(m/s)",
    "Dir. (°)",
    "Raj. (m/s)",
    "Kj/m²",
    "mm",
  ];
  const fields = [
    "Data",
    "Hora",
    "Temperatura (°C)",
    "Umidade (%)",
    "Ponto de Orvalho (°C)",
    "Pressão (hPa)",
    "Vento",
    "Radiação",
    "Chuva",
  ];

  const colSpansFields = [
    "Temperatura (°C)",
    "Umidade (%)",
    "Ponto de Orvalho (°C)",
    "Pressão (hPa)",
    "Vento",
  ];

  const columns = Object.keys(rows[0]);

  console.log(rows, columns);
  return (
    <>
      <Paper sx={{ width: "95%"}}>
        <HeaderTextContainer>
          <span>
            Download da Planilha:
            <Select value={downloadOption} onChange={(e) => setDownloadOption(e.target.value)} sx={{
              marginLeft: "1rem",
              height:"2rem"
            }}>
              <MenuItem value=".xlsx">Excel</MenuItem>
              <MenuItem value=".csv">CSV</MenuItem>
              <MenuItem value=".pdf">PDF</MenuItem>
            </Select>
            {downloadOption === ".pdf" && (
              <ModalPersonalizada>
                <FormModalPDF />
              </ModalPersonalizada>
            )}
            <Button onClick={() => {
              if(downloadOption === ".xlsx"){
                const excelExport = new ExcelExport(optionsData, columns, data);
                excelExport.onDowndloadExcel();
              } else if(downloadOption === ".pdf"){
                const pdfExport = new PDFExport(optionsData, columns, data);
                pdfExport.onDowndloadPDF();
              } else if(downloadOption === ".csv") {
                const csvExport = new CSVExport(optionsData, columns, data);
                csvExport.onDowndloadCSV();
              }
            }}>Download</Button>
          </span>
          <span>
            {" "}
            Data de referencia: {formatDate(optionsData?.dataInicio)} -{" "}
            {formatDate(optionsData?.dataFim)}
          </span>
        </HeaderTextContainer>
        <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <tr>
                {fields.map((field, index) => (
                  <TableHeaderCell
                    key={index}
                    sortable={true}
                    colSpan={
                      colSpansFields.filter((colSpanField) =>
                        field.includes(colSpanField)
                      ).length > 0
                        ? 3
                        : 1
                    }
                  >
                    {field}
                  </TableHeaderCell>
                ))}
              </tr>
              <tr>
                <TableHeaderCell sortable={true}></TableHeaderCell>
                <TableHeaderCell sortable={true}>UTC</TableHeaderCell>
                {columnsRepetidas.map((column, index) => (
                  <TableHeaderCell key={index} sortable={true}>
                    {column}
                  </TableHeaderCell>
                ))}
              </tr>
            </TableHead>
            <TableBody  sx={{ maxHeight: "300px" }}>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
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
          
        </TableContainer>
        <TableFooter>
            <p>
              Mostrando {page * rowsPerPage + 1} -{" "}
              {page * rowsPerPage + rowsPerPage} de {rows.length} resultados
            </p>
            <div>
            <Select onChange={(e) => setRowsPerPage(Number(e.target.value))} value={rowsPerPage}>
                {[5,10,15,20,data.length].map((value) => (
                    <MenuItem key={value} value={value}>
                        {value === data.length ? 'Todos' : value}
                    </MenuItem>
                ))}
            </Select>
              <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
                Anterior
              </Button>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.floor(rows.length / rowsPerPage)}
              >
                Próximo
              </Button>
            </div>
          </TableFooter>
      </Paper>
    </>
  );
}
