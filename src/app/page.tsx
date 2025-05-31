"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { decrypt, encrypt } from "./caesarCipher";

interface Inputs {
  key: number;
  clearText: string;
}

const emptyInputs: Inputs = {
  key: 0,
  clearText: "",
};

export default function Home() {
  const [inputs, setInputs] = useState<Inputs>(emptyInputs);
  const [cipherText, setCipherText] = useState<string>("");
  const [isEncrypting, setIsEncrypting] = useState(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: name === "clearText" ? value : parseInt(value) || 0,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = isEncrypting
        ? encrypt(inputs.key, inputs.clearText)
        : decrypt(inputs.key, inputs.clearText);
      setCipherText(result);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const toggleMode = () => {
    setIsEncrypting(!isEncrypting);
    setCipherText("");
    setInputs(emptyInputs);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Cifra de César</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded border ${
            isEncrypting
              ? "bg-green-500 text-white border-green-600"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Criptografar
        </button>
        <button
          onClick={toggleMode}
          className={`px-4 py-2 rounded border ${
            !isEncrypting
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Descriptografar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chave</label>
          <input
            type="number"
            name="key"
            required
            placeholder="Ex: 3"
            className="w-full border border-gray-300 p-2 rounded"
            value={inputs.key || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Texto {isEncrypting ? "Original" : "Criptografado"}
          </label>
          <textarea
            name="clearText"
            required
            rows={4}
            placeholder={`Digite o texto para ${
              isEncrypting ? "criptografar" : "descriptografar"
            }...`}
            className="w-full border border-gray-300 p-2 rounded"
            value={inputs.clearText}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded font-semibold text-white ${
              isEncrypting ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {isEncrypting ? "Criptografar" : "Descriptografar"}
          </button>
        </div>
      </form>

      {cipherText && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">
            Texto {isEncrypting ? "Criptografado" : "Descriptografado"}
          </h2>
          <div className="border border-gray-300 p-3 rounded bg-gray-50 text-sm font-mono">
            {cipherText}
          </div>
        </div>
      )}
    </div>
  );
}
