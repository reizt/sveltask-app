import type { Translation } from './types';

export const enTranslation = {
  global: {
    save: 'Save',
    saving: 'Saving...',
    update: 'Update',
    create: 'Create',
    delete: 'Delete',
    deleting: 'Deleting...',
    logout: 'Logout',
    done: 'Done',
  },
  login: {
    title: 'Log In',
    welcome_back: 'Welcome Back!',
    login: 'Log in',
    forgot_password: 'Forgot Password?',
    back_to_login: 'Back to Log In',
    send_code: 'Send Code',
    verify: {
      title: 'Log In',
      enter_code: 'Enter Code',
      six_digit_code: '6-digit code',
      verify: 'Verify',
    },
  },
  password: {
    title: 'Set New Password',
    set_new_password: 'Set New Password',
    password: 'Password',
    confirm_password: 'Confirm Password',
  },
  board: {
    title: 'Board',
    new_task: 'New Task',
    untitled: 'Untitled',
    provide_description: 'Provide description...',
  },
  settings: {
    title: 'Settings',
    your_name: 'Your Name',
  },
  entity: {
    user: {
      name: 'Name',
      email: 'Email',
      password: 'Password',
    },
  },
  enum: {
    task_status: {
      created: 'Created',
      progress: 'In Progress',
      completed: 'Completed',
    },
  },
} as const satisfies Translation;
