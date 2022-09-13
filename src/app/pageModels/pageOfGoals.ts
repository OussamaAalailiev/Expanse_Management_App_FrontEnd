import {Expanse} from "../models/expanse";
import {Goal} from "../models/goal";

/**This interface represent a Model or Skeleton of the Page returned from Backend: */
export interface PageOfGoals{
  content: Goal[],
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: boolean
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    unpaged: boolean,
    paged: boolean
  },
  last: boolean,
  totalElements: number,
  totalPages: number,
  size: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  first: boolean,
  numberOfElements: number,
  number: number,
  empty: boolean
}
