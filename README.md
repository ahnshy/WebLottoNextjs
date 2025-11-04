# WebLotto + Collapsible Sidebar + Sync
- 좌측 상단 로고/파비콘 추가(`public/logo.svg`, `favicon.ico`)
- 사이드바 접기/펼치기(아이콘만 표시되는 미니 너비)
- 메뉴: 분석(당첨번호보기/패턴분석), 추출(예상번호 추출), **동기화**
- 동기화: DHLottery API에서 1회~최근 회차 가져와 Supabase `kr_lotto_results`를 **초기화 후 동기화**
- Night 기본 테마, 번호공 색상/그림자

## 시작
```bash
npm i
cp .env.local.example .env.local   # Supabase URL/ANON KEY 입력
# Supabase SQL Editor에서 README_SQL.sql 실행
npm run dev
```
