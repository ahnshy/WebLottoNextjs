'use client';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import NumberBall from './NumberBall';
import type { LottoRow } from '@/app/actions';
function rankOf(m:number, bonus:boolean){ if(m===6) return '1등'; if(m===5 && bonus) return '2등'; if(m===5) return '3등'; if(m===4) return '4등'; if(m===3) return '5등'; return null; }
export default function CompareView({ pick, history, ballSize }:{ pick:number[]|null; history:LottoRow[]; ballSize:number }){
  if(!pick) return <Typography color="text.secondary">선택된 추첨번호가 없습니다.</Typography>;
  const results = history.map(h=>{ const win=[h.n1,h.n2,h.n3,h.n4,h.n5,h.n6]; const matches=pick.filter(n=>win.includes(n)); const hasBonus=pick.includes(h.bonus); const rank=rankOf(matches.length,hasBonus); return { round:h.round, win, bonus:h.bonus, matches, rank }; }).filter(x=>x.rank);
  const counts = results.reduce((acc:Record<string,number>,r:any)=>{ acc[r.rank!]=(acc[r.rank!]||0)+1; return acc; },{});
  return (<Stack spacing={2}>
    <Card variant="outlined"><CardContent><Typography variant="subtitle2">현재 선택 번호</Typography>
      <Stack direction="row" mt={1} sx={{ flexWrap:'nowrap', whiteSpace:'nowrap', overflowX:'auto' }}>{pick.map(n=><NumberBall key={n} n={n} size={ballSize} mr={0.5}/>)}</Stack>
    </CardContent></Card>
    <Card variant="outlined"><CardContent><Typography variant="subtitle2" gutterBottom>등수 집계</Typography><Typography>1등 {counts['1등']||0}회 · 2등 {counts['2등']||0}회 · 3등 {counts['3등']||0}회 · 4등 {counts['4등']||0}회 · 5등 {counts['5등']||0}회</Typography></CardContent></Card>
    <Divider/>
    <Stack spacing={1}>
      {results.slice(0,50).map((r:any)=>(<Card key={r.round} variant="outlined"><CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Typography fontWeight={700}>{r.round}회 {r.rank}</Typography>
          <Stack direction="row" alignItems="center" sx={{ flexWrap:'nowrap', whiteSpace:'nowrap', overflowX:'auto' }}>{r.win.map((n:number)=><NumberBall key={n} n={n} size={ballSize} mr={0.5}/>)}
            <Typography sx={{mx:0.75}}>+ </Typography><NumberBall n={r.bonus} size={ballSize} mr={0}/></Stack>
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>일치: {r.matches.join(', ') || '없음'}</Typography>
      </CardContent></Card>))}
    </Stack>
  </Stack>);
}
