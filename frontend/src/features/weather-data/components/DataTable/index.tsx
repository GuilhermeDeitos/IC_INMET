import { useState } from "react";
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  FooterInfo,
  FooterActions,
  HeaderBar,
  HeaderInfo,
  DateBadge,
  TableScrollWrapper,
} from "./styled";
import { Button } from "../../../../shared/components/Button";
import { MiniSelect } from "../../../../shared/components/Select";
import {
  DownloadIcon,
  ChevronDownIcon,
  CalendarIcon,
} from "../../../../shared/components/Icons";
import { ExportDropdown } from "./ExportDropdown";
import {
  WeatherFilters,
  TableHeader as TableHeaderType,
  HeaderConfig,
} from "../../../../domain/weather/types";
import { formatDate } from "./utils";

interface DataTableProps {
  data: TableHeaderType[];
  columns: string[];
  headerConfig: HeaderConfig;
  filters: WeatherFilters;
  isLoading?: boolean;
}

export function DataTable({
  data,
  columns,
  headerConfig,
  filters,
}: DataTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <TableContainer>
      {/* Header Bar */}
      <HeaderBar>
        <HeaderInfo>
          <DateBadge>
            <CalendarIcon size={14} />
            {formatDate(filters.dataInicio)} — {formatDate(filters.dataFim)}
          </DateBadge>
          <span>{data.length} registros encontrados</span>
        </HeaderInfo>

        <div style={{ position: "relative" }}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <DownloadIcon size={16} />
            Exportar
            <ChevronDownIcon size={14} />
          </Button>

          {showExportMenu && (
            <ExportDropdown
              data={data}
              filters={filters}
              onClose={() => setShowExportMenu(false)}
            />
          )}
        </div>
      </HeaderBar>

      {/* Table */}
      <TableScrollWrapper>
        <StyledTable>
          <TableHeader>
            {/* Primary Headers */}
            <TableHeaderRow>
              {columns.map((column, index) => (
                <TableHeaderCell
                  key={index}
                  colSpan={headerConfig[column]?.length || 1}
                  isSecondary={column === "Latitude" || column === "Longitude"}
                >
                  {column}
                </TableHeaderCell>
              ))}
            </TableHeaderRow>

            {/* Sub Headers */}
            <TableHeaderRow isSubHeader>
              {columns.map((column) =>
                headerConfig[column]?.map((subHeader, subIndex) => (
                  <TableHeaderCell
                    key={`sub-${column}-${subIndex}`}
                    isSubHeader
                  >
                    {subHeader}
                  </TableHeaderCell>
                )),
              )}
            </TableHeaderRow>
          </TableHeader>

          <TableBody>
            {currentData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) =>
                  headerConfig[column]?.map((subHeader, subIndex) => {
                    const value = subHeader
                      ? (row[column] as Record<string, unknown>)?.[subHeader]
                      : row[column];

                    // Formatação especial para data
                    if (column === "Data Medição") {
                      const dateValue = String(value);
                      const [dataInicio, dataFim] = dateValue.split(" ");
                      return (
                        <TableCell key={`${rowIndex}-${column}-${subIndex}`}>
                          {dataFim
                            ? `${formatDate(dataInicio)} — ${formatDate(dataFim)}`
                            : formatDate(dataInicio)}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                        key={`${rowIndex}-${column}-${subIndex}`}
                        isNumeric={typeof value === "number"}
                      >
                        {String(value ?? "—")}
                      </TableCell>
                    );
                  }),
                )}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableScrollWrapper>

      {/* Footer */}
      <TableFooter>
        <FooterInfo>
          Mostrando {startIndex + 1} - {endIndex} de {data.length}
        </FooterInfo>

        <FooterActions>
          <MiniSelect
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value} por página
              </option>
            ))}
            <option value={data.length}>Todos</option>
          </MiniSelect>

          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevPage}
            disabled={page === 0}
          >
            Anterior
          </Button>

          <span style={{ fontSize: "0.875rem", color: "#64748B" }}>
            {page + 1} / {totalPages || 1}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
          >
            Próximo
          </Button>
        </FooterActions>
      </TableFooter>
    </TableContainer>
  );
}
