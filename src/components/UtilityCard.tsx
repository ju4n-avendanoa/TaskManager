import React from "react";

type Props = {
  title: string;
  description: string;
};

function UtilityCard({ title, description }: Props) {
  return (
    <article className="box">
      <div className="z-10 w-[345px] mx-auto h-[245px] my-auto p-4 absolute inset-0 bg-zinc-900 flex items-start flex-col gap-4 justify-center">
        <h3 className="text-sky-400 font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default UtilityCard;
