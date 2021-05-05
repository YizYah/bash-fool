import test from 'ava';

import { bashFool } from '../../src/custom';
import { CommandSpec } from 'magicalstrings';
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

const faultyCommand: CommandSpec[] = [
  {
    'title': 'error',
    'file': '__nonexistentCommand__',
    'arguments': [
    ],
    'options': {}
  },

]


test('general', async t => {
  stdout.start()
  let listr = await bashFool(commands, targetDir, {})
  await listr.run()
  t.regex(stdout.output, /do nothing/)
  t.regex(stdout.output, /more nothing/)

  // test error
  listr = await bashFool(faultyCommand, targetDir, {})


  const error = await t.throwsAsync(async () => {
    await listr.run()
  });
  t.regex(error.message, /error with/);

  stdout.stop()

  // test no params
  listr = await bashFool([], targetDir, {})
  t.deepEqual(listr._tasks, [])


  // test null commands
  listr = await bashFool(undefined, targetDir, {})
  t.deepEqual(listr, undefined)
});
