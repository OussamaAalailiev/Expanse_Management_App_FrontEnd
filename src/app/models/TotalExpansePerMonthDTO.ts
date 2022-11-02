import {UUID} from "angular2-uuid";

export interface TotalExpansePerMonthDTO {

  year: string;
  month: string;
  totalExpanses: number;
  userId: UUID;
  userName: string;
  amountInterval: number;
  percentOfAmountInterval: number;

}
