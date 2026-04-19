import { defineTests } from '../../_test-utils';

export default defineTests('text-editor-command', (t) => {
  t.visible('basic-undo-redo', {
    operations: [
      ['TextEditor'],
      ['addText', 'hello'],
      ['getContent'],
      ['addText', 'world'],
      ['getContent'],
      ['deleteText', 3],
      ['getContent'],
      ['undo'],
      ['getContent'],
      ['redo'],
      ['getContent'],
      ['addText', '!'],
      ['redo'],
      ['getContent'],
    ],
    expected: [
      null, null, 'hello', null, 'helloworld', null,
      'hellowo', null, 'helloworld', null, 'hellowo',
      null, null, 'hellowo!',
    ],
  });

  t.visible('edge-cases', {
    operations: [
      ['TextEditor'],
      ['undo'],
      ['addText', 'a'],
      ['deleteText', 5],
      ['getContent'],
      ['undo'],
      ['getContent'],
    ],
    expected: [null, null, null, null, '', null, 'a'],
  });

  t.hidden('multi-undo-redo', {
    operations: [
      ['TextEditor'],
      ['addText', 'abc'],
      ['addText', 'def'],
      ['addText', 'ghi'],
      ['getContent'],
      ['undo'],
      ['getContent'],
      ['undo'],
      ['getContent'],
      ['redo'],
      ['getContent'],
    ],
    expected: [null, null, null, null, 'abcdefghi', null, 'abcdef', null, 'abc', null, 'abcdef'],
  });
});
