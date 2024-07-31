import {motion} from "framer-motion";

interface ParticipantCardProps {
  nombre: string;
  isSelected: boolean;
  color: string;
}

export default function ParticipantCard({nombre, isSelected, color}: ParticipantCardProps) {
  return (
    <motion.div
      animate={{
        scale: isSelected ? 1.1 : 1,
        backgroundColor: isSelected ? "#00CADB" : color,
        boxShadow: isSelected ? `0 4px 15px ${color}` : "",
      }}
      className="flex h-16 w-16 items-center justify-center text-white shadow-xl"
      initial={{scale: 1}}
      style={{backgroundColor: color}}
      transition={{duration: 0.2}}
    >
      {nombre}
    </motion.div>
  );
}
