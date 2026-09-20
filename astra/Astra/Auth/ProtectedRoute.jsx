import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("sessionToken");
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Call Convex session validation query
  const session = useQuery(api.validatesession.validateSession, token ? { token } : "skip");

  useEffect(() => {
    if (session) {
      setIsValid(session.valid);
      setLoading(false);
      if (!session.valid) {
        localStorage.removeItem("sessionToken");
      }
    }
  }, [session]);

  if (loading) {
    return <div className="text-white text-center mt-10">Checking session...</div>;
  }

  if (!isValid) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
