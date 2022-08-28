export interface User{

  id: string;
  name: string;
  totalSold?: number;//? after property means: optional it could be set a value or an undefined.
  active?: boolean;
  email?: string;
  currency?: string;
  dateCreation?: any;

}
