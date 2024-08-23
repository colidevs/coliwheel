"use client";

import {motion} from "framer-motion";
import {useState, useRef} from "react";
import Swal from "sweetalert2";

import {Textarea} from "@/components/ui/textarea";

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
    {id: 0, nombre: "Ejemplo 1", color: getRandomColor()},
    {id: 1, nombre: "Ejemplo 2", color: getRandomColor()},
    {id: 2, nombre: "Ejemplo 3", color: getRandomColor()},
    {id: 3, nombre: "Ejemplo 4", color: getRandomColor()},
    {id: 4, nombre: "Ejemplo 5", color: getRandomColor()},
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
      {id: 0, nombre: "Joel", color: getRandomColor()},
      {id: 1, nombre: "Astrid", color: getRandomColor()},
      {id: 2, nombre: "Eze", color: getRandomColor()},
      {id: 3, nombre: "Fran", color: getRandomColor()},
      {id: 4, nombre: "Facu", color: getRandomColor()},
      {id: 5, nombre: "Fede", color: getRandomColor()},
      {id: 6, nombre: "Guada", color: getRandomColor()},
      {id: 7, nombre: "Guille", color: getRandomColor()},
      {id: 8, nombre: "Marco", color: getRandomColor()},
      {id: 9, nombre: "Nico", color: getRandomColor()},
      {id: 10, nombre: "Lucas", color: getRandomColor()},
      {id: 11, nombre: "Lato", color: getRandomColor()},
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
    const incremento = 80;
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
      color: getRandomColor(),
    }));

    setparticipantes(nuevosparticipantes);
  };

  return (
    <div className="flex min-h-screen flex-wrap items-center  justify-center p-4 md:p-8 lg:flex-nowrap">
      <section className="bg- flex w-full flex-1 flex-col rounded-xl p-5 shadow-2xl lg:w-2/3">
        <section className="mb-4 grid flex-1 grid-cols-2 gap-5 sm:grid-cols-3 ">
          {participantes.map((participante) => (
            <motion.div
              key={participante.id}
              animate={{
                scale: ganador?.id === participante.id ? 1.1 : 1,
                backgroundColor: ganador?.id === participante.id ? "#00CADB" : participante.color,
                boxShadow:
                  ganador?.id === participante.id ? `0 4px 15px ${participante.color}` : "",
              }}
              className="relative flex h-20 items-center justify-center rounded-xl text-lg text-black shadow-xl sm:h-24 sm:w-32"
              initial={{scale: 1}}
              style={{backgroundColor: participante.color}}
              transition={{duration: 0.2}}
            >
              {participante.nombre}
              <button
                className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-500 px-2 text-xs text-white"
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
        <div className="flex justify-center">
          <button
            className="focus: rounded-xl bg-indigo-800 px-16 py-2 text-white ring hover:bg-cyan-500 focus:ring-indigo-600 sm:px-20"
            disabled={estaGirando ? true : participantes.length === 0}
            type="button"
            onClick={ElegirGanador}
          >
            ¡Girar!
          </button>
        </div>
      </section>

      <div className="hidden lg:block lg:w-4" />

      <section className="mt-8 w-full rounded-lg bg-indigo-950 p-5 shadow-xl lg:mt-0 lg:w-1/3">
        <h2 className="mb-4 text-center font-bold text-white">¡Agrega Participantes!</h2>
        <section className="flex flex-col items-center space-y-6">
          <Textarea
            ref={inputRef}
            className=" h-48 w-full  border p-4 text-lg text-white"
            placeholder={`Ejemplo 1\nEjemplo 2\nEjemplo 3\nEjemplo 4\nEjemplo 5`}
            onChange={AgregarParticipante}
          />

          <div className="flex gap-4">
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-indigo-500"
              type="button"
              onClick={PonerDefalut}
            >
              🕊️
            </button>
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-indigo-500"
              type="button"
              onClick={LimpiarNombres}
            >
              🧹
            </button>
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white hover:bg-indigo-500"
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
