declare type User = {
  _id: string;
  name: string;
  password: string;
  email: string;
  avatarURL: string;
  phone: string;
  skype: string;
  birthday: string;
  role: string;
  theme: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
};

declare type Task = {
  _id: string;
  title: string;
  start: string;
  end: string;
  priority: string;
  date: string;
  category: string;
  // owner: IAuthUser;
  createdAt: Date;
  updatedAt: Date;
};

declare type Review = {
  _id: string;
  content: string;
  rating: number;
  // owner: IAuthUser;
  createdAt: Date;
  updatedAt: Date;
};
