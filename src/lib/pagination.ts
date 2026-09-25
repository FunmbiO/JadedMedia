export const ADMIN_PAGE_SIZE = 20;

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

/** Clamps a raw `?page=` query value to a real page number (defaults to 1). */
export function parsePageParam(raw: string | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page > 0 ? page : 1;
}
