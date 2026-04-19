import { defineTests } from '../../_test-utils';

export default defineTests('game-character-state', (t) => {
  t.visible('initial-state', {
    operations: [
      ['GameCharacter'],
      ['move'],
      ['attack'],
    ],
    expected: [null, 'Walking normally', 'Attacking normally'],
  });

  t.visible('state-transitions', {
    operations: [
      ['GameCharacter'],
      ['setState', 'new PoisonedState()'],
      ['attack'],
      ['setState', 'new StunnedState()'],
      ['move'],
      ['setState', 'new SpeedBoostState()'],
      ['move'],
    ],
    expected: [
      null,
      null,
      'Attacking weakly',
      null,
      'Cannot move while stunned',
      null,
      'Running very fast',
    ],
  });

  t.hidden('full-cycle', {
    operations: [
      ['GameCharacter'],
      ['move'],
      ['attack'],
      ['setState', 'new StunnedState()'],
      ['move'],
      ['attack'],
      ['setState', 'new NormalState()'],
      ['move'],
      ['attack'],
    ],
    expected: [
      null,
      'Walking normally',
      'Attacking normally',
      null,
      'Cannot move while stunned',
      'Cannot attack while stunned',
      null,
      'Walking normally',
      'Attacking normally',
    ],
  });
});
