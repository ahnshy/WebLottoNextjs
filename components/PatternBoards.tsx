'use client';
import * as React from 'react';
import { Card, CardContent, Grid, Typography, Box, Button, Stack } from '@mui/material';
import type { LottoRow } from '@/app/actions';

// map number 1..45 to 5 columns x 9 rows
function posOf(n:number){ const col = (n-1)%5; const row = Math.floor((n-1)/5); return { col, row }; }

function Board({ row }:{ row:LottoRow }){
  // roomy canvas to avoid clipping
  const W=236, H=276, padX=20, padY=26, cols=5, rows=9;
  const cellW=(W-2*padX)/(cols-1);
  const cellH=(H-2*padY)/(rows-1);
  const nums=[row.n1,row.n2,row.n3,row.n4,row.n5,row.n6];
  const pts = nums.map(n=>{const p=posOf(n); return [padX+p.col*cellW, padY+p.row*cellH];});

  return (
    <Box sx={{ borderRadius:1.5, p:1.5, bgcolor:'background.paper', boxShadow:(t)=>t.shadows[1] }}>
      <Typography variant="caption" sx={{ fontWeight:700 }}>{row.round}회</Typography>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:'block', overflow:'visible' }}>
        {/* grid numbers */}
        {Array.from({length:45},(_,i)=>{
          const n=i+1; const p=posOf(n);
          const x=padX+p.col*cellW, y=padY+p.row*cellH;
          return <g key={n}>
            <rect x={x-12} y={y-12} width="24" height="24" rx="4" ry="4" fill="none" stroke="rgba(255,255,255,.18)"/>
            <text x={x} y={y+5} textAnchor="middle" fontSize="12" fill="rgba(255,255,255,.6)">{n}</text>
          </g>;
        })}
        {/* path */}
        <polyline fill="none" stroke="#6bd6ff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={pts.map(p=>p.join(',')).join(' ')} />
        {/* balls on path in draw order */}
        {pts.map((p,i)=>(
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="11.5" fill="#69c8f2" />
            <text x={p[0]} y={p[1]+4} fontSize="12" textAnchor="middle" fill="#fff" fontWeight="800">{nums[i]}</text>
          </g>
        ))}
      </svg>
    </Box>
  );
}

export default function PatternBoards({ rows }:{ rows:LottoRow[] }){
  const [count, setCount] = React.useState(15);
  const view = rows.slice(0, count);
  const hasMore = count < rows.length;
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">최근 회차부터 내림차순 (로또 용지 경로 표시)</Typography>
          {hasMore && <Button size="small" onClick={()=>setCount(c=>Math.min(rows.length, c+15))}>더 보기</Button>}
        </Stack>
        <Grid container spacing={2} sx={{ mt:1 }}>
          {view.map(r=>(
            <Grid item xs={12} sm={6} md={4} key={r.round}>
              <Board row={r}/>
            </Grid>
          ))}
        </Grid>
        {!hasMore ? null : <Box sx={{ display:'flex', justifyContent:'center', mt:2 }}>
          <Button variant="outlined" onClick={()=>setCount(c=>Math.min(rows.length, c+15))}>더 보기</Button>
        </Box>}
      </CardContent>
    </Card>
  );
}
