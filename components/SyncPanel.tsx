'use client';
import * as React from 'react';
import { Card, CardContent, Stack, Typography, Button, LinearProgress } from '@mui/material';
import { truncateLotto, upsertLottoBatch } from '@/app/actions';
export default function SyncPanel(){
  const [progress, setProgress] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [status, setStatus] = React.useState('대기중');
  const [latest, setLatest] = React.useState<number | null>(null);
  React.useEffect(()=>{ (async()=>{ const res = await fetch('/api/dhlotto/latest'); const js = await res.json(); setLatest(js.latest ?? null); })(); }, []);
  const sync = async ()=>{
    if(!latest || running) return;
    setRunning(true); setStatus('테이블 초기화중...'); setProgress(0);
    await truncateLotto();
    setStatus('동기화 시작...');
    const start = 1, end = latest, total = end - start + 1, chunk = 50;
    let cur = start, done = 0;
    while(cur <= end){
      const to = Math.min(end, cur + chunk - 1);
      setStatus(`${cur} ~ ${to} 회차 조회중...`);
      const res = await fetch(`/api/dhlotto/batch?start=${cur}&end=${to}`);
      const js = await res.json();
      if(js.rows?.length){ setStatus(`${cur} ~ ${to} 저장중 (${js.rows.length})`); await upsertLottoBatch(js.rows); }
      done += (to - cur + 1);
      setProgress(Math.round(100 * done / total));
      cur = to + 1;
    }
    setStatus('완료'); setRunning(false);
  };
  return (<Card variant="outlined"><CardContent><Stack spacing={2}>
    <Typography variant="subtitle2">동기화 (DHLottery API)</Typography>
    <Button variant="contained" onClick={sync} disabled={running||!latest}>동기화 시작</Button>
    <LinearProgress variant="determinate" value={progress} />
    <Typography variant="body2" color="text.secondary">{status} {latest?`· 최신 ${latest}회`:''}</Typography>
  </Stack></CardContent></Card>);
}
