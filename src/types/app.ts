export type User = {
  id: string;
  password: string;
  displayName: string;
  app: AppUser;
  avatar?: string;
};

export type AppUser = {
  id: string;
};
