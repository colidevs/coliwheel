"use client";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

import ParticipantCard from "./ParticipantCard";

import {Button} from "@/components/ui/button";

interface Opcion {
  id: number;
  nombre: string;
}

const getRandomColor = (): string => {
  const randomColor = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

  return randomColor.padEnd(7, "0");
};

export default function HomePage() {
  const [Participantes, setParticipantes] = useState<Opcion[]>([
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
  ]);
  const ValorInicial: Opcion = Participantes[0];
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);
  const [colores, setColores] = useState<{[key: number]: string}>({});
  const [nombreNuevo, setNombreNuevo] = useState<string>("");

  useEffect(() => {
    const coloresGenerados: {[key: number]: string} = {};

    Participantes.forEach((participante) => {
      coloresGenerados[participante.id] = getRandomColor();
    });
    setColores(coloresGenerados);
  }, [Participantes]);

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * Participantes.length);
    const ganador: Opcion | undefined = Participantes.find(
      (participante) => participante.id == randomId,
    );

    if (!ganador) return;
    setGanador(ganador);
  };

  const AgregarParticipante = () => {
    if (nombreNuevo.trim() === "") return;
    const nuevoParticipante: Opcion = {
      id: Participantes.length,
      nombre: nombreNuevo,
    };

    setParticipantes([...Participantes, nuevoParticipante]);
    setColores({...colores, [nuevoParticipante.id]: getRandomColor()});
    setNombreNuevo("");
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="flex space-x-4">
        <input
          className="border p-2 text-black"
          placeholder="Nombre del participante"
          type="text"
          value={nombreNuevo}
          onChange={(e) => setNombreNuevo(e.target.value)}
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
            color={colores[participante.id]}
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
