export type User = {
  id: string;
  password: string;
  displayName: string;
  avatar?: string;
};

export type AppConfig = {
  autoConnect: boolean | true;
  appId: string;
  user?: User | null;
};
