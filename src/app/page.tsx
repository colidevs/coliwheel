"use client";

import {useState} from "react";
import {motion} from "framer-motion";
=======

import {useState, useRef} from "react";


import ParticipantCard from "./ParticipantCard";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
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
  const [estaGirando, setEstaGirando] = useState<boolean>(false);
  const [mostrarDialogo, setMostrarDialogo] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  function ElegirGanador() {
    setEstaGirando(true);
    //opcion 2 let index = ganador.id
    let index = Math.floor(Math.random() * Participantes.length);
    let velocidad = 20;
    const incremento = 80;
    let parar = false;

    const girar = () => {
      if (parar) return;
      //opcion 2 index = Math.floor(Math.random() * Participantes.length);
      index = (index + 1) % Participantes.length;
      const cambio = Participantes[index];

      setGanador(cambio);

      velocidad += incremento;
      setTimeout(girar, velocidad);
    };

    girar();

    setTimeout(() => {
      parar = true;

      const finalGanador = Participantes[index];

      setGanador(finalGanador);
      setEstaGirando(false);
      setMostrarDialogo(true);
    }, 9000); //entre 7000 a 9000
  }

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
            disabled={estaGirando && Participantes.length === 0}
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
           <Textarea
          ref={inputRef}
          className="border p-2 text-lg text-white"
          placeholder="Nombre del participante"
        />
          <button
            className="rounded bg-cyan-500 px-4 py-2 text-white"
            type="button"
            onClick={AgregarParticipante}
          >
            Agregar
          </button>
        </section>
          <AlertDialog open={mostrarDialogo}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>El ganador es: {ganador?.nombre}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Eliminar Ganador</AlertDialogCancel>
            <AlertDialogAction onClick={() => setMostrarDialogo(false)}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </section>
    </div>
  );
}
