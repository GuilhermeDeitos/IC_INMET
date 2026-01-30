import { api } from "./api"

export const estados = {
    ALL: "Todos",
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goiás",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraima",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
}
export interface EstacaoMeteorologica {
    CD_ESTACAO: string;
    DC_NOME: string;
    SG_ESTADO?: string;
}

export const estacoesAutomaticas = await api.get("automaticas/").then((response) => {
    return response.data
})
export const estacoesManuais = await api.get("manuais/").then((response) => {
    return response.data
})
