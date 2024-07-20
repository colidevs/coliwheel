import {motion} from "framer-motion";

interface ParticipantCardProps {
  id: number;
  nombre: string;
  isSelected: boolean;
  color: string;
}

export default function ParticipantCard({id, nombre, isSelected, color}: ParticipantCardProps) {
  return (
    <motion.div
      className={`flex h-16 w-16 items-center justify-center text-white shadow-xl ${color} ${isSelected ? "shadow-cyan-500/50" : ""}`}
    >
      {nombre}
    </motion.div>
  );
}
