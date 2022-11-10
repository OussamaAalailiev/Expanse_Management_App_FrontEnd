import {UUID} from "angular2-uuid";

export interface TotalIncomesPerMonthDTO {

  year: string;
  month: string;
  totalIncomes: number;
  userId: UUID;
  userName: string;
  amountInterval: number;
  percentOfAmountInterval: number;

}
