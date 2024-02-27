"use client";

import React, { useEffect, useState } from "react";

function TestClient() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          cache: "no-store",
        }
      );

      const comments = await response.json();
      setComments(comments);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="pt-28">
      {loading ? (
        <h2 className="pt-32 text-4xl">Loading...</h2>
      ) : (
        comments.map((comment: any) => comment.body)
      )}
    </div>
  );
}

export default TestClient;
