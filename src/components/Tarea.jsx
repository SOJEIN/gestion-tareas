import React from "react";

function Tarea({ tarea, completada, eliminada }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={() => completada(tarea.id)}
      />

      <span
        style={{ textDecoratio: tarea.completada ? "line-through" : "none" }}
      >
        {tarea.texto}
      </span>
      <button onClick={() => eliminada(tarea.id)}>Eliminar</button>
    </li>
  );
}

export default Tarea;
