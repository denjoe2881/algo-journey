import { defineTests } from '../../_test-utils';

export default defineTests('coffee-decorator', (t) => {
  t.visible('basic-orders', {
    operations: [
      ['CoffeeShop'],
      ['order', ['Milk', 'Sugar']],
      ['order', []],
      ['order', ['Chocolate', 'Milk']],
    ],
    expected: [
      null,
      'Basic Coffee, Milk, Sugar | Cost: $2.70',
      'Basic Coffee | Cost: $2.00',
      'Basic Coffee, Chocolate, Milk | Cost: $3.50',
    ],
  });

  t.visible('complex-order', {
    operations: [
      ['CoffeeShop'],
      ['order', ['Cream', 'Cream', 'Sugar']],
      ['order', ['Chocolate', 'Chocolate', 'Milk', 'Milk']],
    ],
    expected: [
      null,
      'Basic Coffee, Cream, Cream, Sugar | Cost: $3.60',
      'Basic Coffee, Chocolate, Chocolate, Milk, Milk | Cost: $5.00',
    ],
  });

  t.hidden('invalid-topping-ignored', {
    operations: [
      ['CoffeeShop'],
      ['order', ['Milk', 'Vanilla', 'Sugar']],
    ],
    expected: [null, 'Basic Coffee, Milk, Sugar | Cost: $2.70'],
  });
});
