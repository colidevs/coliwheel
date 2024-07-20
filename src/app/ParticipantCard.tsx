import {motion} from "framer-motion";

interface ParticipantCardProps {
  nombre: string;
  isSelected: boolean;
  color: string;
}

export default function ParticipantCard({nombre, isSelected, color}: ParticipantCardProps) {
  return (
    <motion.div
      className="flex h-16 w-16 items-center justify-center text-white shadow-xl"
      style={{backgroundColor: color}}
    >
      <div className={`flex items-center justify-center ${isSelected ? "shadow-cyan-500/50" : ""}`}>
        {nombre}
      </div>
    </motion.div>
  );
}
