export type AppSession = Readonly<
  | {
      type: 'verify';
      email: string;
      code: string;
    }
  | {
      type: 'login';
      userId: string;
    }
>;
