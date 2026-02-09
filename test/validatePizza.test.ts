import { validatePizza } from '../src/validatePizza';

test('valid pizza passes', () => {
  const result = validatePizza({
    size: 16,
    crust: 'normal',
    toppings: ['pepperoni', 'mushrooms'],
  });

  expect(result.isPizza).toBe(true);
  if (result.isPizza) {
    expect(result.pizza.size).toBe(16);
  }
});

test('missing size fails', () => {
  const result = validatePizza({ crust: 'normal' });
  expect(result.isPizza).toBe(false);
  if (!result.isPizza) {
    expect(result.errors.length).toBeGreaterThan(0);
  }
});

test('banned topping fails', () => {
  const result = validatePizza({
    size: 12,
    crust: 'stuffed',
    toppings: ['ice cream'],
  });

  expect(result.isPizza).toBe(false);
});
