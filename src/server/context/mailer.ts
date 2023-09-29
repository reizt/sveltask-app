type Fn<V> = (to: string, values: V) => Promise<void>;

export type IMailer = {
  sendCode: Fn<{ code: string }>;
};
