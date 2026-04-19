abstract class ReportExporter {
    public final String export() {
        return loadData() + " -> " + processData() + " -> " + formatData() + " -> " + saveFile();
    }
    
    // Default implementation for all reports
    public String loadData() {
        return "Load DB";
    }
    public String processData() {
        return "Process Data";
    }
    
    // Subclasses must implement formatting and saving
    protected abstract String formatData();
    protected abstract String saveFile();
}

class PdfReportExporter extends ReportExporter {
    protected String formatData() {
        return "Format PDF";
    }
    protected String saveFile() {
        return "Save .pdf";
    }
}

class ExcelReportExporter extends ReportExporter {
    protected String formatData() {
        return "Format Excel";
    }
    protected String saveFile() {
        return "Save .xlsx";
    }
}

class HtmlReportExporter extends ReportExporter {
    protected String formatData() {
        return "Format HTML";
    }
    protected String saveFile() {
        return "Save .html";
    }
}

class ReportSystem {
    public String generateReport(ReportExporter exporter) {
        if (exporter == null) return "No exporter provided";
        return exporter.export();
    }
}
