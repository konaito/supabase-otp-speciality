-- プロフィールテーブルの作成
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  employee_number text not null unique,
  email text not null unique,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- RLS（Row Level Security）の有効化
alter table public.profiles enable row level security;

-- 自分のプロフィールだけを読み取れるポリシー
create policy "Users can view their own profile" on public.profiles
  for select
  using (auth.uid() = id);

-- 自分のプロフィールだけを更新できるポリシー
create policy "Users can update their own profile" on public.profiles
  for update
  using (auth.uid() = id);

-- 管理者用に全件閲覧や更新も許可するなら別途設定が必要です
