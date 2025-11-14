'use client';
import * as React from 'react';
import { ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Mode = 'light'|'night'|'dark';
export interface ThemeSwitchProps {
  value: Mode;
  onChange: (m: Mode)=>void;
}

/** Hydration-safe theme switch: render nothing until mounted */
export default function ThemeSwitch({ value, onChange }: ThemeSwitchProps){
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(()=> setMounted(true), []);
  if (!mounted) return null; // avoid SSR/CSR mismatch

  const handle = (_:any, v:Mode|null)=> v && onChange(v);
  return (
    <ToggleButtonGroup exclusive value={value} onChange={handle} size="small">
      <Tooltip title="Light"><ToggleButton value="light" aria-label="light"><LightModeIcon fontSize="small"/></ToggleButton></Tooltip>
      <Tooltip title="Night"><ToggleButton value="night" aria-label="night"><NightlightIcon fontSize="small"/></ToggleButton></Tooltip>
      <Tooltip title="Dark"><ToggleButton value="dark" aria-label="dark"><DarkModeIcon fontSize="small"/></ToggleButton></Tooltip>
    </ToggleButtonGroup>
  );
}
