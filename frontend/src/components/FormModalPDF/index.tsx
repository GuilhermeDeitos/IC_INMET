import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Form from '@mui/material/FormGroup';
import { Container, Input, MenuItem, Select, Typography } from '@mui/material';


interface FormModalPDFProps {
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

export const FormModalPDF: React.FC<FormModalPDFProps> = ({
    fontFamily,
    fontSize,
    theme,
    textColor,
    lineColor,
    headerColor,
    fontStyle,
    rowColor,
    textHeaderColor,
}) => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <Form onSubmit={handleSubmit} style={{
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
        }}>
            <Container style={{display:"flex", 
                flexDirection:"row", 
                gap: ".5rem",
                padding: "0",
            }}>
                <Select value={fontFamily || "Font Family"} style={{width:"100%"}}>
                    <MenuItem value="helvetica">helvetica</MenuItem>
                    <MenuItem value="times">times</MenuItem>
                    <MenuItem value="Courier New">Courier New</MenuItem>
                </Select>
                <TextField label="Font Size" type="number" value={fontSize} style={{width:"100%"}} />
                <Select label="Theme"  value={theme} style={{width:"100%"}} displayEmpty>
                    <MenuItem value="">
                        <em>Tema da tabela</em>
                    </MenuItem>
                    <MenuItem value="striped">striped</MenuItem>
                    <MenuItem value="grid">grid</MenuItem>
                    <MenuItem value="plain">plain</MenuItem>

                </Select>
                    <Select value={fontStyle || "Font Style"}  style={{width:"100%"}}>
                        <MenuItem value="normal">Normal</MenuItem>
                        <MenuItem value="italic">Italic</MenuItem>
                        <MenuItem value="oblique">Oblique</MenuItem>
                    </Select>
            </Container>
            <Container style={{display:"flex", 
                flexDirection:"row", 
                justifyContent:"space-between",
                padding:0

            }}>
                <Container style={{
                    display:"flex",
                    flexDirection:"column",
                    height:"100%",
                    width:"100%",
                
                }}>
                    <Typography>Line Color</Typography>
                    <Input type="color" value={lineColor} style={{
                        width:"100%"
                    }}/>
                </Container>
                <Container>
                    <Typography>Header Color</Typography>
                    <Input type="color" value={headerColor}style={{
                        width:"100%"
                    }} />
                </Container>
                <Container>
                    <Typography>Row Color</Typography>
                    <Input type="color" value={rowColor} style={{
                        width:"100%"
                    }}/>
                </Container>
                <Container>
                    <Typography>Text Header Color</Typography>
                    <Input type="color" value={textHeaderColor} style={{
                        width:"100%"
                    }}/>
                </Container>    
                <Container>
                    <Typography>Text Color</Typography>
                    <Input type="color" value={textColor} style={{
                        width:"100%"
                    }}/>
                </Container>


            </Container>
            <Container  style={{display:"flex", 
                flexDirection:"row", 
                justifyContent:"space-between"
            }}> 
               
                
            </Container>
            
            
            
            
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Form>
    );
};