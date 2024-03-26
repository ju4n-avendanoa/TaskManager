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
      className="h-full flex items-center justify-center xl:justify-center w-full md:p-6 p-2"
    >
      <ImageWithFallback
        src={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1711491465/TaskManager/image-removebg_yvk2cu.png"
        }
        alt="example"
        width={1000}
        height={1000}
        fallbackSrc="asd"
        className="h-auto w-[650px] pr-3 xl:scale-110 md:py-8 xl:py-0 bg-zinc-800 rounded-xl hidden md:block lg:hidden xl:block"
        priority
      />
      <ImageWithFallback
        src={
          "https://res.cloudinary.com/dhjqarghy/image/upload/v1711491950/TaskManager/image-removebg-single_mihyte.png"
        }
        alt="example"
        width={1000}
        height={1000}
        fallbackSrc="asd"
        className="h-auto w-[350px] rounded-xl bg-zinc-800 md:hidden lg:block xl:hidden"
        priority
      />
    </motion.div>
  );
}

export default ImageMainPage;
