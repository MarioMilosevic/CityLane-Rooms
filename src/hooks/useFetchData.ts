import { useEffect, useState } from "react";

const useFetchData = <T,>(
  setData: React.Dispatch<React.SetStateAction<T>>,
  fetchData: () => Promise<T>
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        setLoading(true);
        const data = await fetchData();
        setData(data);
      } catch (error) {
        console.error("Error fetching rooms", error);
        setData([] as T);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSetData();
  }, [setData, fetchData]);
  return loading;
};

export default useFetchData;
