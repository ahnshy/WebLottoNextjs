'use client';
import * as React from 'react';
import {
    Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Collapse, Divider, useMediaQuery, IconButton, Tooltip, Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NumbersIcon from '@mui/icons-material/Numbers';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SyncIcon from '@mui/icons-material/Sync';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Image from 'next/image';
import { useNav } from './NavContext';

export const SIDEBAR_FULL = 280;
export const SIDEBAR_MINI = 80;

/** '동기화' 클릭 시 라우팅 없이 NavContext.section 만 바꾸도록 수정 */
export default function Sidebar({
                                    open, onClose, collapsed, setCollapsed
                                }:{ open:boolean; onClose:()=>void; collapsed:boolean; setCollapsed:(v:boolean)=>void }){

    const { section, setSection } = useNav();
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    const [open1, setOpen1] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);

    const width = collapsed ? SIDEBAR_MINI : SIDEBAR_FULL;
    const ItemText = ({primary}:{primary:string}) => collapsed ? null : <ListItemText primary={primary} />;

    const content = (
        <Box role="presentation" sx={{ width, p: 1, display:'flex', flexDirection:'column', height:'100%' }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:1, px:1, py:1, height:56 }}>
                <Image src="/favicon-32.png" alt="WebLotto" width={28} height={28} />
                {!collapsed && <Typography fontWeight={800}>WebLotto</Typography>}
                <Box sx={{ flex:1 }} />
                {isMdUp && (
                    <Tooltip title={collapsed ? '사이드바 펼치기' : '사이드바 접기'} arrow>
                        <IconButton size="small" onClick={()=>setCollapsed(!collapsed)}>
                            {collapsed ? <KeyboardDoubleArrowRightIcon/> : <KeyboardDoubleArrowLeftIcon/>}
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            <Divider />

            <List subheader={null} sx={{ pt: 0, flex:1 }}>
                {/* 분석 */}
                <ListItemButton onClick={()=>setOpen1(!open1)}>
                    <ListItemIcon><InsightsIcon/></ListItemIcon>
                    <ItemText primary="분석" />
                    {collapsed ? null : (open1 ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={open1 || collapsed} timeout="auto" unmountOnExit={!collapsed}>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={section==='당첨번호보기'}
                            sx={{ pl: collapsed ? 2 : 7 }}
                            onClick={()=>{ setSection('당첨번호보기'); if(!isMdUp) onClose(); }}>
                            <ListItemIcon><NumbersIcon/></ListItemIcon>
                            <ItemText primary="당첨번호보기" />
                        </ListItemButton>

                        <ListItemButton
                            selected={section==='당첨 패턴 분석'}
                            sx={{ pl: collapsed ? 2 : 7 }}
                            onClick={()=>{ setSection('당첨 패턴 분석'); if(!isMdUp) onClose(); }}>
                            <ListItemIcon><ScatterPlotIcon/></ListItemIcon>
                            <ItemText primary="당첨 패턴 분석" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <Divider sx={{ my: 1 }} />

                {/* 추출 */}
                <ListItemButton onClick={()=>setOpen2(!open2)}>
                    <ListItemIcon><AutoAwesomeIcon/></ListItemIcon>
                    <ItemText primary="추출" />
                    {collapsed ? null : (open2 ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={open2 || collapsed} timeout="auto" unmountOnExit={!collapsed}>
                    <List component="div" disablePadding>
                        <ListItemButton
                            selected={section==='예상번호 추출'}
                            sx={{ pl: collapsed ? 2 : 7 }}
                            onClick={()=>{ setSection('예상번호 추출'); if(!isMdUp) onClose(); }}>
                            <ListItemIcon><AutoAwesomeIcon/></ListItemIcon>
                            <ItemText primary="예상번호 추출" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <Divider sx={{ my: 1 }} />

                {/* 동기화 – 라우팅 금지, NavContext만 변경 */}
                <ListItemButton
                    selected={section==='동기화'}
                    onClick={()=>{ setSection('동기화'); if(!isMdUp) onClose(); }}>
                    <ListItemIcon><SyncIcon/></ListItemIcon>
                    <ItemText primary="동기화" />
                </ListItemButton>
            </List>
        </Box>
    );

    return isMdUp ? (
        <Drawer variant="permanent" open
                sx={{ '& .MuiDrawer-paper': { position: 'relative', width, transition:'width .2s', boxSizing:'border-box' } }}>
            {content}
        </Drawer>
    ) : (
        <Drawer variant="temporary" open={open} onClose={onClose} ModalProps={{ keepMounted: true }}
                sx={{ '& .MuiDrawer-paper': { width, boxSizing:'border-box' } }}>
            {content}
        </Drawer>
    );
}
