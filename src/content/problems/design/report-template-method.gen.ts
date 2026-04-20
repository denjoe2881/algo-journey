import { defineTests } from '../../_test-utils';

export default defineTests('report-template-method', (t) => {
  t.visible('basic-exports', {
    operations: [
      ['ReportSystem'],
      ['generateReport', 'new PdfReportExporter()'],
      ['generateReport', 'new HtmlReportExporter()'],
      ['generateReport', 'new ExcelReportExporter()'],
    ],
    expected: [
      null,
      'Load DB -> Process Data -> Format PDF -> Save .pdf',
      'Load DB -> Process Data -> Format HTML -> Save .html',
      'Load DB -> Process Data -> Format Excel -> Save .xlsx',
    ],
  });

  t.visible('null-exporter', {
    operations: [
      ['ReportSystem'],
      ['generateReport', 'null'],
    ],
    expected: [
      null,
      'No exporter provided',
    ],
  });

  t.hidden('repeated-calls', {
    operations: [
      ['ReportSystem'],
      ['generateReport', 'new PdfReportExporter()'],
      ['generateReport', 'new PdfReportExporter()'],
    ],
    expected: [
      null,
      'Load DB -> Process Data -> Format PDF -> Save .pdf',
      'Load DB -> Process Data -> Format PDF -> Save .pdf',
    ],
  });
});
