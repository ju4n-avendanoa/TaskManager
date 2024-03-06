"use client";

import { TypeAnimation } from "react-type-animation";

function TextAnimated() {
  return (
    <TypeAnimation
      sequence={[
        "A powerful tool designed to streamline and optimize your task management process efficiently.",
      ]}
      speed={50}
      className="text-xl inline-block"
    />
  );
}

export default TextAnimated;
