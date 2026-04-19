import java.util.ArrayList;
import java.util.List;

interface Shape {
    double area();
    double perimeter();
    String draw();
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double area() {
        return Math.PI * radius * radius;
    }

    public double perimeter() {
        return 2 * Math.PI * radius;
    }

    public String draw() {
        return "Circle";
    }
}

class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double area() {
        return width * height;
    }

    public double perimeter() {
        return 2 * (width + height);
    }

    public String draw() {
        return "Rectangle";
    }
}

class Triangle implements Shape {
    private double a;
    private double b;
    private double c;

    public Triangle(double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    public double area() {
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    public double perimeter() {
        return a + b + c;
    }

    public String draw() {
        return "Triangle";
    }
}

class DrawingBoard {
    private List<Shape> shapes;

    public DrawingBoard() {
        this.shapes = new ArrayList<>();
    }

    public void addShape(Shape shape) {
        shapes.add(shape);
    }

    public String showAllShapes() {
        List<String> names = new ArrayList<>();
        for (Shape s : shapes) {
            names.add(s.draw());
        }
        return "[" + String.join(", ", names) + "]";
    }

    public double totalArea() {
        double total = 0;
        for (Shape s : shapes) {
            total += s.area();
        }
        return total;
    }
}
