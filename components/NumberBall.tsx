'use client';
import { Box } from '@mui/material';
function colorOf(n:number){ if(n<=10) return '#fbc400'; if(n<=20) return '#ff7272'; if(n<=30) return '#69c8f2'; if(n<=40) return '#aaaaaa'; return '#b0d840'; }
export default function NumberBall({ n, size=32, mr=0.5 }:{ n:number; size?:number; mr?:number }){
  const bg = colorOf(n);
  return (<Box sx={{ width:size, height:size, borderRadius:'50%', display:'grid', placeItems:'center', bgcolor:bg, mr, userSelect:'none',
    boxShadow:`inset 0 6px 10px rgba(255,255,255,.35), inset 0 -8px 12px rgba(0,0,0,.18), 0 3px 8px rgba(0,0,0,.20)` }}>
    <Box component='span' sx={{ color:'#fff', fontWeight:800, lineHeight:1, fontSize:Math.round(size*0.46), textShadow:`0 0 4px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.65)` }}>{n}</Box>
  </Box>);
}
