import React from "react";

async function Test() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await response.json();

  return (
    <div className="pt-28">{comments.map((comment: any) => comment.body)}</div>
  );
}

export default Test;
