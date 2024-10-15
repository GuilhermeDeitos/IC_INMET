import React from "react";
import { TableHead, TableRow } from "@mui/material";
import {TableHeaderCell} from "./styled"

interface TableHeaderProps {
  columns: string[];
  subHeaders: { [key: string]: string[] };
  frequencia: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ columns, subHeaders, frequencia }) => {
  if(frequencia !== "horario") 
    columns = columns.filter(column => column !== "Hora Medição")
  return (
    <TableHead>
      {/* Primeira linha: cabeçalhos principais */}
      <TableRow>
        {columns.map((column, index) => (
          <TableHeaderCell key={index} colSpan={subHeaders[column]?.length || 1}>
            {column}
          </TableHeaderCell>
        ))}
      </TableRow>

      {/* Segunda linha: subcabeçalhos */}
      <TableRow>
        {columns.map((column, index) =>
          subHeaders[column]?.map((subHeader, subIndex) => (
            <TableHeaderCell key={`${index}-${subIndex}`}>{subHeader}</TableHeaderCell>
          )) || (
            <TableHeaderCell key={index}></TableHeaderCell> // Adiciona célula vazia se não houver subcabeçalhos
          )
        )}
      </TableRow>
    </TableHead>
  );
};