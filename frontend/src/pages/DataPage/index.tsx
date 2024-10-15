import { Container } from "../../style/globalComponents";
import { BodyContainer, FakeHeaderContainer, OverlayContainer } from "./styled";
import { DataTable } from "../../components/DataTable";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { actualDate } from "../../components/Sidebar/DateInput";
import { api, APIDataInterface } from "../../utils/api";

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

  const [data, setData] = useState<APIDataInterface[]>([]);

  useEffect(() => {
    try {
      api.post("/interval/",{
        "dataInicio": selectedOptions.dataInicio,
        "dataFinal":selectedOptions.dataFim,
        "codigoEstacao":selectedOptions.estacao,
        "frequencia":selectedOptions.frequencia
      }).then((response) => {
        setData(response.data.data);
      }).catch((error) => {
        console.log(error);
      })
      
    } catch (error) {
      console.log(error);
    }
  },[selectedOptions]);
  

  const [optionsSelected, setOptionsSelected] = useState<boolean>(false);
  console.log(selectedOptions);
  return (
    <Container>
      <BodyContainer>
        <FakeHeaderContainer />
        

       {optionsSelected ? (
         <DataTable
         data={data}
         date={actualDate}
           optionsData={selectedOptions}
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

      />
    </Container>
  );
}
