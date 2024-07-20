"use client";

import {motion} from "framer-motion";
import {useState, useRef} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
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
  const [personas, setPersonas] = useState<Opcion[]>([
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

  const inputRef = useRef<HTMLInputElement>(null);
  const ValorInicial: Opcion = personas[0];
  const [ganador, setGanador] = useState<Opcion>(ValorInicial);

  const ElegirGanador = () => {
    const randomId = Math.floor(Math.random() * personas.length);
    const ganador: Opcion | undefined = personas.find((persona) => persona.id === randomId);

    if (!ganador) return;
    setGanador(ganador);
  };

  const AgregarPersona = () => {
    if (inputRef.current !== null) {
      const nuevaPersona: Opcion = {
        id: personas.length + 1,
        nombre: inputRef.current.value,
      };

      setPersonas((prevPersonas) => [...prevPersonas, nuevaPersona]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-5">
      <div className="grid grid-cols-5 gap-6">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.id}
            className={`flex h-16 w-16 items-center justify-center text-white shadow-xl ${
              colors[index % colors.length]
            } ${persona.id === ganador.id ? "shadow-cyan-500/50" : ""}`}
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
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input ref={inputRef} placeholder="Ingrese un nombre" />
        <Button type="submit" onClick={AgregarPersona}>
          Agregar
        </Button>
      </div>
      <p className="mt-4 text-lg font-bold">Ganador: {ganador.nombre}</p>
    </div>
  );
}
