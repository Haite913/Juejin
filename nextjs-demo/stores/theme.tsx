import React, { useState, useEffect, createContext } from 'react';
import { Themes } from '@/constants/enum';

interface IThemeContextProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

interface IProps {
  children: JSX.Element;
}
//创建主题上下文
export const ThemeContext = createContext<IThemeContextProps>({} as IThemeContextProps);

export const ThemeContextProvider = ({ children }: IProps): JSX.Element => {
  const [theme, setTheme] = useState<Themes>(Themes.light);

  // 监听本地缓存来同步不同页面间的主题
  useEffect(() => {
    const checkTheme = (): void => {
      //从localStorage 中 获得主题 如果没有则设置Themes.light
      const item = (localStorage.getItem('theme') as Themes) || Themes.light;
      setTheme(item);
      //这是什么意思
      document.getElementsByTagName('html')[0].dataset.theme = item;
    };
    checkTheme();
    //如果内部存储发生变化 则 checkTheme
    window.addEventListener('storage', checkTheme);
    return (): void => {
      window.removeEventListener('storage', checkTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (currentTheme): void => {
          setTheme(currentTheme);
          localStorage.setItem('theme', currentTheme);
          document.getElementsByTagName('html')[0].dataset.theme = currentTheme;
        },
      }}
    >
      {/* 传入子节点 */}
      {children}
    </ThemeContext.Provider>
  );
};
