import { FC } from "react";

export const SearchBar: FC = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md space-x-4">
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Procurar por: Título, Salário, Período"
      />
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Cidade, Estado"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Encontrar
      </button>
    </div>
  );
};
