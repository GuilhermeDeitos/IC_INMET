import { useState } from "react";
import { Options } from "../../pages/DataPage";
import { APIDataInterface } from "../../utils/api";
import {
  TableCell,
  TableRow,
  TableFooter,
  HeaderTextContainer,
} from "./styled";
import {
  Paper,
  Table,
  TableContainer,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { TableHeader } from "./TableHeader";
import { CSVExport, ExcelExport, formatDate, PDFExport } from "./exportArchive";
import { ModalPersonalizada } from "../Modal";
import { FormModalPDF } from "../FormModalPDF";
interface DataTableInterface {
  data: APIDataInterface[];
  date?: string;
  optionsData: Options;
  isLoading?: boolean;
}
export interface Header {
  Nome: string;
  UF: string;
  "Data Medição": string;
  Latitude: string | number;
  Longitude: string | number;
  [key: string]: any; // Para lidar com sub-objetos como Temperatura, Umidade, etc.
}
interface ManualData {
  DC_NOME: string;
  UF: string;
  DT_MEDICAO: string;
  VL_LATITUDE: number;
  VL_LONGITUDE: number;
  CHUVA: number;
  TEMP_HORA: string;
  TEMP_MAX: number;
  TEMP_MED: number;
  TEMP_MIN: number;
  UMID_HORA: string;
  UMID_MED: number;
  VENT_DIR: string;
  VENT_VEL: number;
  PRESS_EST: number;
  INSO_HORA: string;
  NEBU_HORA: string;
}

function createHeaderAutomatic(row: APIDataInterface): Header {
  return {
    Nome: row.DC_NOME,
    UF: row.UF,
    "Hora Medição": {
      UTC: row.HR_MEDICAO,
    },
    "Data Medição": row.DT_MEDICAO,
    Latitude: row.VL_LATITUDE,
    Longitude: row.VL_LONGITUDE,

    Pressão: {
      "Inst.": row.PRE_INS,
      "Max.": row.PRE_MAX,
      "Min.": row.PRE_MIN,
    },
    "Ponto de Orvalho": {
      "Inst.": row.PTO_INS,
      "Max.": row.PTO_MAX,
      "Min.": row.PTO_MIN,
    },
    Temperatura: {
      "Max.": row.TEM_MAX,
      "Min.": row.TEM_MIN,
      "Inst.": row.TEM_INS,
    },
    Umidade: {
      "Max.": row.UMD_MAX,
      "Min.": row.UMD_MIN,
      "Inst.": row.UMD_INS,
    },
    Chuva: { "(mm)": row.CHUVA },
    Radiação: {
      "Kj/m²": row.RAD_GLO,
    },
    Vento: {
      "Vel. (m/s)	": row.VEN_VEL,
    },
  }
}

function createHeaderManual(row: ManualData): Header {
  return {
    Nome: row.DC_NOME,
    UF: row.UF,
    "Data Medição": row.DT_MEDICAO,
    Latitude: row.VL_LATITUDE,
    Longitude: row.VL_LONGITUDE,
    Chuva: {
      "(mm)": row.CHUVA,
    },
    Temperatura: {
      Hora: row.TEMP_HORA,
      "Max.": row.TEMP_MAX,
      "Med.": row.TEMP_MED,
      "Min.": row.TEMP_MIN,
    },
    Umidade: {
      Hora: row.UMID_HORA,
      "Med.": row.UMID_MED,
    },
    Vento: {
      "Dir.": row.VENT_DIR,
      "Vel.": row.VENT_VEL,
    },
    Pressão: { hPa: row.PRESS_EST },
    Insolação: { h: row.INSO_HORA },
    Nebulosidade: { Décimos: row.NEBU_HORA },
  };
}


function createHeaderConfig(rows: Header[]): { [key: string]: string[] } {
  // Verifica o primeiro objeto para gerar os cabeçalhos e subcabeçalhos
  const firstRow = rows[0];

  // Cria o objeto de configuração de cabeçalhos
  const headerConfig: { [key: string]: string[] } = {};

  Object.keys(firstRow).forEach((key) => {
    const typedKey = key as keyof APIDataInterface;
    // Verifica se o valor é um objeto (para adicionar subcabeçalhos)
    if (typeof firstRow[typedKey] === "object" && firstRow[typedKey] !== null) {
      headerConfig[key] = Object.keys(firstRow[typedKey] as object); // Subcabeçalhos
    } else {
      headerConfig[key] = [""]; // Sem subcabeçalhos
    }
  });

  return headerConfig;
}


export function DataTable({ data, optionsData, isLoading }: DataTableInterface) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [downloadOption, setDownloadOption] = useState(".xlsx");
  console.log(data);
  
  
  // Função que mapeia os dados, com tipagem clara
  const rows = data.map((row): Header => {
    return optionsData.tipoEstacao === "automaticas"
      ? createHeaderAutomatic(row)
      : createHeaderManual(row);
  });

  // Criação da configuração de cabeçalho a partir das linhas de dados
  const headerConfig = createHeaderConfig(rows);
  // Obtendo as chaves do cabeçalho
  let temp: string[] | null = Object.keys(headerConfig);
  // Filtrando as colunas com base na frequência
  const columns =
    optionsData.frequencia !== "horario" && temp.includes("Hora Medição")
      ? temp.filter((column) => column !== "Hora Medição") // Excluindo "Hora Medição"
      : temp;

  // Limpa a referência a temp após o uso
  temp = null; // O coletor de lixo pode agora liberar essa memória, se não houver mais referências

  console.log(headerConfig);
  if (!isLoading) {
    return (
      <>
        <Paper sx={{ width: "95%" }}>
          <HeaderTextContainer>
            <span>
              Download da Planilha:
              <Select
                value={downloadOption}
                onChange={(e) => setDownloadOption(e.target.value)}
                sx={{
                  marginLeft: "1rem",
                  height: "2rem",
                }}
              >
                <MenuItem value=".xlsx">Excel</MenuItem>
                <MenuItem value=".csv">CSV</MenuItem>
                <MenuItem value=".pdf">PDF</MenuItem>
              </Select>
              {downloadOption === ".pdf" && (
                <ModalPersonalizada>
                  <FormModalPDF />
                </ModalPersonalizada>
              )}
              <Button
                onClick={() => {
                  if (downloadOption === ".xlsx") {
                    const excelExport = new ExcelExport(
                      optionsData,
                      rows
                    );
                    excelExport.onDowndloadExcel();
                  } else if (downloadOption === ".pdf") {
                    const pdfExport = new PDFExport(optionsData, data);
                    pdfExport.onDowndloadPDF();
                  } else if (downloadOption === ".csv") {
                    const csvExport = new CSVExport(optionsData, rows);
                    csvExport.onDowndloadCSV();
                  }
                }}
              >
                Download
              </Button>
            </span>
            <span>
              {" "}
              Data de referencia: {formatDate(optionsData?.dataInicio)} -{" "}
              {formatDate(optionsData?.dataFim)}
            </span>
          </HeaderTextContainer>
          <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHeader
                columns={columns}
                subHeaders={headerConfig}
                frequencia={optionsData.frequencia}
              />
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column, index) =>
                        headerConfig[column].map((subHeader, subIndex) => {
                          // Verifica se a coluna é "Data Medição"
                          if (column === "Data Medição") {
                            const dataMediacao = row[column];
                            // Caso a frequência seja "horário"
                            if (optionsData.frequencia === "horario") {
                              return (
                                <TableCell key={`${index}-${subIndex}`}>
                                  {formatDate(dataMediacao)}
                                </TableCell>
                              );
                            }
                            // Caso a frequência seja diferente de "horário"
                            if (dataMediacao && !isLoading) {
                              console.log(dataMediacao);
                              const [dataInicio, dataFim] = dataMediacao.split(" ")
                              if(dataFim === undefined) {
                                return (
                                  <TableCell key={`${index}-${subIndex}`}>
                                    {formatDate(dataInicio)}
                                  </TableCell>
                                );
                              }
                              
                              return (
                                <TableCell key={`${index}-${subIndex}`}>
                                  {formatDate(dataInicio)} - {formatDate(dataFim)}
                                </TableCell>
                              );
                            }
                            // Retorna célula vazia caso a data não esteja disponível
                            return (
                              <TableCell key={`${index}-${subIndex}`}>
                                -
                              </TableCell>
                            );
                          }
                          // Retorna normalmente caso não seja "Data Medição"
                          return (
                            <TableCell key={`${index}-${subIndex}`}>
                              {subHeader ? row[column]?.[subHeader] : row[column]}
                            </TableCell>
                          );
                        })
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TableFooter>
            <p>
              Mostrando {page * rowsPerPage + 1} -{" "}
              {page * rowsPerPage + rowsPerPage < rows.length
                ? page * rowsPerPage + rowsPerPage
                : rows.length}{" "}
              de {rows.length} resultados
            </p>
            <div>
              <Select
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                value={rowsPerPage}
              >
                {[5, 10, 15, 20, data.length].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value === data.length ? "Todos" : value}
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
}

