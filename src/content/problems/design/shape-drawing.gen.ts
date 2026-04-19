import { defineTests } from '../../_test-utils';

export default defineTests('shape-drawing', (t) => {
  t.visible('basic-shapes', {
    operations: [
      ['DrawingBoard'],
      ['addShape', 'new Rectangle(2, 3)'],
      ['addShape', 'new Circle(5)'],
      ['showAllShapes'],
      ['totalArea'],
    ],
    expected: [null, null, null, '[Rectangle, Circle]', 84.53981633974483],
  });

  t.visible('triangle-rectangle', {
    operations: [
      ['DrawingBoard'],
      ['addShape', 'new Triangle(3, 4, 5)'],
      ['addShape', 'new Rectangle(10, 10)'],
      ['showAllShapes'],
      ['totalArea'],
    ],
    expected: [null, null, null, '[Triangle, Rectangle]', 106.0],
  });

  t.hidden('empty-board', {
    operations: [
      ['DrawingBoard'],
      ['showAllShapes'],
      ['totalArea'],
    ],
    expected: [null, '[]', 0.0],
  });

  t.hidden('multiple-shapes', {
    operations: [
      ['DrawingBoard'],
      ['addShape', 'new Circle(10)'],
      ['totalArea'],
      ['addShape', 'new Triangle(6, 8, 10)'],
      ['addShape', 'new Rectangle(5, 5)'],
      ['showAllShapes'],
      ['totalArea'],
    ],
    expected: [null, null, 314.1592653589793, null, null, '[Circle, Triangle, Rectangle]', 363.1592653589793],
  });
});
