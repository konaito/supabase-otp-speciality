# タスク管理

## 実装タスク
- [x] フォームのデザイン改善（shadcn/ui, Tailwind, Lucide Reactを利用）
- [x] ユーザー作成後の自動ログイン処理修正（APIでパスワード返却→フロントで即サインイン）
- [x] /loginでOTP（6桁コード）による認証を実装
- [x] profiles作成時のid指定バグ修正（createUser, createProfile, route.ts）

## テストタスク
- [ ] ユーザー作成後の自動ログイン動作テスト
- [ ] デザイン改善後のフォーム表示・動作テスト
- [ ] /login OTP認証（6桁コード）動作テスト
- [ ] profiles作成時にidが正しくセットされることのテスト