'use client';
import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
export type AppMode = 'light'|'dark'|'night';
const nightPalette = { mode:'dark' as const, background:{ default:'#0e1220', paper:'#151b2f' }, text:{ primary:'#e6e9ff' } };
function themeOf(mode:AppMode){
  if(mode==='night') return createTheme({ palette: nightPalette, shape:{ borderRadius:12 } });
  return createTheme({ palette:{ mode, background:{ default: mode==='dark' ? '#0f0f10' : '#fafafa' } }, shape:{ borderRadius:12 } });
}
export default function ThemeRegistry({mode,children}:{mode:AppMode;children:React.ReactNode}){
  const theme = React.useMemo(()=>themeOf(mode),[mode]);
  return (<ThemeProvider theme={theme}><CssBaseline/>{children}</ThemeProvider>);
}
