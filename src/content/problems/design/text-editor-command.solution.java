import java.util.Stack;

interface Command {
    void execute();
    void undo();
}

class AddTextCommand implements Command {
    private TextEditor editor;
    private String textToAdd;

    public AddTextCommand(TextEditor editor, String textToAdd) {
        this.editor = editor;
        this.textToAdd = textToAdd;
    }

    public void execute() {
        editor.appendContent(textToAdd);
    }

    public void undo() {
        editor.removeContent(textToAdd.length());
    }
}

class DeleteTextCommand implements Command {
    private TextEditor editor;
    private int length;
    private String deletedText;

    public DeleteTextCommand(TextEditor editor, int length) {
        this.editor = editor;
        this.length = length;
    }

    public void execute() {
        int currentLen = editor.getContent().length();
        int delLen = Math.min(length, currentLen);
        this.deletedText = editor.getContent().substring(currentLen - delLen);
        editor.removeContent(delLen);
    }

    public void undo() {
        if (deletedText != null) {
            editor.appendContent(deletedText);
        }
    }
}

class CommandManager {
    private Stack<Command> undoStack = new Stack<>();
    private Stack<Command> redoStack = new Stack<>();

    public void executeCommand(Command command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            command.undo();
            redoStack.push(command);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            Command command = redoStack.pop();
            command.execute();
            undoStack.push(command);
        }
    }
}

class TextEditor {
    private StringBuilder content = new StringBuilder();
    private CommandManager manager = new CommandManager();

    public void addText(String text) {
        manager.executeCommand(new AddTextCommand(this, text));
    }

    public void deleteText(int length) {
        manager.executeCommand(new DeleteTextCommand(this, length));
    }

    public void undo() {
        manager.undo();
    }

    public void redo() {
        manager.redo();
    }

    public String getContent() {
        return content.toString();
    }

    // Helper methods for Commands
    public void appendContent(String text) {
        content.append(text);
    }

    public void removeContent(int length) {
        if (length <= content.length()) {
            content.setLength(content.length() - length);
        } else {
            content.setLength(0);
        }
    }
}
