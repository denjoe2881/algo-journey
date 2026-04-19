interface GradingPolicy {
    String calculateGrade(int[] scores);
}

class AverageGradingPolicy implements GradingPolicy {
    public String calculateGrade(int[] scores) {
        if (scores == null || scores.length == 0) return "No scores";
        int sum = 0;
        for (int s : scores) sum += s;
        return "Average: " + (sum / scores.length);
    }
}

class HighestScoreGradingPolicy implements GradingPolicy {
    public String calculateGrade(int[] scores) {
        if (scores == null || scores.length == 0) return "No scores";
        int max = scores[0];
        for (int s : scores) {
            if (s > max) max = s;
        }
        return "Highest: " + max;
    }
}

class PassFailGradingPolicy implements GradingPolicy {
    public String calculateGrade(int[] scores) {
        if (scores == null || scores.length == 0) return "Fail";
        int sum = 0;
        for (int s : scores) sum += s;
        int avg = sum / scores.length;
        return avg >= 50 ? "Pass" : "Fail";
    }
}

class Course {
    private GradingPolicy policy;

    public void setGradingPolicy(GradingPolicy policy) {
        this.policy = policy;
    }

    public String grade(int[] scores) {
        if (policy == null) return "No policy set";
        return policy.calculateGrade(scores);
    }
}
