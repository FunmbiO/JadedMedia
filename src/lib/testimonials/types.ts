export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  clientType: string;
  published: boolean;
  sortOrder: number;
};

/** Raw shape of a testimonials row, snake_case as Postgres returns it. */
export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  client_type: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapTestimonialRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.quote,
    name: row.name,
    clientType: row.client_type,
    published: row.published,
    sortOrder: row.sort_order,
  };
}
