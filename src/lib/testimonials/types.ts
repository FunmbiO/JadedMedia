export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  clientType: string;
  photoUrl: string | null;
  published: boolean;
  sortOrder: number;
};

/** Raw shape of a testimonials row, snake_case as Postgres returns it. */
export type TestimonialRow = {
  id: string;
  quote: string;
  name: string;
  client_type: string;
  photo_url: string | null;
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
    photoUrl: row.photo_url,
    published: row.published,
    sortOrder: row.sort_order,
  };
}
