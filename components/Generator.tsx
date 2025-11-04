'use client';
import { Button, Stack } from '@mui/material';
function generate(): number[]{const s=new Set<number>(); while(s.size<6) s.add(1+Math.floor(Math.random()*45)); return Array.from(s).sort((a,b)=>a-b);}
export default function Generator({onNew}:{onNew:(nums:number[])=>void}){ return (<Stack direction='row'><Button variant='contained' onClick={()=>onNew(generate())}>번호 추출</Button></Stack>); }
