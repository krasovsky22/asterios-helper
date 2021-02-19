import Firebase from "firebase/app";

export type UserType = Firebase.User;
export type AuthUserType = UserType | null;

export type DatabaseContentType = {
  id: string;
  title: string;
  description: string;
  genre: string;
  maturity: number;
  slug: string;
};

export type NetflixContentType = DatabaseContentType & {
  docId: string;
};

export type NetflixProfileType = {
  displayName: string | null;
  photoURL: string | null;
};
