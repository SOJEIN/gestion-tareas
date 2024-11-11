import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

import Tarea from "./components/Tarea";
import Filtro from "./components/Filtro";
import AgregarTarea from "./components/AgregarTarea";

function App() {
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState("todas");
  const [editar, setEditar] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("success");

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (textoTarea) => {
    const nuevaTarea = { id: Date.now(), texto: textoTarea, completada: false };
    setTareas([...tareas, nuevaTarea]);
    setMensaje("Tarea agregada correctamente!");
    setTipoAlerta("success");
    setOpen(true);
  };

  const tareaCompletada = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    setMensaje("Tarea eliminada!");
    setTipoAlerta("error");
    setOpen(true);
  };

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "completadas") {
      return tarea.completada;
    } else if (filtro === "pendientes") {
      return !tarea.completada;
    }
    return true;
  });

  const editarTarea = (id, nuevoTexto) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea
      )
    );
    setEditar(null);
    setMensaje("Tarea editada correctamente!");
    setTipoAlerta("success");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Lista de tareas
      </Typography>

      <AgregarTarea agregarTarea={agregarTarea} />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Filtro setFiltro={setFiltro} />
      </Box>

      <List>
        {tareasFiltradas.map((tarea) => (
          <ListItem key={tarea.id}>
            <Checkbox
              checked={tarea.completada}
              onChange={() => tareaCompletada(tarea.id)}
            />
            {editar === tarea.id ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ marginRight: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => editarTarea(tarea.id, textoEditado)}
                >
                  Guardar
                </Button>
              </Box>
            ) : (
              <>
                <ListItemText
                  primary={tarea.texto}
                  sx={{
                    textDecoration: tarea.completada ? "line-through" : "none",
                  }}
                />
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    setEditar(tarea.id);
                    setTextoEditado(tarea.texto);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                  Eliminar
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={tipoAlerta}
          sx={{ width: "100%" }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
