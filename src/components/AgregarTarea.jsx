import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function AgregarTarea({ agregarTarea }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      agregarTarea(input.trim());
      setInput("");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, marginBottom: 2 }}
    >
      <TextField
        label="Nueva tarea"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Agregar
      </Button>
    </Box>
  );
}

export default AgregarTarea;
