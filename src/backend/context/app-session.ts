export type AppSession = Readonly<
  | {
      type: 'verify';
      email: string;
      codeHash: string;
    }
  | {
      type: 'login';
      userId: string;
    }
>;
