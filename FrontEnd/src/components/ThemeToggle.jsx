import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
