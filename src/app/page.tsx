"use client";
import {useState} from "react";
import {motion} from "framer-motion";

import ParticipantCard from "./ParticipantCard";

import {Button} from "@/components/ui/button";

interface Opcion {
  id: number;
  nombre: string;
  color: string;
}

const getRandomColor = (): string => {
  const randomColor = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

  return randomColor.padEnd(7, "0");
};

export default function HomePage() {
  const [participantes, setParticipantes] = useState<Opcion[]>([
    {id: 0, nombre: "Martin", color: getRandomColor()},
    {id: 1, nombre: "Ana", color: getRandomColor()},
    {id: 2, nombre: "Luis", color: getRandomColor()},
    {id: 3, nombre: "Carlos", color: getRandomColor()},
    {id: 4, nombre: "Maria", color: getRandomColor()},
    {id: 5, nombre: "Sofia", color: getRandomColor()},
    {id: 6, nombre: "Jorge", color: getRandomColor()},
    {id: 7, nombre: "Laura", color: getRandomColor()},
    {id: 8, nombre: "Pedro", color: getRandomColor()},
    {id: 9, nombre: "Elena", color: getRandomColor()},
  ]);
  const ValorInicial: Opcion = participantes[0];
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);
  const [nombreNuevo, setNombreNuevo] = useState<string>("");

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * participantes.length);
    const ganador: Opcion | undefined = participantes.find(
      (participante) => participante.id === randomId,
    );

    if (!ganador) return;
    setGanador(ganador);
  };

  const AgregarParticipante = () => {
    if (nombreNuevo.trim() === "") return;
    const nuevoParticipante: Opcion = {
      id: participantes.length,
      nombre: nombreNuevo,
      color: getRandomColor(),
    };

    setParticipantes([...participantes, nuevoParticipante]);
    setNombreNuevo("");
  };

  return (
    <div className="flex min-h-screen items-center justify-between">
      {/* Section de participantes */}
      <section className="bg- flex flex-1 flex-col rounded-xl p-5 shadow-2xl">
        <section className="mb-4 grid flex-1 grid-cols-4 gap-5">
          {participantes.map((participante) => (
            <ParticipantCard
              key={participante.id}
              color={participante.color}
              isSelected={participante.id === ganador.id}
              nombre={participante.nombre}
            />
          ))}
        </section>
        <div className="items-center">
          <Button
            className="bg-indigo-950 px-20 py-2 text-white "
            type="button"
            onClick={ElegirGanador}
          >
            ¡Girar!
          </Button>
        </div>
      </section>

      {/* Espacio entre sections */}
      <div className="w-4" />

      {/* Section de agregar participante */}
      <section className="w-80 rounded-lg bg-indigo-950 p-5 shadow-xl">
        <h2 className="mb-4 text-center font-bold">Agrega Participantes!</h2>
        <section className="flex flex-col items-center space-y-6">
          <input
            className="border p-2 text-black"
            placeholder="Nombre del participante"
            type="text"
            value={nombreNuevo}
            onChange={(e) => setNombreNuevo(e.target.value)}
          />
          <button
            className="rounded bg-cyan-500 px-4 py-2 text-white"
            type="button"
            onClick={AgregarParticipante}
          >
            Agregar
          </button>
        </section>
      </section>
    </div>
  );
}
