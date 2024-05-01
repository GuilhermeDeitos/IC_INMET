import { downloadExcel } from "react-export-table-to-excel";
import { Data, Options } from "../../pages/DataPage";
import jsPDF from "jsPDF";
import autoTable, { FontStyle, ThemeType } from "jspdf-autotable";

interface TableOptions {
  fontFamily?: string;
  fontSize?: number;
  theme?: string;
  textColor?: string;
  lineColor?: string;
  headerColor?: string;
  fontStyle?: string;
  rowColor?: string;
  textHeaderColor?: string;
}

export const formatDate = (date: string | undefined) => {
  if (date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }
  return "";
};
export class ExcelExport {
  data: Data[];
  optionsData: Options;
  columns: string[];
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(optionsData: Options, columns: string[], data: Data[]) {
    this.data = data;
    this.optionsData = optionsData;
    this.columns = columns;
    this.formatData2Body = this.data.map((row) => {
      //Converter para o formato aceito pelo body da tablePayload { [key: string]: string | number | boolean; }[]
      const newRow = {} as { [key: string]: string | number | boolean };
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          newRow[key] = row[key as keyof Data] ?? false;
        }
      }
      return newRow;
    });
  }

  public onDowndloadExcel = () => {
    downloadExcel({
      fileName: `RelatorioData${formatDate(
        this.optionsData?.dataInicio ?? ""
      )}-${formatDate(this.optionsData?.dataFim ?? "")}_${
        this.optionsData?.estacao ?? ""
      }_${this.optionsData?.estado ?? ""}_${
        this.optionsData?.tipoEstacao ?? ""
      }`,
      sheet: "Sheet1",
      tablePayload: {
        header: this.columns,
        body: this.formatData2Body,
      },
    });
  };
}

export class CSVExport {
  data: Data[];
  optionsData: Options;
  columns: string[];
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(optionsData: Options, columns: string[], data: Data[]) {
    this.data = data;
    this.optionsData = optionsData;
    this.columns = columns;
    this.formatData2Body = this.data.map((row) => {
      //Converter para o formato aceito pelo body da tablePayload { [key: string]: string | number | boolean; }[]
      const newRow = {} as { [key: string]: string | number | boolean };
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          newRow[key] = row[key as keyof Data] ?? 0;
        }
      }
      return newRow;
    });
  }

  public onDowndloadCSV = () => {
    const csv = [
      this.columns.join(";"),
      ...this.formatData2Body.map((row) =>
        this.columns.map((column) => row[column as keyof Data]).join(";")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RelatorioData${formatDate(
      this.optionsData?.dataInicio ?? ""
    )}-${formatDate(this.optionsData?.dataFim ?? "")}_${
      this.optionsData?.estacao ?? ""
    }_${this.optionsData?.estado ?? ""}_${
      this.optionsData?.tipoEstacao ?? ""
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}

export class PDFExport {
  data: Data[];
  optionsData: Options;
  columns: string[];
  tableOptions: TableOptions;
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(
    optionsData: Options,
    columns: string[],
    data: Data[],
    tableOptions: TableOptions
  ) {
    this.data = data;
    this.optionsData = optionsData;
    this.columns = columns;
    this.tableOptions = tableOptions;
    this.formatData2Body = this.data.map((row) => {
      //Converter para o formato aceito pelo body da tablePayload { [key: string]: string | number | boolean; }[]
      const newRow = {} as { [key: string]: string | number | boolean };
      for (const key in row) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          newRow[key] = row[key as keyof Data] ?? false;
        }
      }
      return newRow;
    });
  }

  public onDowndloadPDF = () => {
    const doc = new jsPDF();
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
    const columnsRepetidasAux = ["Inst", "Max", "Min"];
    const columnsRepetidas = [
      "",
      "",
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
    const colSpansFields = [
      "Temperatura (°C)",
      "Umidade (%)",
      "Ponto de Orvalho (°C)",
      "Pressão (hPa)",
      "Vento",
    ];

    const header = fields.map((field) => {
      if (colSpansFields.includes(field)) {
        return { content: field, colSpan: 3 };
      }
      return field;
    });
    autoTable(doc, {
      head: [header, columnsRepetidas],
      theme: (this.tableOptions.theme as ThemeType) ?? "striped",
      headStyles: {
        fillColor: this.tableOptions.headerColor ?? "#000",
        textColor: this.tableOptions.textHeaderColor ?? "#fff",
      },
      styles: {
        font: this.tableOptions.fontFamily || "helvetica",
        fontStyle: (this.tableOptions.fontStyle as FontStyle) || "normal",
        textColor: this.tableOptions.textColor ?? "#000",
        lineColor: this.tableOptions.lineColor ?? "#000",
        fillColor: this.tableOptions.rowColor ?? "#fff",

        cellPadding: 0.5,
        fontSize: 8,
        halign: "center",
        valign: "middle",
      },
      body: this.formatData2Body.map((row) =>
        this.columns.map((column) =>
          row[column] === false ? null : row[column as keyof Data]
        )
      ),
    });
    doc.save(
      `RelatorioData${formatDate(
        this.optionsData?.dataInicio ?? ""
      )}-${formatDate(this.optionsData?.dataFim ?? "")}_${
        this.optionsData?.estacao ?? ""
      }_${this.optionsData?.estado ?? ""}_${
        this.optionsData?.tipoEstacao ?? ""
      }.pdf`
    );
  };
}
