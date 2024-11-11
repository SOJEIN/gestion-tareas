import React from "react";
import { ButtonGroup, Button } from "@mui/material";

function Filtro({ setFiltro }) {
  return (
    <ButtonGroup variant="outlined">
      <Button onClick={() => setFiltro("todas")}>Todas</Button>
      <Button onClick={() => setFiltro("completadas")}>Completadas</Button>
      <Button onClick={() => setFiltro("pendientes")}>Pendientes</Button>
    </ButtonGroup>
  );
}

export default Filtro;
