import { updateSessionValues } from './updateSessionValues';

export function convertCommandOptions(options: any | undefined, codeDir: string, session: any) {
  if (!options) return {};
  const optionsKeys = Object.keys(options);
  if (optionsKeys.length === 0) return {};
  const output = { ...options };
  optionsKeys.map((optionKey: string) => {
    output[optionKey] = options[optionKey].replace('$codeDir', codeDir);
    output[optionKey] = updateSessionValues(session, options[optionKey]);
  });
  return output;
}
