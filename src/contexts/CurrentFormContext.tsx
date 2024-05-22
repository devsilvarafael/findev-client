import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CurrentFormContextProps {
  currentFormId: number;
  updateCurrentForm: Dispatch<SetStateAction<number>>;
}

export const CurrentFormContext = createContext<CurrentFormContextProps>({
  currentFormId: 0,
  updateCurrentForm: () => {},
});

export const CurrentFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentFormId, setCurrentFormId] = useState<number>(0);

  const updateCurrentForm: Dispatch<SetStateAction<number>> = (formId) => {
    setCurrentFormId(formId);
  };

  return (
    <CurrentFormContext.Provider value={{ currentFormId, updateCurrentForm }}>
      {children}
    </CurrentFormContext.Provider>
  );
};

export const useCurrentForm = () => {
  const context = useContext(CurrentFormContext);

  if (!context) {
    throw new Error("useCurrentForm must be used within a CurrentFormProvider");
  }

  return context;
};
