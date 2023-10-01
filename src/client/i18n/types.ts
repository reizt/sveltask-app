type Typify<T extends string> = T extends 'string' ? string : T extends 'number' ? number : T extends 'boolean' ? boolean : never;

type Values<T extends string> = T extends `${string}{${infer K}:${infer V}}${infer R}` ? { [key in K]: Typify<V> } & Values<R> : {};

export type InteropValues<T extends string> = T extends `${string}{${string}:${string}}${string}` ? Values<T> : never;

export type Lang = 'en' | 'ja';

export type Translation = {
  global: {
    save: string;
    saving: string;
    update: string;
    create: string;
    delete: string;
    deleting: string;
    logout: string;
    done: string;
  };
  login: {
    title: string;
    welcome_back: string;
    login: string;
    forgot_password: string;
    back_to_login: string;
    send_code: string;
    verify: {
      title: string;
      enter_code: string;
      six_digit_code: string;
      verify: string;
    };
  };
  password: {
    title: string;
    set_new_password: string;
    password: string;
    confirm_password: string;
  };
  board: {
    title: string;
    new_task: string;
    untitled: string;
    provide_description: string;
  };
  settings: {
    title: string;
    your_name: string;
  };
  entity: {
    user: {
      name: string;
      email: string;
      password: string;
    };
  };
  enum: {
    task_status: {
      created: string;
      progress: string;
      completed: string;
    };
  };
};
