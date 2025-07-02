"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import ReactQueryProvider from "./ReactQueryProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
