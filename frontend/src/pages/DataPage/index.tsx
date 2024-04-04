import { Container  } from "../../style/globalComponents"
import {BodyContainer,FakeHeaderContainer} from "./styled"
import { DataTable } from "../../components/DataTable"
import Sidebar from "../../components/Sidebar"
import { useState } from "react"
import { actualDate } from "../../components/Sidebar/DateInput"

export type Options = {
    tipoEstacao: string;
    estado: string;
    estacao: string;
    dataInicio: string;
    dataFim: string;
    frequencia: string;
}

export type Data = {
    data: string;
    hora: string;
    tempInsC: number;
    tempMaxC: number;
    tempMinC: number;
    umiInsPercent: number;
    umiMaxPercent: number;
    umiMinPercent: number;
    ptoOrvalhoInsC: number;
    ptoOrvalhoMaxC: number;
    ptoOrvalhoMinC: number;
    pressaoInsHPa: number;
    pressaoMaxHPa: number;
    pressaoMinHPa: number;
    velVentoMs: number;
    dirVentoMs: number;
    rajVentoMs: number;
    radiacaoKJm2: number | null;
    chuvaMm: number;
}

export default function DataPage(){
    const [selectedOptions, setSelectedOptions] = useState<Options>({
        tipoEstacao: "automatica",
        estado: "",
        estacao: "",
        dataInicio: actualDate,
        dataFim: actualDate,
        frequencia: "",
    })

   const fakeData:Data[] = [
    {
        data: "04/03/2024",
        hora: "0",
        tempInsC: 23.7,
        tempMaxC: 24.5,
        tempMinC: 23.7,
        umiInsPercent: 81,
        umiMaxPercent: 81,
        umiMinPercent: 78,
        ptoOrvalhoInsC: 20.2,
        ptoOrvalhoMaxC: 20.8,
        ptoOrvalhoMinC: 20.1,
        pressaoInsHPa: 911.6,
        pressaoMaxHPa: 911.6,
        pressaoMinHPa: 910.4,
        velVentoMs: 1.5,
        dirVentoMs: 66,
        rajVentoMs: 3.6,
        radiacaoKJm2: null,
        chuvaMm: 0
    },
    {
        data: "04/03/2024",
        hora: "1",
        tempInsC: 23.7,
        tempMaxC: 24.5,
        tempMinC: 23.7,
        umiInsPercent: 81,
        umiMaxPercent: 81,
        umiMinPercent: 78,
        ptoOrvalhoInsC: 20.2,
        ptoOrvalhoMaxC: 20.8,
        ptoOrvalhoMinC: 20.1,
        pressaoInsHPa: 911.6,
        pressaoMaxHPa: 911.6,
        pressaoMinHPa: 910.4,
        velVentoMs: 1.5,
        dirVentoMs: 66,
        rajVentoMs: 3.6,
        radiacaoKJm2: null,
        chuvaMm: 0
    },
    {
        data: "04/03/2024",
        hora: "2",
        tempInsC: 23.7,
        tempMaxC: 24.5,
        tempMinC: 23.7,
        umiInsPercent: 81,
        umiMaxPercent: 81,
        umiMinPercent: 78,
        ptoOrvalhoInsC: 20.2,
        ptoOrvalhoMaxC: 20.8,
        ptoOrvalhoMinC: 20.1,
        pressaoInsHPa: 911.6,
        pressaoMaxHPa: 911.6,
        pressaoMinHPa: 910.4,
        velVentoMs: 1.5,
        dirVentoMs: 66,
        rajVentoMs: 3.6,
        radiacaoKJm2: null,
        chuvaMm: 0
    },
    {
        data: "04/03/2024",
        hora: "3",
        tempInsC: 23.7,
        tempMaxC: 24.5,
        tempMinC: 23.7,
        umiInsPercent: 81,
        umiMaxPercent: 81,
        umiMinPercent: 78,
        ptoOrvalhoInsC: 20,
        ptoOrvalhoMaxC: 20.8,
        ptoOrvalhoMinC: 20,
        pressaoInsHPa: 911.6,
        pressaoMaxHPa: 911.6,
        pressaoMinHPa: 910.4,
        velVentoMs: 1.5,
        dirVentoMs: 66,
        rajVentoMs: 3.6,
        radiacaoKJm2: null,
        chuvaMm: 0
    },

];


    return (
        <Container>
            
            <BodyContainer>
                <FakeHeaderContainer/>
            <h1>Data Page</h1>

            <DataTable
                type="automatica"
                data={fakeData}
                title="Dados da estação"
                subtitle="Estação: 82982"
                date="04/03/2024"
            />

            </BodyContainer>
            <Sidebar selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
        </Container>
    )
}