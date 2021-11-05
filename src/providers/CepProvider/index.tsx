import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

import toast from "react-hot-toast";
import api from "../../services";

interface ILocationProps {
  children: ReactNode;
}

interface ILocation {
  complemento: string;
  bairro: string;
  cidade: string;
  logradouro: string;
  estado_info: ILocation_info;
  cep: string;
  cidade_info: ILocation_info;
  estado: string;
}

interface ILocation_info {
  area_km2: string;
  codigo_ibge: string;
  nome?: string;
}

interface LocationData {
  ceps: ILocation;
  cepNumber: string;
  setCepNumber: Dispatch<SetStateAction<string>>;
  setCeps: Dispatch<SetStateAction<ILocation>>;
  handleSearch: (local: string) => void;
}

const LocateCepContext = createContext<LocationData>({} as LocationData);

export const LocateCepProvider = ({ children }: ILocationProps) => {
  const [ceps, setCeps] = useState({} as ILocation);
  const [cepNumber, setCepNumber] = useState<string>("");

  const handleSearch = async () => {
    if (cepNumber.length === 8) {
      await api
        .get(`${cepNumber}`)
        .then((response) => setCeps(response.data))
        .catch((err) => toast.error("Ops! CEP não encontrado..."));
    } else {
      toast.error("CEP inválido! São necessários 8 números");
    }
  };

  useEffect(() => {
    setCepNumber(cepNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocateCepContext.Provider
      value={{ ceps, setCepNumber, cepNumber, handleSearch, setCeps }}
    >
      {children}
    </LocateCepContext.Provider>
  );
};

export const useLocateCep = () => useContext(LocateCepContext);
