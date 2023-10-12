import React from "react";

function Loading() {
  return (
    <div className="flex justify-center h-full items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-300"></div>
    </div>
  );
}

export default Loading;
