function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-300">
      <div className="w-16 h-16 border-t-4 border-solid rounded-full border-slate-600 animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-slate-800">Loading...</p>
    </div>
  );
}

export default Loading;
