import { z } from 'zod';

const BANNED_TOPPINGS = ['chocolate', 'cereal', 'ice cream', 'toothpaste'];

export const PizzaSchema = z.object({
  size: z.number().positive(),
  crust: z.enum(['stuffed', 'normal'] as const),
  isDeepDish: z.boolean().optional().default(false),
  toppings: z
    .array(z.string())
    .optional()
    .default([])
    .refine(
      (tops) => tops.every((t) => !BANNED_TOPPINGS.includes(t.toLowerCase())),
      { message: 'contains a banned topping' },
    ),
});

export type Pizza = z.infer<typeof PizzaSchema>;

export type ValidatePizzaResult =
  | { isPizza: true; pizza: Pizza }
  | { isPizza: false; errors: string[] };

export function validatePizza(input: unknown): ValidatePizzaResult {
  const parsed = PizzaSchema.safeParse(input);

  if (!parsed.success) {
    return {
      isPizza: false,
      errors: parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`),
    };
  }

  return { isPizza: true, pizza: parsed.data };
}
