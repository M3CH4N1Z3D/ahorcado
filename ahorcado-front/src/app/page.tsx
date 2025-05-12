"use client";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "./scores/page";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const [player, setPlayer] = useState<Player>({ name: "", score: 0 });
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/word`)
      .then((res) => {
        if (res.data && res.data.data) {
          localStorage.setItem("wordData", JSON.stringify(res.data.data));
        }
      })
      .catch((error) => console.error("Error al obtener la palabra:", error));
  }, []);

  const startGame = async () => {
    router.push("/game");
    localStorage.setItem("player", JSON.stringify(player));
  };

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
    // Clear specific error when input changes
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/fondo.png')] bg-cover px-4">
      <h1 className="text-4xl md:text-4xl font-bold text-gray-900 text-center bg-blue-200 bg-opacity-10 rounded-md m-4">
        Juego del Aminoahorcado
      </h1>
      <div className="bg-blue-200 bg-opacity-0 rounded-md">
        <p className="mt-4 text-lg text-justify text-black leading-relaxed">
          * Ingresa tu nombre y empieza a jugar. <br />
          * Adivina la palabra secreta seleccionando letras una por una. <br />
          * Si aciertas, la letra se revela en la palabra oculta. <br />
          * Si fallas, pierdes un intento y 100 puntos. El ahorcado se irá
          revelando. <br />
          * Ganas cuando completas la palabra antes de quedarte sin intentos.
          <br />
          * Pierdes si el ahorcado se completa y la palabra sigue incompleta.
          <br />
          * Usa la pista si necesitas ayuda, pero te costará 50 puntos. <br />*
          ¡Buena suerte y diviértete! 🎉🎮
        </p>
      </div>

      <input
        id="name"
        name="name"
        type="text"
        required
        className="mt-4 p-2 border rounded w-full max-w-xs text-center bg-white"
        placeholder="Tu nombre"
        value={player.name}
        onChange={handleInputChange}
      />

      <button
        onClick={startGame}
        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded w-full max-w-xs hover:bg-blue-700 transition animate-pulse"
      >
        !! INICIAR JUEGO ¡¡
      </button>
    </div>
  );
}
