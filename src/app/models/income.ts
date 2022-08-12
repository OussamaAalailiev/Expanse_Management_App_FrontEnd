import {CategoryIncome} from "./CategoryIncome";
import {User} from "./user";

export interface Income{

  id: number;
  amount: number;
  title: string;
  createdDate: any;
  categoryIncome: CategoryIncome;
  user: User;

}
