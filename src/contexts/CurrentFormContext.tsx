import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CurrentFormContextProps {
  currentFormId: number | null;
  updateCurrentForm: Dispatch<SetStateAction<number | null>>;
}

export const CurrentFormContext = createContext<CurrentFormContextProps>({
  currentFormId: null,
  updateCurrentForm: (tab) => {},
});

export const CurrentFormProvider = ({ children }: { children: ReactNode }) => {
  const [currentFormId, setCurrentFormId] = useState<number | null>(null);

  const updateCurrentForm: Dispatch<SetStateAction<number | null>> = (
    formId
  ) => {
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
