-- Draws table
create table if not exists draws (
  id uuid primary key default gen_random_uuid(),
  numbers int[] not null check (array_length(numbers,1)=6),
  created_at timestamptz not null default now()
);
alter table draws enable row level security;
create policy "draws_read" on draws for select using (true);
create policy "draws_insert" on draws for insert with check (true);

-- Lotto history table
create table if not exists kr_lotto_results (
  round int primary key,
  draw_date date not null,
  n1 int not null, n2 int not null, n3 int not null,
  n4 int not null, n5 int not null, n6 int not null,
  bonus int not null
);
alter table kr_lotto_results enable row level security;
create policy "lotto_read" on kr_lotto_results for select using (true);



-- 필수 확장 (gen_random_uuid 사용)
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- 1) 추출 목록 저장 테이블
create table if not exists public.draws (
id uuid primary key default gen_random_uuid(),
numbers int[] not null check (array_length(numbers,1)=6),
created_at timestamptz not null default now()
);

-- 2) 회차별 당첨 결과 테이블
create table if not exists public.kr_lotto_results (
round int primary key,
draw_date date not null,
n1 int not null, n2 int not null, n3 int not null,
n4 int not null, n5 int not null, n6 int not null,
bonus int not null
);

-- 인덱스
create index if not exists idx_draws_created_at on public.draws(created_at desc);
create index if not exists idx_lotto_results_round on public.kr_lotto_results(round);

-- RLS (익명 읽기/삽입 허용: 필요시 나중에 강화)
alter table public.draws enable row level security;
create policy "draws_read"   on public.draws for select using (true);
create policy "draws_insert" on public.draws for insert with check (true);

alter table public.kr_lotto_results enable row level security;
create policy "lotto_read" on public.kr_lotto_results for select using (true);

-- (선택) 스키마 캐시 즉시 리로드
notify pgrst, 'reload schema';


-- draws 삭제 허용 (익명/공용 프로젝트라면 임시로 허용, 운영 시 사용자별 조건으로 강화 권장)
create policy "draws_delete" on public.draws for delete using (true);
