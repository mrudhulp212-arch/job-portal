import React from 'react';
import { useTheme } from 'next-themes';

const useThemeStyle = () => {
  const { theme, resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = React.useState(resolvedTheme);

  React.useEffect(() => {
    setCurrentTheme(theme === "system" ? resolvedTheme : theme);
  }, [theme, resolvedTheme, currentTheme]);

  const themeStyle = currentTheme === "dark" 
    ? "!bg-gray-800 !text-white !border-gray-500" 
    : "!bg-white text-black !border-gray-500";

  return themeStyle;
};

export default useThemeStyle;
