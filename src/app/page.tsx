"use client";

import {motion} from "framer-motion";
import {useState} from "react";

import {Button} from "@/components/ui/button";

const Personas: Opcion[] = [
  {id: 0, nombre: "Martin"},
  {id: 1, nombre: "Ana"},
  {id: 2, nombre: "Luis"},
  {id: 3, nombre: "Carlos"},
  {id: 4, nombre: "Maria"},
  {id: 5, nombre: "Sofia"},
  {id: 6, nombre: "Jorge"},
  {id: 7, nombre: "Laura"},
  {id: 8, nombre: "Pedro"},
  {id: 9, nombre: "Elena"},
];

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-gray-500",
];

interface Opcion {
  id: number;
  nombre: string;
}

export default function HomePage() {
  const ValorInicial: Opcion = Personas[0];
  // const [x, setX] = useState(ValorInicial);
  // const [y, setY] = useState(ValorInicial);
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);
  // const MoverDerecha = () => {
  //   setX((x) => x + 100);
  // };

  // const MoverIz = () => {
  //   setY((y) => y + 100);
  // };

  // const ReiniciarX = () => {
  //   setX(ValorInicial);
  // };

  // const ReiniciarY = () => {
  //   setY(ValorInicial);
  // };
  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * Personas.length);
    const ganador: Opcion | undefined = Personas.find((persona) => persona.id == randomId);

    if (!ganador) return;
    setGanador(ganador);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="grid grid-cols-5 gap-6">
        {Personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            className={`flex h-16 w-16 items-center justify-center text-white shadow-xl ${colors[index % colors.length]}`}
          >
            {persona.nombre}
          </motion.div>
        ))}
      </div>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white"
        type="button"
        onClick={ElegirGanador}
      >
        Girar
      </button>
      <p className="mt-4 text-lg font-bold ">Ganador: {ganador.nombre}</p>
    </div>
  );
}
