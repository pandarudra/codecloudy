import React, { useEffect, useState } from "react";
import { Editor } from "./Editor";
import "../css/extra.css";
import { lmp } from "../utils/LangMap";
import axios from "axios";
import { apiKey, baseApiUrl, hostKey } from "../envs/envs";

export const CodeEd: React.FC = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("Assembly (NASM 2.14.02)");
  const [output, setOutput] = useState<string | null>(null);
  const [langID, setLangID] = useState<number | null>(null);
  const [inputs, setInputs] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    const snippet = lmp.get(language)?.snippet;

    setCode(snippet ?? "// Write your code here...");
    const id = lmp.get(language)?.id;
    setLangID(id ?? null);
  }, [language]);

  useEffect(() => {
    const saveOnUnmount = () => {
      const time = new Date().toLocaleTimeString();
      if (code !== "") {
        localStorage.setItem(time, code);
      }
    };

    window.addEventListener("beforeunload", saveOnUnmount);

    return () => {
      window.removeEventListener("beforeunload", saveOnUnmount);
      saveOnUnmount();
    };
  }, [code]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.clear();
    }, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const runCode = async () => {
    const options = {
      method: "POST",
      url: baseApiUrl,
      params: { fields: "*" },
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": hostKey,
        "Content-Type": "application/json",
      },
      data: {
        language_id: langID,
        source_code: code,
        stdin: inputs || "",
      },
    };
    try {
      const res = await axios.request(options);
      console.log(res);
      if (!res.data.token) {
        throw new Error("Token not found");
      }
      const token = res.data.token;
      const options2 = {
        method: "GET",
        url: `${baseApiUrl}/${token}`,
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": hostKey,
        },
      };
      const output = await axios.request(options2);
      console.log(output);
      setOutput(atob(output.data.stdout));
      //atob() for decoding of base64 encoded string
    } catch (error: unknown) {
      setOutput(`Error executing code: ${error}`);
    }
  };

  return (
    <div className="gfont flex flex-col w-full h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-xl font-bold">Code cloudY</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 bg-gray-900">
        {/* Editor Section */}
        <div className="flex flex-col gap-4 h-full">
          {/* Code Editor */}
          <div className="border border-gray-700 rounded-lg flex-grow">
            <Editor
              code={code}
              language={language}
              onCodeChange={handleCodeChange}
            />
          </div>
          <textarea
            className="bg-gray-800 text-white px-4 py-2 w-72 h-96 rounded absolute right-4"
            placeholder="Enter Input"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
          />
          {/* Run Button */}
          <div className="flex justify-between items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option value="Assembly (NASM 2.14.02)">Assembly</option>
              <option value="Bash (5.0.0)">Bash</option>
              <option value="Basic (FBC 1.07.1)">Basic</option>
              <option value="C (GCC 9.2.0)">C</option>
              <option value="C++ (GCC 9.2.0)">C++</option>
            </select>

            <button
              onClick={runCode}
              className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Run Code
            </button>
          </div>

          {/* Output Section */}
          <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
            <h2 className="text-lg font-bold mb-2">Output:</h2>
            <pre className="whitespace-pre-wrap text-green-400">
              {output ?? 'No output yet. Write code and hit "Run Code".'}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
};
