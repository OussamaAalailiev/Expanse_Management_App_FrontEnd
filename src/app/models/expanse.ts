import {CategoryExpanse} from "./CategoryExpanse";
import {User} from "./user";

export interface Expanse{

  id: number;
  amount: number;
  title: string;
  createdDate: any;
  categoryExpanse: CategoryExpanse;
  user: User;
}
