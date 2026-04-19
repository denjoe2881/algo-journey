interface Vehicle {
    String start();
    String stop();
    String getInfo();
}

class Bike implements Vehicle {
    public String start() {
        return "Pedaling bike";
    }
    public String stop() {
        return "Using bike brakes";
    }
    public String getInfo() {
        return "This is a Bike";
    }
}

class Motorbike implements Vehicle {
    public String start() {
        return "Starting engine of motorbike";
    }
    public String stop() {
        return "Stopping motorbike";
    }
    public String getInfo() {
        return "This is a Motorbike";
    }
}

class Car implements Vehicle {
    public String start() {
        return "Starting engine of car";
    }
    public String stop() {
        return "Stopping car";
    }
    public String getInfo() {
        return "This is a Car";
    }
}

class VehicleFactory {
    public Vehicle createVehicle(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("Bike")) return new Bike();
        if (type.equalsIgnoreCase("Motorbike")) return new Motorbike();
        if (type.equalsIgnoreCase("Car")) return new Car();
        return null;
    }

    // Helper for testing
    public String orderVehicle(String type) {
        Vehicle v = createVehicle(type);
        if (v == null) return "Unknown type";
        return v.getInfo() + " | " + v.start() + " | " + v.stop();
    }
}
