import {UUID} from "angular2-uuid";

export interface ExpensesByCategory{
  id: number;
  amount: number;
  createdDate: string;
  title: string;
  category_expanse_id: number;
  userId: UUID;
  sumExpensesByCategory: number;
  percentOfExpensesPerMonth: number;
}
