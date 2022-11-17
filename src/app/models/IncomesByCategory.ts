import {UUID} from "angular2-uuid";

export interface IncomesByCategory {

  id: number;
  amount: number;
  createdDate: string;
  title: string;
  category_income_id: number;
  userId: UUID;
  totalIncomesByCategory: number;
  percentOfIncomesPerMonth: number;

}
