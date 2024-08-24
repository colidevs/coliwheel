"use client";

import {motion} from "framer-motion";
import {useState, useRef} from "react";
import Swal from "sweetalert2";

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
  const Ejemplos: Opcion[] = [
    {id: 0, nombre: "Ejemplo 1", color: "#EBEBEB"},
    {id: 1, nombre: "Ejemplo 2", color: "#EBEBEB"},
    {id: 2, nombre: "Ejemplo 3", color: "#EBEBEB"},
    {id: 3, nombre: "Ejemplo 4", color: "#EBEBEB"},
    {id: 4, nombre: "Ejemplo 5", color: "#EBEBEB"},
  ];

  const [participantes, setparticipantes] = useState<Opcion[]>(Ejemplos);
  const [mostrarBotonX, setMostrarBotonX] = useState<boolean>(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [ganador, setGanador] = useState<Opcion>();
  const [estaGirando, setEstaGirando] = useState<boolean>(false);

  function LimpiarNombres() {
    setparticipantes([]);
    if (!inputRef.current) return;
    inputRef.current.value = "";
  }

  function eliminarParticipante(id: number) {
    if (!inputRef.current) {
      return;
    }
    const nuevoArray = participantes.filter((participante) => participante.id !== id);

    inputRef.current.value = nuevoArray.map((persona) => persona.nombre).join("\n");

    setparticipantes(nuevoArray);
  }

  function PonerDefalut() {
    const NombresDeafault: Opcion[] = [
      {id: 0, nombre: "Joel", color: "#EBEBEB"},
      {id: 1, nombre: "Astrid", color: "#EBEBEB"},
      {id: 2, nombre: "Eze", color: "#EBEBEB"},
      {id: 3, nombre: "Fran", color: "#EBEBEB"},
      {id: 4, nombre: "Facu", color: "#EBEBEB"},
      {id: 5, nombre: "Fede", color: "#EBEBEB"},
      {id: 6, nombre: "Guada", color: "#EBEBEB"},
      {id: 7, nombre: "Guille", color: "#EBEBEB"},
      {id: 8, nombre: "Marco", color: "#EBEBEB"},
      {id: 9, nombre: "Nico", color: "#EBEBEB"},
      {id: 10, nombre: "Lucas", color: "#EBEBEB"},
      {id: 11, nombre: "Lato", color: "#EBEBEB"},
    ];

    if (inputRef.current) {
      inputRef.current.value = NombresDeafault.map((persona) => persona.nombre).join("\n");
    }
    setparticipantes(NombresDeafault);
  }
  //GIRAR
  function ElegirGanador() {
    setEstaGirando(true);
    let index = Math.floor(Math.random() * participantes.length);
    let velocidad = 20;
    const incremento = 40;
    let parar = false;

    const girar = () => {
      if (parar) return;
      index = Math.floor(Math.random() * participantes.length);
      const cambio = participantes[index];

      setGanador(cambio);

      velocidad += incremento;
      setTimeout(girar, velocidad);
    };

    girar();

    setTimeout(() => {
      parar = true;

      const finalGanador = participantes[index];

      setGanador(finalGanador);
      setEstaGirando(false);
      Swal.fire({
        title: `El ganador es ${finalGanador?.nombre}`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar Ganador",
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoArray = participantes.filter(
            (participante) => participante.id !== finalGanador?.id,
          );

          setparticipantes(nuevoArray);
        }
      });
    }, 7000);
  }

  //Agregar Participantes
  const AgregarParticipante = () => {
    if (inputRef.current === null) return;

    const nombresParticipantes = inputRef.current.value
      .trim()
      .split("\n")
      .filter((participante) => participante !== "");

    const maxid =
      participantes.length === 0 ? 0 : Math.max(...participantes.map((user) => user.id));

    const nuevosparticipantes: Opcion[] = nombresParticipantes.map((participante, index) => ({
      id: maxid + index + 1,
      nombre: participante,
      color: "#EBEBEB",
    }));

    setparticipantes(nuevosparticipantes);
  };

  function getCols(size: number): string {
    return "";
  }

  return (
    <div className="flex h-full">
      <section className="flex max-h-fit flex-wrap gap-4">
        {participantes.map((participante) => (
          <motion.div
            key={participante.id}
            animate={{
              scale: ganador?.id === participante.id ? 1.1 : 1,
              backgroundColor: ganador?.id === participante.id ? "#7A5AC4" : participante.color,
              boxShadow: ganador?.id === participante.id ? `0 4px 15px #7A5AC4` : "",
              color: ganador?.id === participante.id ? "#fff" : "",
            }}
            className={`relative flex size-20 items-center justify-center rounded-xl text-xl font-semibold text-black shadow-xl sm:size-24 ${participantes.length > 98 ? "sm:size-20" : "sm:size-24"}`}
            initial={{scale: 1}}
            style={{backgroundColor: participante.color}}
            transition={{duration: 0.2}}
          >
            {participante.nombre}
            <button
              className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-500 px-3 py-2 text-xs text-white"
              hidden={mostrarBotonX}
              style={{transform: "translate(50%, -50%)"}}
              type="button"
              onClick={() => eliminarParticipante(participante.id)}
            >
              X
            </button>
          </motion.div>
        ))}
      </section>

      <section className="flex flex-col">
        <h2 className="mb-4 text-center font-bold">¡Agrega Participantes!</h2>
        <section className="flex flex-1 flex-col items-center space-y-6">
          <Textarea
            ref={inputRef}
            className="h-full w-full flex-1 resize-none border p-4 text-lg"
            placeholder={`Ejemplo 1\nEjemplo 2\nEjemplo 3\nEjemplo 4\nEjemplo 5`}
            onChange={AgregarParticipante}
          />

          <Button
            className="rounded-xl px-16 py-2 sm:px-20"
            disabled={estaGirando ? true : participantes.length === 0}
            type="button"
            onClick={ElegirGanador}
          >
            ¡Girar!
          </Button>

          <div className="flex gap-4">
            <button className="rounded px-4 py-2" type="button" onClick={PonerDefalut}>
              🕊️
            </button>
            <button className="rounded px-4 py-2" type="button" onClick={LimpiarNombres}>
              🧹
            </button>
            <button
              className="rounded px-4 py-2"
              type="button"
              onClick={() => setMostrarBotonX(!mostrarBotonX)}
            >
              ❌
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}
