interface DataReader {
    String read(String fileName);
}

class TxtReader implements DataReader {
    public String read(String fileName) {
        return "Reading TXT: " + fileName;
    }
}

// Incompatible library class
class JsonLibraryReader {
    public String readJson(String file) {
        return "Parsing JSON from " + file;
    }
}

// Adapter
class JsonReaderAdapter implements DataReader {
    private JsonLibraryReader jsonReader;

    public JsonReaderAdapter(JsonLibraryReader jsonReader) {
        this.jsonReader = jsonReader;
    }

    public String read(String fileName) {
        return jsonReader.readJson(fileName);
    }
}

class DataImportService {
    public String importData(DataReader reader, String fileName) {
        if (reader == null) return "No reader";
        return reader.read(fileName);
    }
}
