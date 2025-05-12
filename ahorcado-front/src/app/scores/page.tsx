"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export interface Player {
  id?: string;
  name?: string;
  score?: number;
}

export default function Scores() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    axios.get("/api/players").then((res) => setPlayers(res.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Puntuaciones</h1>
      <ul className="mt-4">
        {players.map((player) => (
          <li key={player.id} className="mt-2">
            {player.name}: {player.score} puntos
          </li>
        ))}
      </ul>
    </div>
  );
}
