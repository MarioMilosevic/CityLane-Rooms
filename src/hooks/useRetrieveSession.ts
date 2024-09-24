import { useState, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";
import { getSession } from "src/api/LoginApi";

const useRetrieveSession = (navigate: NavigateFunction) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const retrieveSession = async () => {
      try {
        setLoading(true);
        const result = await getSession();
        if (result && "session" in result && result.session) {
          navigate("/bookings");
        }
      } catch (error) {
        console.error("Error fetching session", error);
      } finally {
        setLoading(false);
      }
    };

    retrieveSession();
  }, [navigate]);
  return loading;
};

export default useRetrieveSession;
