//Interface for req.user
declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}
//user model interface
declare interface UserInterface {
  username: string;
  email: string;
  password: string;
  loginWithGoogle: boolean;
}

//content model interface
declare interface ContentInterface {
  title: string;
  contentURL: string;
  desc: string;
  createdBy: string;
}
