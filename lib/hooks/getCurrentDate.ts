import {  useEffect, useState } from "react";

export function useGetCurrentDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return currentDate;
}

export function useGetCachedDate() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  useEffect(() => {
    const intervalId = setInterval(
      () => {
        setCurrentDate(new Date());
      },
      1000 * 60 * 1,
    );

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return currentDate;
}
