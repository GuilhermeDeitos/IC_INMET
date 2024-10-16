import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function CircularIndeterminate() {
  return (
    <Box width={"100%"} height={"100vh"} sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2
    }}>
      <CircularProgress sx={{ color: '#003775' }} size={"4rem"} />
    </Box>
  );
}