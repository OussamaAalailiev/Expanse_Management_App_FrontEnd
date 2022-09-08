
//TODO: This model 'UserLogin' is just replacing temporarily the real 'user.ts' Because of fetching and
//  checking user's credentials Locally instead of user the Backend:
export interface UserLogin{
  id: string;
  username: string;
  password: string;
  roles: string[];
}
