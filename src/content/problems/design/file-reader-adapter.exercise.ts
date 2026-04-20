import { defineExercise } from '../../_loader';

export default defineExercise({
  id: 'file-reader-adapter',
  version: 1,
  title: 'File Reader Adapter - Adapter Pattern',
  summary: 'Allows incompatible interfaces to work together by wrapping an existing class with a new interface.',
  topic: 'design',
  difficulty: 'easy',
  tags: ['design', 'adapter-pattern', 'polymorphism', 'cse202'],
  estimatedMinutes: 20,
  order: 460,
  mode: 'class_implementation',
  hints: [
    'The `JsonLibraryReader` does NOT implement `DataReader` and has a differently named method (`readJson`).',
    'To make it compatible, create `JsonReaderAdapter` which implements `DataReader`.',
    'The adapter should hold a reference to `JsonLibraryReader` in its constructor.',
    'Inside the adapter\'s `read()` method, delegate the work by calling `jsonReader.readJson()`.'
  ],

  learningGoals: [
    'Understand and implement the Adapter Pattern (Object Adapter)',
    'Bridge compatibility gaps between legacy or third-party code and expected interfaces',
    'Use composition and interface implementation together'
  ],
  statement: `You are integrating a new third-party JSON parsing library into your existing data import system. Your system expects all readers to implement the \`DataReader\` interface, but the new library class (\`JsonLibraryReader\`) has a completely different interface.

Use the **Adapter Pattern** to make the \`JsonLibraryReader\` compatible with your \`DataImportService\`.

**Target Interface:**
- \`DataReader\`
  - \`String read(String fileName)\`

**Existing Compatible Reader:**
- \`TxtReader\` implements \`DataReader\`
  - \`read(fileName)\` returns \`"Reading TXT: {fileName}"\`

**Incompatible 3rd-Party Library:**
- \`JsonLibraryReader\` (DOES NOT implement \`DataReader\`)
  - \`String readJson(String file)\` returns \`"Parsing JSON from {file}"\`

**Your Adapter:**
- \`JsonReaderAdapter\` implements \`DataReader\`
  - Constructor: \`JsonReaderAdapter(JsonLibraryReader jsonReader)\`
  - \`read(fileName)\` — Delegates the call to the library's \`readJson\` method.

**Context class:**
- \`DataImportService()\`
  - \`String importData(DataReader reader, String fileName)\` — Calls \`read()\` on the provided reader. Returns \`"No reader"\` if null.`,
  constraints: [
    'You must not modify the \`JsonLibraryReader\` class signature. It represents an unmodifiable 3rd-party library.',
    'At most \`1000\` operations will be performed.'
  ],
  examples: [
    {
      input: `DataImportService service = new DataImportService();

DataReader txtReader = new TxtReader();
service.importData(txtReader, "data.txt");      
// return "Reading TXT: data.txt"

JsonLibraryReader jsonLib = new JsonLibraryReader();
DataReader jsonAdapter = new JsonReaderAdapter(jsonLib);
service.importData(jsonAdapter, "data.json");   
// return "Parsing JSON from data.json"`,
      output: '[null, null, "Reading TXT: data.txt", null, null, "Parsing JSON from data.json"]'
    }
  ],

  starter: {
    file: 'DataImportService.java',
    code: `interface DataReader {
    String read(String fileName);
}

class TxtReader {
}

class JsonLibraryReader {
    public String readJson(String file) {
        return "Parsing JSON from " + file;
    }
}

class JsonReaderAdapter {
}

class DataImportService {

    public DataImportService() {
        
    }

    public String importData(DataReader reader, String fileName) {
        return "";
    }
}`,
  },

  requiredStructure: {
    className: 'DataImportService',
    requiredMethods: [
      'DataImportService()',
      'String importData(DataReader reader, String fileName)'
    ],
  },

  evaluation: {
    comparator: 'exact_json',
    javaGenerator: {
      count: 20,
      seed: 55441122,
      namePrefix: 'test-',
      visibility: 'hidden',
      genMethodBody: `
        for (int i = 0; i < 20; i++) {
            int opsCount = (i < 5) ? 10 : 50;
            DataImportService obj = new DataImportService();

            boolean pass = true;
            String firstMismatchAct = "\\"[OK-Test-" + i + "] Ops: \\" + opsCount";
            String firstMismatchExp = firstMismatchAct;

            for (int k = 0; k < opsCount; k++) {
                int type = rng.nextInt(3); // 0: txt, 1: json adapter, 2: null
                String fileName = "file_" + rng.nextInt(100) + (type == 0 ? ".txt" : ".json");
                
                DataReader reader = null;
                String expectedAns = "No reader";
                
                if (type == 0) {
                    reader = new TxtReader();
                    expectedAns = "Reading TXT: " + fileName;
                } else if (type == 1) {
                    reader = new JsonReaderAdapter(new JsonLibraryReader());
                    expectedAns = "Parsing JSON from " + fileName;
                }

                String actualAns = obj.importData(reader, fileName);

                if (!expectedAns.equals(actualAns)) {
                    pass = false;
                    firstMismatchAct = "[importData -> " + actualAns + "]";
                    firstMismatchExp = "[importData -> " + expectedAns + "]";
                    break;
                }
            }
            System.out.println("AJ|test-" + i + "|" + pass + "|" + firstMismatchAct + "|" + firstMismatchExp);
        }`
    }
  }
});
