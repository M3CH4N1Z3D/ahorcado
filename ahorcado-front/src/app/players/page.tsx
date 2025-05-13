"use client";
import { useRouter } from "next/navigation";

export default function ResetPlayers() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleResetPlayers = async () => {
    const response = await fetch(`${apiUrl}/api/players`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("Jugadores eliminados exitosamente.");
      router.push("/");
    } else {
      alert("Hubo un error al eliminar los jugadores.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-col min-h-screen bg-[url('/fondo.png')] bg-cover">
      <button
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-green-700 transition w-[50%]"
        onClick={handleResetPlayers}
      >
        RESET JUGADORES
      </button>
    </div>
  );
}
