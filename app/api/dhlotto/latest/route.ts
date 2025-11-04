import { NextResponse } from 'next/server';
async function get(r:number){
  const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${r}`;
  const res = await fetch(url, { cache:'no-store' });
  if(!res.ok) return null;
  const js = await res.json();
  if(js.returnValue !== 'success') return null;
  return js;
}
export async function GET(){
  let lo = 1, hi = 1;
  let ok = await get(hi);
  while(ok){ lo = hi; hi *= 2; ok = await get(hi); }
  while(lo + 1 < hi){
    const mid = Math.floor((lo+hi)/2);
    const res = await get(mid);
    if(res) lo = mid; else hi = mid;
  }
  return NextResponse.json({ latest: lo });
}
