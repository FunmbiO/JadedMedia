export type Faq = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  sortOrder: number;
};

/** Raw shape of a faqs row, snake_case as Postgres returns it. */
export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export function mapFaqRow(row: FaqRow): Faq {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    published: row.published,
    sortOrder: row.sort_order,
  };
}
