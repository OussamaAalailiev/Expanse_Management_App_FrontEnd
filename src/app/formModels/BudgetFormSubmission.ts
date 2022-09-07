export interface BudgetFormSubmission{
  amount: number;
  title: string;
  description: string;
  dateDebut: Date;
  endDebut: Date;
  categoryExpanseId: number;
  userId: string;
}
