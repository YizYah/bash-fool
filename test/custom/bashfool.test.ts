import test from 'ava';

import { bashFool } from '../../src/custom';
import { CommandSpec } from 'magicalstrings';
const {stdout} = require('stdout-stderr')
const commands = [
  {
    'title': 'do nothing',
    'file': 'echo',
    'arguments': [
      'this is echoed: __session:echoedString'  ,
      '>stdout',
    ],
    'options': {stdio: 'pipe'}
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
const echoedString = 'foobar'
const session = { echoedString }

const targetDir = 'nonexistent'

const faultyCommand: CommandSpec[] = [
  {
    'title': 'error',
    'file': '__nonexistentCommand__',
    'arguments': [
    ],
    'options': {stdout: 'inherit'}
  },

]


test('general', async t => {
  stdout.start()
  stdout.print = true
  let listr = await bashFool(commands, targetDir, session)
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
