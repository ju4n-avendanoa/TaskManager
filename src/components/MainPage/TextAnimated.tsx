"use client";

import { TypeAnimation } from "react-type-animation";

function TextAnimated() {
  return (
    <TypeAnimation
      sequence={[
        "A powerful tool designed to streamline and optimize your task management process efficiently.",
      ]}
      speed={50}
      className="text-base sm:text-lg lg:text-xl xl:text-2xl md:text-xl inline-block w-full text-center lg:text-left lg:w-3/4"
    />
  );
}

export default TextAnimated;
