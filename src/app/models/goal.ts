import {CategoryIncome} from "./CategoryIncome";
import {User} from "./user";

export interface Goal{
  id: number;
  title: string;
  description: string;
  dateDebut: any;
  endDate: any;
  amount: number;
  amountAchieved: number;
  goalAchieved: boolean;
  categoryIncome: CategoryIncome;
  user: User;
}
