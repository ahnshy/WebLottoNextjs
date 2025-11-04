'use client';
import * as React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NumberBall from './NumberBall';
import type { LottoRow } from '@/app/actions';

export default function WinningsTable({ rows }:{ rows: LottoRow[] }){
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const ballSize = isXs ? 20 : 28;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>최근 회차부터 내림차순</Typography>
        <TableContainer>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{width:80}}>회차</TableCell>
                <TableCell sx={{width:120}}>추첨일</TableCell>
                <TableCell>당첨번호 + 보너스</TableCell>
                <TableCell sx={{width:110}}>1등 당첨자수</TableCell>
                <TableCell sx={{width:150}}>1등 당첨금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(r=>{
                const arr=[r.n1,r.n2,r.n3,r.n4,r.n5,r.n6];
                return (
                  <TableRow key={r.round} hover>
                    <TableCell>{r.round}회</TableCell>
                    <TableCell>{r.draw_date}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" sx={{ flexWrap:'nowrap', whiteSpace:'nowrap' }}>
                        {arr.map(n=><NumberBall key={n} n={n} size={ballSize} mr={0.5}/>)}
                        <Typography sx={{mx:1}}>+ </Typography>
                        <NumberBall n={r.bonus} size={ballSize} mr={0}/>
                      </Stack>
                    </TableCell>
                    <TableCell>{r.first_prize_winners ?? '-'}</TableCell>
                    <TableCell>{r.first_prize_amount ? r.first_prize_amount.toLocaleString() : '-'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
