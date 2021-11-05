import { ReactNode } from "react";
import { LocateCepProvider } from "./CepProvider";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return <LocateCepProvider>{children}</LocateCepProvider>;
};

export default Providers;
