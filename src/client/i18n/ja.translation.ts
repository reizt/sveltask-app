import type { Translation } from './types';

export const jaTranslation = {
  global: {
    save: '保存する',
    saving: '保存中...',
    update: '更新する',
    create: '作成する',
    delete: '削除する',
    deleting: '削除中...',
    logout: 'ログアウト',
    done: '完了',
  },
  login: {
    title: 'ログイン',
    welcome_back: 'おかえりなさい！',
    login: 'ログイン',
    forgot_password: 'パスワードをお忘れですか？',
    back_to_login: 'ログインに戻る',
    send_code: 'コードを送信',
    verify: {
      title: 'ログイン',
      enter_code: 'コードを入力',
      six_digit_code: '6桁のコード',
      verify: '確認する',
    },
  },
  password: {
    title: '新しいパスワードを設定',
    set_new_password: '新しいパスワードを設定',
    password: 'パスワード',
    confirm_password: 'パスワードの確認',
  },
  board: {
    title: 'ダッシュボード',
    new_task: 'タスクを作成',
    untitled: '無題',
    provide_description: '説明を入力...',
  },
  settings: {
    title: '設定',
    your_name: '名前',
  },
  entity: {
    user: {
      name: '名前',
      email: 'メールアドレス',
      password: 'パスワード',
    },
  },
  enum: {
    task_status: {
      created: '作成済み',
      progress: '作業中',
      completed: '完了',
    },
  },
} as const satisfies Translation;
