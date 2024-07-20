"use client";

import {motion} from "framer-motion";
import {useState} from "react";

import ParticipantCard from "./ParticipantCard";

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

interface Opcion {
  id: number;
  nombre: string;
}

const getRandomColor = (): string => {
  const randomColor = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

  return randomColor.padEnd(7, "0");
};

export default function HomePage() {
  const ValorInicial: Opcion = Personas[0];
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * Personas.length);
    const ganador: Opcion | undefined = Personas.find((persona) => persona.id == randomId);

    if (!ganador) return;
    setGanador(ganador);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="grid grid-cols-5 gap-6">
        {Personas.map((persona) => (
          <ParticipantCard
            key={persona.id}
            color={getRandomColor()}
            isSelected={persona.nombre === persona.nombre}
            nombre={persona.nombre}
          />
          // <motion.div
          //   key={persona.id}
          //   className={`flex h-16 w-16 items-center justify-center text-white shadow-xl ${
          //     colors[index % colors.length]
          //   } ${persona.nombre === ganador.nombre ? "shadow-cyan-500/50" : ""}`}
          // >
          //   {persona.nombre}
          // </motion.div>
        ))}
      </div>
      <button
        className="rounded bg-green-500 px-4 py-2 text-white"
        type="button"
        onClick={ElegirGanador}
      >
        Girar
      </button>
      <p className="mt-4 text-lg font-bold">Ganador: {ganador.nombre}</p>
    </div>
  );
}
