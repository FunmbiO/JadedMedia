export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  published: boolean;
  sortOrder: number;
};

/** Raw shape of a services row, snake_case as Postgres returns it. */
export type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapServiceRow(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    bullets: row.bullets,
    published: row.published,
    sortOrder: row.sort_order,
  };
}
