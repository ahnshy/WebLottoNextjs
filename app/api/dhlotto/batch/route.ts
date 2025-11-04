import { NextRequest, NextResponse } from 'next/server';
export const revalidate = 0;
async function getRound(r:number){
  const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${r}`;
  const res = await fetch(url, { cache:'no-store' });
  if(!res.ok) return null;
  const js = await res.json();
  if(js.returnValue !== 'success') return null;
  return {
    round: js.drwNo,
    draw_date: js.drwNoDate,
    n1: js.drwtNo1, n2: js.drwtNo2, n3: js.drwtNo3,
    n4: js.drwtNo4, n5: js.drwtNo5, n6: js.drwtNo6,
    bonus: js.bnusNo,
    first_prize_winners: js.firstWinamnt ? js.firstPrzwnerCo ?? null : null,
    first_prize_amount: js.firstWinamnt ? Number(js.firstWinamnt) : null,
  };
}
export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url);
  const s = parseInt(searchParams.get('start')||'1');
  const e = parseInt(searchParams.get('end')||String(s));
  const rows:any[] = [];
  for(let r=s; r<=e; r++){
    try{ const one = await getRound(r); if(one) rows.push(one); }catch{}
    await new Promise(res=>setTimeout(res, 60));
  }
  return NextResponse.json({ rows, start:s, end:e });
}
