export type User = {
  id: string;
  password: string;
  displayName: string;
  app: AppUser;
};

export type AppUser = {
  id: string;
};
