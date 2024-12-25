import React from "react";
import MonacoEditor from "react-monaco-editor";

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange: (newCode: string) => void;
}

export const Editor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
}) => {
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  };

  return (
    <div className="w-full h-full">
      <MonacoEditor
        width="80%"
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        options={editorOptions}
        onChange={onCodeChange}
      />
    </div>
  );
};
