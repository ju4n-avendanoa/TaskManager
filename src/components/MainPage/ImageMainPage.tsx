"use client";

import { motion } from "framer-motion";
import ImageWithFallback from "../ImageWithFallback";

function ImageMainPage() {
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
      className="h-full flex items-center justify-start xl:justify-center w-full md:p-6 p-2"
    >
      <ImageWithFallback
        src={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1710220566/TaskManager/example.jpg"
        }
        alt="ñ"
        width={1000}
        height={1000}
        fallbackSrc="asd"
        className="h-full min-w-[650px] xl:w-2/3 xl:scale-110 py-8"
        priority
      />
    </motion.div>
  );
}

export default ImageMainPage;
