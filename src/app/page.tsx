"use client";

import {useState, useRef} from "react";

import ParticipantCard from "./ParticipantCard";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const [Participantes, setParticipantes] = useState<Opcion[]>([]);

  const [ganador, setGanador] = useState<Opcion>();

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
            isSelected={participante.id === ganador?.id}
            nombre={participante.nombre}
          />
        ))}
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <button
            className="rounded bg-green-500 px-4 py-2 text-white"
            disabled={Participantes.length === 0}
            type="button"
            onClick={ElegirGanador}
          >
            Girar
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>El ganador es: {ganador?.nombre}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Eliminar Ganador</AlertDialogCancel>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
