import test from 'ava';

import { bashFool } from '../../src/custom';
const {stdout} = require('stdout-stderr')
const commands = [
  {
    'title': 'do nothing',
    'file': 'echo',
    'arguments': [
      'this is echoed',
    ],
  },
  {
    title: 'more nothing',
    file: 'echo',
    arguments: [
      'second echoed function',
    ],
    options: {foo:'bar'}
  },
]

const targetDir = 'nonexistent'

test('general', async t => {
  stdout.start()
  const listr = await bashFool(commands, targetDir, {})
  await listr.run()
  t.regex(stdout.output, /do nothing/)
  t.regex(stdout.output, /more nothing/)

  stdout.stop()
});
