"use client";
import { useState } from "react";

export default function resetPlayers() {
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleRestPlayers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/players`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Jugadores eliminados exitosamente.");
      } else {
        alert("Hubo un error al eliminar los jugadores.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectarse con el servidor.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[url('/fondo.png')] bg-cover">
      <div className="flex flex-row gap-2">
        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-green-700 transition"
          onClick={handleRestPlayers}
        >
          {loading ? "Eliminando..." : "Eliminar Jugadores"}
        </button>
      </div>
    </div>
  );
}
