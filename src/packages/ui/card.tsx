import { motion } from "motion/react";

interface CardProps {
    img: string;
    title: string;
    description: string;
}

export  function Card({img, title, description}: CardProps) {
  return (
    <motion.div className="shadow-md w-80 rounded-lg p-4 flex flex-col items-center gap-2 bg-gradient-to-tr from-cyan-300 to-blue-600 text-white">
        <div>
            <img src={img} alt="social-image" className="w-24 h-24 rounded-full border border-neutral-100 shadow-md overflow-hidden" />
        </div>
        <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="mt-4">{description}</p>
        </div>
    </motion.div>
  )
}
