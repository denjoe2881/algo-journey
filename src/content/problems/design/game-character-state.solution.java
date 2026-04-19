interface CharacterState {
    String move();
    String attack();
}

class NormalState implements CharacterState {
    public String move() {
        return "Walking normally";
    }
    public String attack() {
        return "Attacking normally";
    }
}

class PoisonedState implements CharacterState {
    public String move() {
        return "Walking slowly and losing health";
    }
    public String attack() {
        return "Attacking weakly";
    }
}

class StunnedState implements CharacterState {
    public String move() {
        return "Cannot move while stunned";
    }
    public String attack() {
        return "Cannot attack while stunned";
    }
}

class SpeedBoostState implements CharacterState {
    public String move() {
        return "Running very fast";
    }
    public String attack() {
        return "Attacking quickly";
    }
}

class GameCharacter {
    private CharacterState state;

    public GameCharacter() {
        this.state = new NormalState(); // Default state
    }

    public void setState(CharacterState state) {
        this.state = state;
    }

    public String move() {
        return state.move();
    }

    public String attack() {
        return state.attack();
    }
}
