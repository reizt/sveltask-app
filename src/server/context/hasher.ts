export interface IHasher {
  hash: (plaintext: string) => Promise<string>;
  compare: (plaintext: string, hash: string) => Promise<boolean>;
}
