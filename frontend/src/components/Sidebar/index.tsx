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
import { DrawerText, Tab, TabGroup, SelectStyled, FormControlStyled } from "./styled";
import { PrimaryButton } from "../../style/globalComponents";
import { DateInput, actualDate } from "./DateInput";
import { estacoesAuto,estacoesConv } from "../../utils/estacoes";
import { Options } from "../../pages/DataPage";
import { FormGroup } from "@mui/material";
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
  height: '7vh',
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
}

export default function PersistentDrawerLeft({selectedOptions, setSelectedOptions}: DrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);


  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = event;

    if(name === "dataInicio" || name === "dataFim"){
      if(value > actualDate){
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Data inválida!",
        });
        return;
      }
    }

    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmitFormDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    for (const key in selectedOptions) {
      if (selectedOptions[key as keyof Options] === "") {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Preencha todos os campos!",
        });
        return;
      }
    }
    console.log(selectedOptions);
  }


  const estadosBrasil = [
    "Todos",  
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins"
  ];

  const frequencia = [
    "Hora a hora",
    "Diário",
    "Semanal",
    "Mensal"
  ]
  const handleChangeSelect = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value, name},
    } = event;
    setSelectedOptions({
      ...selectedOptions,
      [name]: value as string,
    });
  };


  return (
    <Box>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#0F4098",
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
            <Tab isactive={selectedOptions.tipoEstacao === "automaticas"} onClick={() => setSelectedOptions(
              {
                ...selectedOptions,
                tipoEstacao: "automaticas"
              }
            )}>Automaticas</Tab>
            <Tab isactive={selectedOptions.tipoEstacao === "convencionais"} onClick={
              () => setSelectedOptions({
                ...selectedOptions,
                tipoEstacao: "convencionais"
              })}>Convencionais</Tab>
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
              {estadosBrasil.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
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

                {(selectedOptions.tipoEstacao === "Automaticas" ? estacoesAuto : estacoesConv).map((estacao) => (
                <MenuItem key={estacao} value={estacao}>
                  {estacao}
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
                  {frequencia}
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
