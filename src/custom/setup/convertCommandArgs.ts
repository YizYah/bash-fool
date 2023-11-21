import { updateSessionValues } from './updateSessionValues';

export function convertCommandArgs(args: string[] | undefined, codeDir: string, session: any) {
  if (!args || args.length === 0) return [];
  const output = args.map((arg: string) => {
    arg = arg.replace('$codeDir', codeDir);
    arg = updateSessionValues(session, arg);
    return arg;
  });
  return output;
}
