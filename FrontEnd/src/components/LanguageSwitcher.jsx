import { useState } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("English");
  const languages = ["English", "Hindi", "Assamese", "Bengali", "Bodo"];

  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="p-2 rounded border bg-white dark:bg-gray-800 dark:text-gray-100"
      >
        {languages.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
