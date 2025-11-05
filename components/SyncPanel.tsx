'use client';
import * as React from 'react';
import { Card, CardContent, Stack, Typography, TextField, Button, LinearProgress, Box } from '@mui/material';

async function getLatest(): Promise<number> {
  const r = await fetch('/api/dhlotto/latest', { cache: 'no-store' });
  const j = await r.json();
  return j.latest ?? j.round ?? 0;
}

async function syncRange(start:number, end:number, onStep:(done:number,total:number)=>void) {
  const total = end - start + 1;
  let done = 0;
  const step = 50;
  for (let s = start; s <= end; s += step) {
    const e = Math.min(end, s + step - 1);
    const r = await fetch(`/api/dhlotto/batch?start=${s}&end=${e}`, { method:'GET' });
    if (!r.ok) throw new Error('batch failed');
    done += (e - s + 1);
    onStep(done, total);
  }
}

export default function SyncPanel(){
  const [start, setStart] = React.useState(1);
  const [end, setEnd]     = React.useState<number|null>(null);
  const [progress, setProgress] = React.useState(0);
  const [running, setRunning]   = React.useState(false);

  React.useEffect(()=>{ (async()=>{ const latest = await getLatest(); setEnd(latest); })(); },[]);

  const onRun = async ()=>{
    if (!end || end < start) return;
    setRunning(true); setProgress(0);
    try{
      await syncRange(start, end, (done, tot)=> setProgress(Math.round((done / tot) * 100)));
    } finally { setRunning(false); }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight:700, mb:1 }}>동기화 (DHLottery API)</Typography>
        <Stack direction={{ xs:'column', sm:'row' }} spacing={1} alignItems="center">
          <TextField size="small" label="시작 회차" type="number" value={start}
                     onChange={e=>setStart(parseInt(e.target.value||'1',10))} sx={{ width:120 }}/>
          <TextField size="small" label="마지막 회차" type="number" value={end ?? ''} disabled sx={{ width:120 }}/>
          <Button variant="contained" onClick={onRun} disabled={running || !end}>동기화 시작</Button>
        </Stack>
        <Box sx={{ mt:2 }}>
          <LinearProgress variant={running? 'determinate':'indeterminate'} value={progress}/>
          <Typography variant="caption" sx={{ mt:.5, display:'block' }}>
            {running && end ? `${progress}%  (1회차 → ${end}회차)` : (end ? `대기중 (최신 ${end}회차)` : '최신 회차 확인중...')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
