import { Container } from "../../style/globalComponents";
import { BodyContainer, FakeHeaderContainer, OverlayContainer } from "./styled";
import { DataTable } from "../../components/DataTable";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { actualDate } from "../../components/Sidebar/DateInput";
import { APIDataInterface } from "../../utils/api";
import {CircularIndeterminate} from "../../components/CircularIndeterminate";

export type Options = {
  tipoEstacao: string;
  estado: string;
  estacao: string;
  dataInicio: string;
  dataFim: string;
  frequencia: string;
};



export default function DataPage() {
  const [selectedOptions, setSelectedOptions] = useState<Options>({
    tipoEstacao: "automaticas",
    estado: "ALL",
    estacao: "A001",
    dataInicio: actualDate,
    dataFim: actualDate,
    frequencia: "horario",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<APIDataInterface[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);


  
  

  const [optionsSelected, setOptionsSelected] = useState<boolean>(false);
  console.log(selectedOptions);
  if(isLoading) {
    return <CircularIndeterminate />
  }

  return (
    <Container>
      <BodyContainer>
        <FakeHeaderContainer />
        

       {optionsSelected && !isSelecting ? (
         <DataTable
         data={data}
         date={actualDate}
           optionsData={selectedOptions}
           isLoading={isLoading}
       />
       ):(
          <OverlayContainer>
          <h1>Selecione as opções</h1>
        </OverlayContainer>

       )}
      </BodyContainer>
      <Sidebar
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        setOptionsSelected={setOptionsSelected}
        setData={setData}
        setIsSelecting={setIsSelecting}
        setIsLoading={setIsLoading}

      />
    </Container>
  );
}
