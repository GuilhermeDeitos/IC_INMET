import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Swal from "sweetalert2";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  DrawerText,
  Tab,
  TabGroup,
  SelectStyled,
  FormControlStyled,
} from "./styled";
import { PrimaryButton } from "../../style/globalComponents";
import { DateInput, actualDate } from "./DateInput";
import {
  estacoesAutomaticas,
  estacoesManuais,
  estados,
} from "../../utils/estacoes";
import { Options } from "../../pages/DataPage";
import { FormGroup } from "@mui/material";
import { EstacaoMeteorologica } from "../../utils/estacoes";
import { api, APIDataInterface } from "../../utils/api";
//Codigo do drawer (MUI Material)
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height: "9vh",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

//Codigo meu

interface DrawerProps {
  selectedOptions: Options;
  setSelectedOptions: React.Dispatch<React.SetStateAction<Options>>;
  setOptionsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<APIDataInterface[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PersistentDrawerLeft({
  selectedOptions,
  setSelectedOptions,
  setOptionsSelected,
  setData,
  setIsSelecting,
  setIsLoading,
}: DrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;

    if (name === "dataInicio" || name === "dataFim") {
      console.log(value);
      if (value > actualDate) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Data inválida!",
        });
        return;
      } else if (selectedOptions.dataInicio > selectedOptions.dataFim) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Data inicial maior que a final!",
        });
        return;
      }
    }

    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
    setIsSelecting(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmitFormDrawer = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);
    for (const key in selectedOptions) {
      if (selectedOptions[key as keyof Options] === "") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Preencha todos os campos!",
        });
        setIsLoading(false);
        return;
      }
    }
    setOptionsSelected(true);
    setOpen(false);
    setIsSelecting(false);
    
    api.post("/interval/", {
            dataInicio: selectedOptions.dataInicio,
            dataFinal: selectedOptions.dataFim,
            codigoEstacao: selectedOptions.estacao,
            frequencia: selectedOptions.frequencia,
          })
          .then((response) => {
            setData(response.data.data);
            setIsLoading(false);
            setOpen(!open)
            console.log(open); // Debug


          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Erro ao buscar os dados!",
            });
          });
      
  };

  const frequencia = ["horario", "diario", "semanal", "mensal"];

  const handleChangeSelect = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value, name },
    } = event;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value as string,
    });
    setIsSelecting(true);
  };

  const capitalizeString = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#0F4098",
          height: "10hv",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600} noWrap component="div">
            Instituto Nacional de Metereologia
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <form action="">
          <DrawerText>Tabela de Dados das Estações</DrawerText>

          <Divider />

          <TabGroup>
            <Tab
              isactive={
                selectedOptions.tipoEstacao === "automaticas" ? "check" : ""
              }
              onClick={() =>
                setSelectedOptions({
                  ...selectedOptions,
                  tipoEstacao: "automaticas",
                })
              }
            >
              Automaticas
            </Tab>
            <Tab
              isactive={
                selectedOptions.tipoEstacao === "manuais" ? "check" : ""
              }
              onClick={() =>
                setSelectedOptions({
                  ...selectedOptions,
                  tipoEstacao: "manuais",
                })
              }
            >
              Manuais
            </Tab>
          </TabGroup>
          <Divider />

          <DrawerText>Estado</DrawerText>
          <FormGroup>
            <FormControlStyled>
              <SelectStyled
                labelId="estado"
                id="estado"
                value={selectedOptions.estado}
                label="Estado"
                name="estado"
                onChange={handleChangeSelect}
              >
                {Object.entries(estados).map((estado) => (
                  <MenuItem key={estado[0]} value={estado[0]}>
                    {estado[1]}
                  </MenuItem>
                ))}
              </SelectStyled>
            </FormControlStyled>

            <DrawerText>Estação</DrawerText>
            <FormControlStyled>
              <SelectStyled
                labelId="estacao"
                id="estacao"
                value={selectedOptions.estacao}
                label="Estação"
                name="estacao"
                onChange={handleChangeSelect}
              >
                {(selectedOptions.tipoEstacao === "automaticas"
                  ? estacoesAutomaticas
                  : estacoesManuais
                )
                  .filter(
                    (estacao: EstacaoMeteorologica) =>
                      estacao.SG_ESTADO === selectedOptions.estado ||
                      selectedOptions.estado === "ALL"
                  )
                  .map((estacao: EstacaoMeteorologica) => (
                    <MenuItem key={estacao.DC_NOME} value={estacao.CD_ESTACAO}>
                      {estacao.DC_NOME}
                    </MenuItem>
                  ))}
              </SelectStyled>
            </FormControlStyled>

            <DrawerText>Frequencia</DrawerText>
            <FormControlStyled>
              <SelectStyled
                labelId="granuralidade"
                id="granuralidade"
                value={selectedOptions.frequencia}
                label="Granuralidade"
                name="frequencia"
                onChange={handleChangeSelect}
              >
                {frequencia.map((frequencia) => (
                  <MenuItem key={frequencia} value={frequencia}>
                    {capitalizeString(frequencia)}
                  </MenuItem>
                ))}
              </SelectStyled>
            </FormControlStyled>

            <DrawerText>Data Inicial</DrawerText>
            <FormControlStyled>
              <DateInput
                date={selectedOptions.dataInicio}
                handleChangeDate={handleChangeInput}
                name="dataInicio"
              />
            </FormControlStyled>
            <DrawerText>Data Final</DrawerText>
            <FormControlStyled>
              <DateInput
                date={selectedOptions.dataFim}
                handleChangeDate={handleChangeInput}
                name="dataFim"
              />
            </FormControlStyled>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                margin: ".5rem 0",
              }}
            >
              <PrimaryButton onClick={handleSubmitFormDrawer}>
                Gerar Tabela
              </PrimaryButton>
            </span>
          </FormGroup>

          <Divider />
        </form>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}