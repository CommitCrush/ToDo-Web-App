import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [status, setStatus] = useState("Überprüfung läuft...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Token fehlt in der URL.");
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/verify?token=${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setStatus("E-Mail erfolgreich bestätigt. Weiterleitung zum Login...");
          setTimeout(() => navigate("/"), 2000);
        } else {
          setStatus(data.message || "Bestätigung fehlgeschlagen.");
        }
      } catch  {
        setStatus("Verbindung zum Server fehlgeschlagen.");
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">E-Mail-Bestätigung</h2>
      <p className="mt-4">{status}</p>
    </div>
  );
};

export default VerifyEmail;
