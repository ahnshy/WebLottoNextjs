'use client';
import * as React from 'react';
import { Card, CardContent, Grid, LinearProgress, Stack, Typography, Box } from '@mui/material';
import NumberBall from './NumberBall';
import type { LottoRow } from '@/app/actions';
function freq(history:LottoRow[]){ const f = Array(46).fill(0); history.forEach(h=>[h.n1,h.n2,h.n3,h.n4,h.n5,h.n6,h.bonus].forEach(n=>{ f[n]++; })); return f; }
export default function PatternAnalysis({ history }:{ history:LottoRow[] }){
  const f = freq(history); const max = Math.max(...f.slice(1));
  return (<Stack spacing={2}><Card variant="outlined"><CardContent>
    <Typography variant="subtitle2" gutterBottom>번호별 출현 빈도(보너스 포함)</Typography>
    <Grid container spacing={1}>{Array.from({length:45},(_,i)=>i+1).map(n=>(
      <Grid item xs={12} sm={6} md={4} key={n}><Stack direction="row" alignItems="center" spacing={1}>
        <NumberBall n={n} size={28} mr={0.5}/><Box sx={{ flex:1 }}><LinearProgress variant="determinate" value={100*f[n]/max} /></Box>
        <Typography sx={{ width:36, textAlign:'right' }}>{f[n]}</Typography>
      </Stack></Grid>))}
    </Grid>
  </CardContent></Card></Stack>);
}
