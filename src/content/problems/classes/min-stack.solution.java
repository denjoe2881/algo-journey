import java.util.Stack;

class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();

    MinStack() {}

    void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
    }

    void pop() {
        if (stack.peek().equals(minStack.peek())) minStack.pop();
        stack.pop();
    }

    int top() { return stack.peek(); }
    int getMin() { return minStack.peek(); }
}
