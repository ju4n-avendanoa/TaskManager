import React from "react";

function LoadingTask() {
  return (
    <div className="bg-zinc-800 py-2 px-4 flex flex-col gap-3 rounded-md shadow-md shadow-black lg:min-h-[130px] md:min-h-[110px] min-h-[100px] max-h-[130px] overflow-hidden touch-none">
      <div>
        <div className="w-full bg-sky-400/70 h-4 rounded-full animate-pulse" />
      </div>
      <div className="flex gap-2 flex-col">
        <div className="w-full bg-zinc-400/70 h-4 rounded-full animate-pulse" />
        <div className="w-3/4 bg-zinc-400/70 h-3 rounded-full animate-pulse" />
        <div className="w-1/2 bg-zinc-400/70 h-3 rounded-full animate-pulse" />
        <div className="w-1/4 bg-zinc-400/70 h-3 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export default LoadingTask;
