import { defineTests } from '../../_test-utils';

export default defineTests('file-reader-adapter', (t) => {
  t.visible('basic-adapters', {
    operations: [
      ['DataImportService'],
      ['importData', 'new TxtReader()', 'mydata.txt'],
      ['importData', 'new JsonReaderAdapter(new JsonLibraryReader())', 'config.json'],
    ],
    expected: [null, 'Reading TXT: mydata.txt', 'Parsing JSON from config.json'],
  });

  t.hidden('multiple-calls', {
    operations: [
      ['DataImportService'],
      ['importData', 'new TxtReader()', 'report.txt'],
      ['importData', 'new TxtReader()', 'data.txt'],
      ['importData', 'new JsonReaderAdapter(new JsonLibraryReader())', 'settings.json'],
    ],
    expected: [
      null,
      'Reading TXT: report.txt',
      'Reading TXT: data.txt',
      'Parsing JSON from settings.json',
    ],
  });
});
