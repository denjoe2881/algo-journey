import { defineTests } from '../../_test-utils';

export default defineTests('student-grading-strategy', (t) => {
  t.visible('basic-grading', {
    operations: [
      ['Course'],
      ['grade', [40, 60, 50]],
      ['setGradingPolicy', 'new AverageGradingPolicy()'],
      ['grade', [40, 60, 50]],
      ['setGradingPolicy', 'new PassFailGradingPolicy()'],
      ['grade', [40, 60, 50]],
      ['setGradingPolicy', 'new HighestScoreGradingPolicy()'],
      ['grade', [40, 60, 50]],
    ],
    expected: [null, 'No policy set', null, 'Average: 50', null, 'Pass', null, 'Highest: 60'],
  });

  t.visible('edge-cases', {
    operations: [
      ['Course'],
      ['setGradingPolicy', 'new AverageGradingPolicy()'],
      ['grade', []],
      ['setGradingPolicy', 'new PassFailGradingPolicy()'],
      ['grade', [49, 50]],
      ['grade', []],
    ],
    expected: [null, null, 'No scores', null, 'Fail', 'Fail'],
  });

  t.hidden('switch-policy', {
    operations: [
      ['Course'],
      ['setGradingPolicy', 'new PassFailGradingPolicy()'],
      ['grade', [70, 80, 90]],
      ['setGradingPolicy', 'new AverageGradingPolicy()'],
      ['grade', [70, 80, 90]],
      ['setGradingPolicy', 'new HighestScoreGradingPolicy()'],
      ['grade', [70, 80, 90]],
    ],
    expected: [null, null, 'Pass', null, 'Average: 80', null, 'Highest: 90'],
  });
});
