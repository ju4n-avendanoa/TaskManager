"use client";

import { motion } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";

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
      className="h-full flex items-center justify-center w-full md:p-6 p-2"
    >
      <ImageWithFallback
        src={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1710193436/TaskManager/WhatsApp_Image_2024-03-11_at_4.43.33_PM_vo1bjq.jpg"
        }
        alt="ñ"
        width={1000}
        height={1000}
        fallbackSrc="asd"
        className="h-4/5 w-full lg:w-full xl:w-2/3 xl:scale-110"
      />
    </motion.div>
  );
}

export default ImageMainPage;
