import {CategoryExpanse} from "./CategoryExpanse";
import {User} from "./user";

export interface Budget{
  id: number;
  title: string;
  description: string;
  dateDebut: any;
  endDate: any;
  amount: number;
  amountSpent: number;
  amountRemains: number;
  categoryExpanse: CategoryExpanse;
  user: User;
}
