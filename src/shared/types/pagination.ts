export interface PaginationMeta {
  page: number;
  totalPages: number | null;
  hasNext: boolean;
  hasPrevious: boolean;
}
