import test from 'ava';

import { generateTaskList } from '../../src/custom/generateTaskList';
import { CommandSpec } from 'magicalstrings';

const faultyCommand: CommandSpec[] = [
    {
        'title': 'error',
        'file': '__nonexistentCommand__',
        'arguments': [
        ],
    },

]

const targetDir: string = 'foo'
const session = {}

test.skip('generateTaskList', async t => {
    const listr = await generateTaskList(faultyCommand, targetDir, session)
});
