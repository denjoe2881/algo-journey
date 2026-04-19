interface Coffee {
    String getDescription();
    double getCost();
}

class BasicCoffee implements Coffee {
    public String getDescription() {
        return "Basic Coffee";
    }
    public double getCost() {
        return 2.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee wrappedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.wrappedCoffee = coffee;
    }

    public String getDescription() {
        return wrappedCoffee.getDescription();
    }

    public double getCost() {
        return wrappedCoffee.getCost();
    }
}

class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    public String getDescription() {
        return super.getDescription() + ", Milk";
    }
    public double getCost() {
        return super.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    public String getDescription() {
        return super.getDescription() + ", Sugar";
    }
    public double getCost() {
        return super.getCost() + 0.2;
    }
}

class CreamDecorator extends CoffeeDecorator {
    public CreamDecorator(Coffee coffee) {
        super(coffee);
    }
    public String getDescription() {
        return super.getDescription() + ", Cream";
    }
    public double getCost() {
        return super.getCost() + 0.7;
    }
}

class ChocolateDecorator extends CoffeeDecorator {
    public ChocolateDecorator(Coffee coffee) {
        super(coffee);
    }
    public String getDescription() {
        return super.getDescription() + ", Chocolate";
    }
    public double getCost() {
        return super.getCost() + 1.0;
    }
}

class CoffeeShop {
    public String order(String[] toppings) {
        Coffee coffee = new BasicCoffee();
        
        if (toppings != null) {
            for (String topping : toppings) {
                if (topping.equalsIgnoreCase("Milk")) coffee = new MilkDecorator(coffee);
                else if (topping.equalsIgnoreCase("Sugar")) coffee = new SugarDecorator(coffee);
                else if (topping.equalsIgnoreCase("Cream")) coffee = new CreamDecorator(coffee);
                else if (topping.equalsIgnoreCase("Chocolate")) coffee = new ChocolateDecorator(coffee);
            }
        }
        
        // Avoid String.format (not supported in TeaVM): use integer arithmetic instead
        long cents = Math.round(coffee.getCost() * 100);
        long dollars = cents / 100;
        long centsPart = cents % 100;
        String costStr = dollars + "." + (centsPart < 10 ? "0" : "") + centsPart;
        return coffee.getDescription() + " | Cost: $" + costStr;
    }
}
