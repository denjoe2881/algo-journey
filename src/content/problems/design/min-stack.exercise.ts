import { defineExercise } from '../../_loader';

export default defineExercise({
  id: 'min-stack',
  version: 1,
  title: 'Min Stack',
  summary: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
  topic: 'design',
  difficulty: 'medium',
  tags: ['stack', 'design', 'cse201'],
  estimatedMinutes: 25,
  order: 437,
  mode: 'class_implementation',
  hints: [
    'Use two Stacks.',
    'The primary `stack` holds the actual elements.',
    'The secondary `minStack` holds the minimum values corresponding to each state of the primary stack.',
    'When pushing a new element `x`, push `Math.min(x, current_min)` to the `minStack` so the top of `minStack` is ALWAYS the current minimum.'
  ],

  learningGoals: ['Combine multiple data structures', 'Maintain O(1) constraints for state retrieval'],
  statement: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
Implement the \`MinStack\` class:\n\n- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element val onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.`,
  constraints: [
    'Methods pop, top and getMin operations will always be called on non-empty stacks.',
  ],
  examples: [
    { 
      input: 'MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2', 
      output: '[null, null, null, null, -3, null, 0, -2]'
    },
  ],

  starter: {
    file: 'MinStack.java',
    code: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        return -1;
    }
    
    public int getMin() {
        return -1;
    }
}`,
  },

  requiredStructure: {
    className: 'MinStack',
    requiredMethods: [
      'MinStack()',
      'void push(int val)',
      'void pop()',
      'int top()',
      'int getMin()'
    ],
  },

  evaluation: { 
    comparator: 'exact_json',
    javaGenerator: {
      count: 20,
      seed: 848484,
      namePrefix: 'stress-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 20; i++) {
            int opsCount = (i < 5) ? 100 : 20000;
            MinStack obj = new MinStack();
            
            java.util.Stack<Integer> valStack = new java.util.Stack<>();
            java.util.Stack<Integer> minStack = new java.util.Stack<>();

            boolean pass = true;
            String firstMismatchAct = "\\"[OK-Test-" + i + "] Ops: \\" + opsCount";
            String firstMismatchExp = firstMismatchAct;

            for (int k = 0; k < opsCount; k++) {
                int opType = valStack.isEmpty() ? 0 : rng.nextInt(4);
                if (opType == 0) { // push
                    int val = rng.nextInt(1000) - 500;
                    obj.push(val);
                    valStack.push(val);
                    if (minStack.isEmpty() || val <= minStack.peek()) {
                        minStack.push(val);
                    }
                } else if (opType == 1) { // pop
                    obj.pop();
                    int popped = valStack.pop();
                    if (popped == minStack.peek()) minStack.pop();
                } else if (opType == 2) { // top
                    int actualTop = obj.top();
                    int expectedTop = valStack.peek();
                    if (actualTop != expectedTop) {
                        pass = false;
                        firstMismatchAct = "[top -> " + actualTop + "]";
                        firstMismatchExp = "[top -> " + expectedTop + "]";
                        break;
                    }
                } else { // getMin
                    int actualMin = obj.getMin();
                    int expectedMin = minStack.peek();
                    if (actualMin != expectedMin) {
                        pass = false;
                        firstMismatchAct = "[getMin -> " + actualMin + "]";
                        firstMismatchExp = "[getMin -> " + expectedMin + "]";
                        break;
                    }
                }
            }
            System.out.println("AJ|stress-" + i + "|" + pass + "|" + firstMismatchAct + "|" + firstMismatchExp);
        }`
    }
  }
});
