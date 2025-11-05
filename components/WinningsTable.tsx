'use client';
import * as React from 'react';
import {
  Card, CardContent, Stack, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Tooltip
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { styled } from '@mui/material/styles';
import NumberBall from './NumberBall';
import type { LottoRow } from '@/app/actions';

const NoWrapCell = styled(TableCell)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 120
});

export default function WinningsTable({ rows }: { rows: LottoRow[] }){
  const [desc, setDesc] = React.useState(true);

  const list = React.useMemo(()=>{
    const c = [...rows];
    c.sort((a,b)=> desc ? b.round - a.round : a.round - b.round);
    return c;
  }, [rows, desc]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>최근 회차부터 내림차순</Typography>
          <Tooltip title={desc ? '오름차순으로 보기' : '내림차순으로 보기'}>
            <IconButton onClick={()=>setDesc(v=>!v)} size="small"><SwapVertIcon/></IconButton>
          </Tooltip>
        </Stack>
        <TableContainer sx={{ mt: 1 }}>
          <Table size="small" stickyHeader aria-label="winning numbers table">
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-root': { fontSize:{ xs:12, sm:13 } } }}>
                <NoWrapCell sx={{ width: 90 }}>회차</NoWrapCell>
                <NoWrapCell sx={{ width: 110 }}>추첨일</NoWrapCell>
                <TableCell sx={{ whiteSpace:'nowrap' }}>당첨번호 + 보너스</TableCell>
                <NoWrapCell sx={{ width: 90, textAlign:'center', display:{ xs:'none', sm:'table-cell' } }}>1등 당첨자수</NoWrapCell>
                <NoWrapCell sx={{ width: 120, textAlign:'right', display:{ xs:'none', sm:'table-cell' } }}>1등 당첨금액</NoWrapCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((r)=>(
                <TableRow key={r.round} hover>
                  <NoWrapCell>{r.round}회</NoWrapCell>
                  <NoWrapCell>{r.draw_date}</NoWrapCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap:'nowrap' }}>
                      {[r.n1,r.n2,r.n3,r.n4,r.n5,r.n6].map(n=>(<NumberBall key={n} n={n} size={24}/>))}
                      <Typography sx={{ mx:.5, opacity:.7 }}> + </Typography>
                      <NumberBall n={r.bonus} size={24}/>
                    </Stack>
                  </TableCell>
                  <NoWrapCell sx={{ textAlign:'center', display:{ xs:'none', sm:'table-cell' } }}>{r.first_prize_winners ?? '-'}</NoWrapCell>
                  <NoWrapCell sx={{ textAlign:'right', display:{ xs:'none', sm:'table-cell' } }}>{r.first_prize_amount ?? '-'}</NoWrapCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
