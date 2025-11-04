'use client';
import * as React from 'react';
import { AppBar, Box, Container, Toolbar, Typography, ToggleButtonGroup, ToggleButton, Tooltip, IconButton, useMediaQuery, Button } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '@/app/theme/ThemeProviderRoot';
import Sidebar from './Sidebar';
import SidebarEdgeToggle from './SidebarEdgeToggle';
import { useNav } from './NavContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { mode, setMode } = useThemeMode();
  const handleChange = (_:any, val:'light'|'dark'|'night'|null)=>{ if(val) setMode(val); };
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const { section, setSection } = useNav();

  return (
    <Box sx={{ minHeight:'100vh', display:'flex' }}>
      <Sidebar open={open} onClose={()=>setOpen(false)} collapsed={collapsed} setCollapsed={setCollapsed}/>
      <SidebarEdgeToggle collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Box sx={{ flex:1, display:'flex', flexDirection:'column' }}>
        <AppBar position="sticky">
          <Toolbar sx={{ gap: 1 }}>
            {!isMdUp && (<IconButton color="inherit" onClick={()=>setOpen(true)} aria-label="open drawer"><MenuIcon/></IconButton>)}
            <Typography variant="h6" sx={{ flex:1 }}>WebLotto</Typography>
            {/* Mode toggle */}
            <ToggleButtonGroup value={mode} exclusive size="small" onChange={handleChange}
              sx={{ bgcolor:'rgba(255,255,255,0.06)', borderRadius:1.5, '& .MuiToggleButton-root':{ color:'inherit', borderColor:'rgba(255,255,255,0.2)' }}}>
              <Tooltip title="Light"><ToggleButton value="light" aria-label="light-mode"><WbSunnyIcon fontSize="small"/></ToggleButton></Tooltip>
              <Tooltip title="Dark"><ToggleButton value="dark" aria-label="dark-mode"><DarkModeIcon fontSize="small"/></ToggleButton></Tooltip>
              <Tooltip title="Night"><ToggleButton value="night" aria-label="night-mode"><NightlightRoundIcon fontSize="small"/></ToggleButton></Tooltip>
            </ToggleButtonGroup>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ py:2, flex:1 }}>{children}</Container>
      </Box>
    </Box>
  );
}
