/* eslint-disable @typescript-eslint/no-require-imports */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";

// Charger QuillEditor dynamiquement côté client
const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
  value: string;
  Editorstyle: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, Editorstyle, onChange }) => {
  const [modules, setModules] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Quill = require("react-quill-new").Quill;
      const QuillResizeImage = require("quill-resize-image");

      // Enregistrer le module de redimensionnement uniquement côté client
      Quill.register("modules/resize", QuillResizeImage);

      setModules({
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
          [{ font: [] }], // Font family dropdown
          [{ size: ["small", false, "large", "huge"] }], // Font size dropdown
          ["bold", "italic", "underline", "strike"], // Toggle buttons
          [{ color: [] }, { background: [] }], // Color and background
          [{ script: "sub" }, { script: "super" }], // Subscript, superscript
          ["blockquote", "code-block"], // Blockquote, code block
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Lists
          [{ indent: "-1" }, { indent: "+1" }], // Indent
          [{ direction: "rtl" }], // Text direction
          [{ align: [] }], // Alignment
          ["link", "image"], // Link, image
          ["clean"], // Clear formatting
        ],
        resize: {
          locale: {},
        },
      });
    }
  }, []);

  // Si les modules ne sont pas encore configurés, ne rien rendre
  if (!modules.toolbar) {
    return null;
  }

  return (
    <QuillEditor
      modules={modules}
      className={Editorstyle}
      theme="snow"
      value={value}
      onChange={(content: string) => onChange(content)}
    />
  );
};

export default Editor;
