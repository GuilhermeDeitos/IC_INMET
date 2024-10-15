import { downloadExcel } from "react-export-table-to-excel";
import { Options } from "../../pages/DataPage";
import { APIDataInterface } from "../../utils/api";
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

export const formatDate = (date: string) => {
    return date.split("-").reverse().join("/");

};
export class ExcelExport {
  data: APIDataInterface[];
  optionsData: Options;
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(optionsData: Options, data: APIDataInterface[]) {
    this.data = data;
    this.optionsData = optionsData;

    // Achatar os dados para o formato adequado
    this.formatData2Body = this.data.map((row) => flattenColumns(row));
  }

  // Método para baixar o Excel
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
        header: Object.keys(this.formatData2Body[0]),
        body: this.formatData2Body,
      },
    });
  };
}
export class CSVExport {
  data: APIDataInterface[];
  optionsData: Options;
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(optionsData: Options, data: APIDataInterface[]) {
    this.data = data;
    this.optionsData = optionsData;

    // Achatar os dados para o formato adequado
    this.formatData2Body = this.data.map((row) => {
      return flattenColumns(row);
    });
  }


  // Método para baixar o CSV
  public onDowndloadCSV = () => {
    // Gerar as linhas do CSV, começando com os títulos das colunas

    const csv = [
      Object.keys(this.formatData2Body[0]).join(";"),
      ...this.formatData2Body.map((row) =>
        Object.keys(this.formatData2Body[0]).map((column) => row[column] ?? "").join(";")
      ),
    ].join("\n");
  

    // Criar o arquivo CSV
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    // Nomear o arquivo CSV com base nas opções fornecidas
    a.href = url;
    a.download = `RelatorioData${formatDate(
      this.optionsData?.dataInicio ?? ""
    )}-${formatDate(this.optionsData?.dataFim ?? "")}_${
      this.optionsData?.estacao ?? ""
    }_${this.optionsData?.estado ?? ""}_${
      this.optionsData?.tipoEstacao ?? ""
    }.csv`;

    // Iniciar o download
    a.click();
    window.URL.revokeObjectURL(url);
  };
}

// Função para achatar as colunas e subcolunas
function flattenColumns(row: any): { [key: string]: string | number } {
  const flattenedRow: { [key: string]: string | number } = {};

  for (const key in row) {
    if (typeof row[key] === "object" && row[key] !== null) {
      // Trata as subcolunas
      for (const subKey in row[key]) {
        flattenedRow[`${key} - ${subKey}`] = row[key][subKey];
      }
    } else {
      // Colunas simples
      flattenedRow[key] = row[key];
    }
  }

  return flattenedRow;
}


export class PDFExport {
  data: APIDataInterface[];
  optionsData: Options;
  columns: string[];
  tableOptions: TableOptions;
  private formatData2Body: { [key: string]: string | number | boolean }[] = [];

  constructor(
    optionsData: Options,
    columns: string[],
    data: APIDataInterface[],
    tableOptions: TableOptions
  ) {
    this.data = data;
    this.optionsData = optionsData;
    this.columns = columns;
    this.tableOptions = tableOptions;

    // Achatar os dados para o formato adequado
    this.formatData2Body = this.data.map((row) => flattenColumns(row));
  }

  // Método para baixar o PDF
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
      theme: (this.tableOptions.theme as ThemeType) ? this.tableOptions.theme : "striped",
      headStyles: {
        fillColor: this.tableOptions.headerColor ? this.tableOptions.headerColor : "#003f7f",
        textColor: this.tableOptions.textHeaderColor ? this.tableOptions.textHeaderColor : "#fff",
      },
      styles: {
        font: this.tableOptions.fontFamily ? this.tableOptions.fontFamily : "helvetica",
        fontStyle: (this.tableOptions.fontStyle as FontStyle) !== undefined ? this.tableOptions.fontStyle : "normal",
        textColor: this.tableOptions.textColor ? this.tableOptions.textColor : "#000",
        lineColor: this.tableOptions.lineColor ? this.tableOptions.lineColor : "#000",
        fillColor: this.tableOptions.rowColor ? this.tableOptions.rowColor : "#fff",
        cellPadding: 0.5,
        fontSize: 8,
        halign: "center",
        valign: "middle",
      },
      body: this.formatData2Body.map((row) =>
        this.columns.map((column) =>
          row[column] === false ? null : row[column as keyof APIDataInterface]
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


