function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-zinc-700">
      <div className="w-16 h-16 border-t-4 border-solid rounded-full border-zinc-300 animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-zinc-300">Loading...</p>
    </div>
  );
}

export default Loading;
