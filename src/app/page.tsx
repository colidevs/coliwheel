"use client";

import {motion} from "framer-motion";
import {useState, useRef} from "react";

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
  const [participantes, setparticipantes] = useState<Opcion[]>([]);
  const [mostrarBotonX, setMostrarBotonX] = useState<boolean>(true);

  const [ganador, setGanador] = useState<Opcion>();
  const [estaGirando, setEstaGirando] = useState<boolean>(false);
  const [mostrarDialogo, setMostrarDialogo] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  function LimpiarNombres() {
    setparticipantes([]);
  }

  function eliminarGanador() {
    const nuevoArray = participantes.filter((participante) => participante.id !== ganador?.id);

    setparticipantes(nuevoArray);
    setMostrarDialogo(false);
  }

  function eliminarParticipante(id: number) {
    const nuevoArray = participantes.filter((participante) => participante.id !== id);

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

    setparticipantes(NombresDeafault);
  }

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
      setMostrarDialogo(true);
    }, 9000);
  }

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

    setparticipantes([...participantes, ...nuevosparticipantes]);
    inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen items-center justify-between">
      <section className="bg- flex flex-1 flex-col rounded-xl p-5 shadow-2xl">
        <section className="mb-4 grid flex-1 grid-cols-4 gap-5">
          {participantes.map((participante) => (
            <motion.div
              key={participante.id}
              animate={{
                scale: ganador?.id === participante.id ? 1.1 : 1,
                backgroundColor: ganador?.id === participante.id ? "#00CADB" : participante.color,
                boxShadow:
                  ganador?.id === participante.id ? `0 4px 15px ${participante.color}` : "",
              }}
              className="relative flex h-16 w-16 items-center justify-center rounded-xl text-lg text-black shadow-xl"
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
        <div className="items-center">
          <Button
            className="bg-indigo-950 px-20 py-2 text-white "
            disabled={estaGirando ? true : participantes.length === 0}
            type="button"
            onClick={ElegirGanador}
          >
            ¡Girar!
          </Button>
        </div>
      </section>

      <div className="w-4" />

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
          <div className="flex gap-4">
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white"
              type="button"
              onClick={PonerDefalut}
            >
              🕊️
            </button>
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white"
              type="button"
              onClick={LimpiarNombres}
            >
              🧹
            </button>
            <button
              className="rounded bg-cyan-500 px-4 py-2 text-white"
              type="button"
              onClick={() => setMostrarBotonX(!mostrarBotonX)}
            >
              ✖️
            </button>
          </div>
        </section>
        <AlertDialog open={mostrarDialogo}>
          <AlertDialogTrigger />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>El ganador es: {ganador?.nombre}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={eliminarGanador}>Eliminar Ganador</AlertDialogCancel>
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
