export interface UserPersonals {
  id?: number;
  name: string;
  surname: string;
  age: number;
  faculty: string;
  course: number;
  group: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id?: number;
  email: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Answer {
  id?: number;
  text: string;
  questionId?: number;
  userId?: number;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Question {
  id?: number;
  header: string;
  markers: string[];
  isVip: boolean;
  userId?: number;
  sectionId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Section {
  id?: number;
  name: string;
  discipline: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserLikes {
  id?: number;
  userId?: number;
  answerId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  is_liked: boolean;
}
