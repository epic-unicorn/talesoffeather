import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const themes = [
  { name: "Light" },
  { name: "Dark" },
  { name: "Emerald" },
  { name: "Pink" },
];

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="p-8 flex justify-between items-center font-bold text-xl text-th-primary-dark">
      <div>
        <select
          name="theme"
          id="theme-select"
          className="bg-white text-gray-800 border-gray-800 border py-1 px-3 text-sm"
          onChange={(e) => setTheme(e.currentTarget.value)}
          value={theme}
        >
          {themes.map((t) => (
            <option key={t.name.toLowerCase()} value={t.name.toLowerCase()}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeChanger;
