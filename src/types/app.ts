export type User = {
  app: AppUser;
  email: string;
  password: string;
  displayName: string;
}

export type AppUser = {
  appId: string;
  token?: string;
}
