import test from 'ava';

import { convertCommandOptions } from '../../src/custom/setup/convertCommandOptions';

test('convertCommandOptions no options', async (t) => {
  let output = await convertCommandOptions(undefined, 'foo', {});
  t.deepEqual(output, {});

  output = await convertCommandOptions({}, 'foo', {});
  t.deepEqual(output, {});
});
