export const enTranslation = {
  global: {
    save: 'Save',
    saving: 'Saving...',
    update: 'Update',
    create: 'Create',
    delete: 'Delete',
    deleting: 'Deleting...',
    logout: 'Logout',
  },
  pages: {
    login: {
      title: 'Log In',
      welcome_back: 'Welcome Back!',
      send_code: 'Send Code',
    },
    verify: {
      title: 'Log In',
      enter_code: 'Enter Code',
      six_digit_code: '6-digit code',
      verify: 'Verify',
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
} as const;
