export type AppSession = Readonly<
  | {
      type: 'code';
      email: string;
      codeHash: string;
    }
  | {
      type: 'login';
      userId: string;
    }
>;
