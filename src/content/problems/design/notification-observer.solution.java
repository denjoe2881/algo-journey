import java.util.ArrayList;
import java.util.List;

interface Observer {
    String update(String message);
}

class EmailNotifier implements Observer {
    private String email;

    public EmailNotifier(String email) {
        this.email = email;
    }

    public String update(String message) {
        return "Email to " + email + ": " + message;
    }
}

class SmsNotifier implements Observer {
    private String phone;

    public SmsNotifier(String phone) {
        this.phone = phone;
    }

    public String update(String message) {
        return "SMS to " + phone + ": " + message;
    }
}

class AppNotifier implements Observer {
    private String username;

    public AppNotifier(String username) {
        this.username = username;
    }

    public String update(String message) {
        return "App notification to " + username + ": " + message;
    }
}

class NotificationService {
    private List<Observer> observers;

    public NotificationService() {
        this.observers = new ArrayList<>();
    }

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public String sendNotification(String message) {
        List<String> results = new ArrayList<>();
        for (Observer obs : observers) {
            results.add(obs.update(message));
        }
        return "[" + String.join(", ", results) + "]";
    }
}
