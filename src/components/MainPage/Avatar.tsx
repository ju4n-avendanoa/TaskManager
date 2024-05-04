"use client";

import { motion } from "framer-motion";
import ImageWithFallback from "../ImageWithFallback";

type Props = {
  src: string;
};

function Avatar({ src }: Props) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <ImageWithFallback
        src={src}
        alt="as"
        width={500}
        height={500}
        fallbackSrc=""
        className="min-w-[5px] min-h-[5px] sm:max-w-[40px] sm:max-h-[40px] md:max-w-[50px] md:max-h-[50px] xl:w-16 xl:h-16 rounded-full border bg-zinc-400 border-zinc-900 shadow-lg shadow-zinc-900 transition hover:scale-110 duration-150"
      />
    </motion.div>
  );
}

export default Avatar;
