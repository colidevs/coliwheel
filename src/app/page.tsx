"use client";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

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
  const [colores, setColores] = useState<{[key: number]: string}>({});

  useEffect(() => {
    const coloresGenerados: {[key: number]: string} = {};

    Personas.forEach((persona) => {
      coloresGenerados[persona.id] = getRandomColor();
    });
    setColores(coloresGenerados);
  }, []);

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * Personas.length);
    const ganador: Opcion | undefined = Personas.find((persona) => persona.id == randomId);

    if (!ganador) return;
    setGanador(ganador);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="flex space-x-4">
        <input
          className="border p-2 text-black"
          placeholder="Nombre del participante"
          type="text"
        />
        <button className="rounded bg-blue-500 px-4 py-2 text-white" type="button">
          Agregar
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {Personas.map((persona) => (
          <ParticipantCard
            key={persona.id}
            color={colores[persona.id]}
            isSelected={persona.id === ganador.id}
            nombre={persona.nombre}
          />
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
