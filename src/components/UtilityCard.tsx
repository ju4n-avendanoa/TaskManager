import React from "react";

type Props = {
  title: string;
  description: string;
};

function UtilityCard({ title, description }: Props) {
  return (
    <article className="box xl:w-[350px] xl:h-[250px] w-[280px] h-[200px]">
      <div className="z-10 xl:w-[345px] mx-auto xl:h-[245px] w-[275px] h-[195px] my-auto p-4 absolute inset-0 bg-zinc-900 flex items-start flex-col gap-4 justify-center">
        <h3 className="text-sky-400 font-semibold">{title}</h3>
        <p className="text-sm xl:text-base">{description}</p>
      </div>
    </article>
  );
}

export default UtilityCard;
