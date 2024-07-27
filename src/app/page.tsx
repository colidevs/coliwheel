"use client";

import {useState, useRef} from "react";

import ParticipantCard from "./ParticipantCard";

import {Textarea} from "@/components/ui/textarea";
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
  const [Participantes, setParticipantes] = useState<Opcion[]>([
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

  const ValorInicial: Opcion = Participantes[0];
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * Participantes.length);
    const ganador: Opcion | undefined = Participantes.find(
      (participante) => participante.id === randomId,
    );

    if (!ganador) return;
    setGanador(ganador);
  };

  const AgregarParticipante = () => {
    if (inputRef.current === null) return;

    const nombresParticipantes = inputRef.current.value
      .trim()
      .split("\n")
      .filter((participante) => participante !== "");

    const nuevosParticipantes: Opcion[] = nombresParticipantes.map((participante, index) => ({
      id: Participantes.length + index,
      nombre: participante,
      color: getRandomColor(),
    }));

    setParticipantes([...Participantes, ...nuevosParticipantes]);
    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="flex space-x-4">
        <Textarea
          ref={inputRef}
          className="border p-2 text-lg text-white"
          placeholder="Nombre del participante"
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          type="button"
          onClick={AgregarParticipante}
        >
          Agregar
        </button>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {Participantes.map((participante) => (
          <ParticipantCard
            key={participante.id}
            color={participante.color}
            isSelected={participante.id === ganador.id}
            nombre={participante.nombre}
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
