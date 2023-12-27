"use client";
import { Dispatch, createContext, useState } from "react";

type DashboardContextType = {
  activeSort: "nearest_difficulty" | "newest";
  setActiveSort: Dispatch<
    React.SetStateAction<"nearest_difficulty" | "newest">
  >;
  activeLanguage: number;
  setActiveLanguage: Dispatch<React.SetStateAction<number>>;
};

export const DashboardContext = createContext<DashboardContextType>({
  activeSort: "newest",
  setActiveSort: () => {},
  activeLanguage: 0,
  setActiveLanguage: () => {},
});

export const DashboardContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSort, setActiveSort] = useState<"nearest_difficulty" | "newest">(
    "nearest_difficulty"
  );
  const [activeLanguage, setActiveLanguage] = useState<number>(0);
  return (
    <DashboardContext.Provider
      value={{
        activeSort,
        setActiveSort,
        activeLanguage,
        setActiveLanguage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
