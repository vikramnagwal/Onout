"use client";

import { useState, useEffect } from "react";

export default function Workspace() {
  const [data, setData] = useState<{ message?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/workspace");

        if (!res.ok) {
          throw new Error(`API error with status ${res.status}`);
        }

        const responseData = await res.json();
        setData(responseData);
      } catch (err) {
        console.error("Failed to fetch workspace:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspace();
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-md">
        <h2 className="font-bold">Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Workspace</h1>
      <div>{data?.message || "No message found"}</div>
    </div>
  );
}
