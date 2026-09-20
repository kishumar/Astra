import React, { useEffect, useState } from "react";

function NextOfContact() {
  const [timeLeft, setTimeLeft] = useState(5); // countdown from 60 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-semibold">Redirecting to home page...</h1>
      <p className="text-5xl font-bold mt-4">{timeLeft}s</p>
    </div>
  );
}

export default NextOfContact;
