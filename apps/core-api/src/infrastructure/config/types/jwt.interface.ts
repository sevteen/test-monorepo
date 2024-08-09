export interface JWT {
  secret: string;
  time: number;
}

export interface JWTConfig {
  getJwtAccess(): Omit<JWT, 'secret'>;
  getJwtConfirmation(): Omit<JWT, 'privateKey' | 'publicKey'>;
  getJwtResetPassword(): Omit<JWT, 'privateKey' | 'publicKey'>;
  getJwtRefresh(): Omit<JWT, 'privateKey' | 'publicKey'>;
}
