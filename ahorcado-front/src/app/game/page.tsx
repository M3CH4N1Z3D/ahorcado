"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { Player } from "../scores/page";

export default function Game() {
  const [wordData, setWordData] = useState<{
    id: string;
    word: string;
    clue: string;
  }>({ id: "", word: "", clue: "" });
  const [hiddenWord, setHiddenWord] = useState("");
  const [score, setScore] = useState(600);
  const [attempts, setAttempts] = useState(6);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [playersData, setPlayersData] = useState<Player[]>([]);
  const [showScores, setShowScores] = useState(false);
  const [playerStored, setPlayerStored] = useState<string | null>(null);

  // const [timeLeft, setTimeLeft] = useState(30);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-".split("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedWord = localStorage.getItem("wordData");
    if (storedWord) {
      const parsedWord = JSON.parse(storedWord);
      setWordData(parsedWord);
      setHiddenWord(hideWord(parsedWord.word.word)); // Oculta la palabra con guiones
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/players`)
      .then((res) => {
        if (res.data && res.data.data && res.data.data.players) {
          const parsedPlayers = res.data.data.players.sort(
            (a: { score: number }, b: { score: number }) => b.score - a.score
          ); // Eliminamos JSON.parse()

          setPlayersData(parsedPlayers); // Corregimos el nombre de la variable
        } else {
          console.error(
            "La respuesta de la API no contiene datos esperados:",
            res.data
          );
        }
      })
      .catch((error) =>
        console.error("Error al obtener la lista de jugadores:", error)
      );
  }, []);

  const hideWord = (word: string): string => {
    return word ? word.replace(/./g, "_") : "";
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Asegura que el código se ejecuta en el cliente
      setPlayerStored(localStorage.getItem("player"));
    }
  }, []);

  const savePlayerScore = async () => {
    if (playerStored) {
      const playerInfo = JSON.parse(playerStored);
      const response = await fetch(`${apiUrl}/api/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playerInfo.name, score: score }),
      });
      if (response.ok) {
        reset();
      }
    }
  };

  const handleClue = () => {
    localStorage.getItem("wordData");
    const storedWord = localStorage.getItem("wordData");
    if (!storedWord) return;
    const selectedWord = JSON.parse(storedWord);
    Swal.fire({
      title: "PISTA!",
      text: `${selectedWord.word.clue.toUpperCase()}`,
      imageUrl: "/pista.png",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    setScore((prevScore) => prevScore - 50);
  };

  const reset = () => {
    localStorage.removeItem("wordData");
    localStorage.removeItem("player");
    router.push("/");
  };

  const handleLetterClick = (letter: string) => {
    const playerStored = localStorage.getItem("player");
    if (!playerStored) return;
    const playerInfo = JSON.parse(playerStored);
    const storedWord = localStorage.getItem("wordData");
    if (!storedWord) return;
    const selectedWord = JSON.parse(storedWord);
    if (!usedLetters.includes(letter)) {
      setUsedLetters([...usedLetters, letter]);
      const newHiddenWord = hiddenWord.split("");
      let found = false;

      selectedWord.word.word
        .split("")
        .forEach((char: string, index: number) => {
          if (char.toLowerCase() === letter.toLowerCase()) {
            newHiddenWord[index] = char;
            found = true;
          }
        });

      if (found) {
      } else {
        setScore((prevScore) => prevScore - 100);
        // setAttempts(attempts - 1);
        setAttempts((prevAttempts) => {
          const newAttempts = prevAttempts - 1;

          // Después de actualizar intentos, verificar si el juego terminó
          if (newAttempts === 0) {
            setTimeout(() => {
              Swal.fire({
                title: `!!! QUE LASTIMA ${playerInfo.name.toUpperCase()}¡¡¡`,
                text: `La palabra secreta es ${selectedWord.word.word.toUpperCase()}. Tu puntaje es: ${score} puntos`,
                imageUrl: "/perdiste.png",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
              });
              savePlayerScore();
              reset();
            }, 1000);
          }

          return newAttempts;
        });
      }

      setHiddenWord(newHiddenWord.join(""));

      // Verificar si el jugador ha ganado DESPUÉS de actualizar la palabra
      if (!newHiddenWord.includes("_")) {
        setTimeout(() => {
          Swal.fire({
            title: `!!! FELICITACIONES ${playerInfo.name.toUpperCase()}¡¡¡`,
            text: `Encontraste la plabra secreta. Tu puntaje es: ${score} puntos`,
            imageUrl: "/ganaste.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
          savePlayerScore();
          reset();
        }, 1000);
      }
    }
  };
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  //     return () => clearTimeout(timer); // Limpia el temporizador para evitar fugas de memoria
  //   } else {
  //     setScore(0); // Reinicia el puntaje a 0 cuando el tiempo llega a 0
  //     gameOver(); // Cuando el tiempo llega a 0, termina el juego
  //   }
  // }, [timeLeft]);

  // const gameOver = () => {
  //   setAttempts(0);
  //   if (score > 599 && attempts === 0) {
  //     setScore(0);
  //     Swal.fire({
  //       title: `!!! QUE LASTIMA TU TIEMPO ACABO¡¡¡`,
  //       text: `Intentalo de nuevo. Tu puntaje es: ${score} puntos`,
  //       imageUrl: "/perdiste.png",
  //       imageWidth: 200,
  //       imageHeight: 200,
  //       imageAlt: "Custom image",
  //     });
  //     savePlayerScore();
  //     reset();
  //   } else {
  //     setScore(score);
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[url('/fondo.png')] bg-cover">
      {/* 🏆 Menú hamburguesa en móvil */}
      <button
        className="md:hidden fixed relative top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => setShowScores(!showScores)}
      >
        ☰ Puntajes
      </button>

      {/* 🏆 Barra de puntajes: fija en desktop, oculta en móviles */}
      <div
        className={`md:flex flex-col w-full md:w-1/5 bg-gray-200 p-6 ${
          showScores ? "block" : "hidden"
        }`}
      >
        <h1 className="text-xl font-bold">Puntajes:</h1>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                NOMBRE
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                PUNTAJE
              </th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr key={player.id} className="border-b">
                <td className="px-4 py-2 text-sm">{player.name}</td>
                <td className="px-4 py-2 text-sm">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎮 Sección del juego */}
      <div className="flex flex-col items-center justify-center w-full md:w-4/5 p-6">
        <h1 className="text-3xl font-bold bg-blue-200 m-4">AMINOAHORCADO</h1>

        {wordData && (
          <>
            {/* 🖼️ Imágenes */}
            <div className="relative w-50 h-50">
              <Image
                src="/molecula.jpg"
                alt="Ahorcado"
                width={500} // Define el ancho adecuado
                height={500} // Define la altura adecuada
                className={`absolute w-full h-full z-10 transition-all duration-500 ease-in-out ${
                  attempts === 0 ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  maskImage: `radial-gradient(circle, rgba(0,0,0,1) ${
                    (attempts / 6) * 100
                  }%, rgba(0,0,0,0) 100%)`,
                  WebkitMaskImage: `radial-gradient(circle, rgba(0,0,0,1) ${
                    (attempts / 6) * 100
                  }%, rgba(0,0,0,0) 100%)`,
                }}
                priority
              />

              <Image
                src="/ahorcado_0.png"
                alt="Ahorcado"
                width={500} // Define el ancho adecuado
                height={500} // Define la altura adecuada
                className="absolute mt-4 w-40"
              />
            </div>

            {/* 🔠 Palabra oculta */}
            <p className="mt-4 text-4xl tracking-wide font-mono">
              {hiddenWord}
            </p>
            <p className="mt-2 text-lg bg-blue-200">
              Intentos restantes: {attempts}
            </p>
            <p className="mt-2 text-lg font-semibold bg-blue-200">
              Puntuación: {score}
            </p>

            {/* 🔡 Botones de letras */}
            <div className="mt-4 grid grid-cols-7 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  className={`px-4 py-2 rounded transition ${
                    usedLetters.includes(letter)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                  disabled={usedLetters.includes(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* 🎯 Botones de acción */}
            <div className="flex flex-row gap-2">
              <button
                onClick={handleClue}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
              >
                Dame una pista
              </button>
              <button
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-green-700 transition"
                onClick={reset}
              >
                Volver a Empezar
              </button>
            </div>
          </>
        )}
      </div>
      {/* <div>
        <p className="text-lg font-semibold text-white">
          Tiempo restante: {timeLeft}s
        </p>
      </div> */}
    </div>
  );
}
