import React, { useState } from 'react';
import { Button, Divider, Modal, Paper, Typography } from '@mui/material';


export function ModalPersonalizada({children}: {children: React.ReactNode}){
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Open Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"}}
            >
                
                <Paper sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: ".3rem",
                }}>
                <Typography variant="h5" align='center' paddingTop="1rem">
                    Customização do PDF
                </Typography>
                <Divider/>
                        {children}
                    <Button onClick={handleClose}>Fechar Modal</Button>
                </Paper>
            </Modal>
        </div>
    );
}
