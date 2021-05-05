import { generateTaskList } from './generateTaskList';
import { CommandSpec } from 'magicalstrings';

const Listr = require('listr');

// export interface CommandSpec {
//   title: string;
//   file: string;
//   arguments: string[];
// }

export function bashFool(commands: CommandSpec[]|undefined, targetDir: string, session: any) {
  if (!commands) return;
  const taskFunctions = generateTaskList(
    commands, targetDir, session,
  ).filter(x => x !== null);

  return new Listr(taskFunctions);
}
