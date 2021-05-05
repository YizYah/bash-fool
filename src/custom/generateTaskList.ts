import {CommandSpec} from 'magicalstrings'
import {convertCommandArgs} from './setup/convertCommandArgs'
import {convertCommandOptions} from './setup/convertCommandOptions'
const dynamapping = require('dynamapping')
const chalk = require('chalk')
const execa = require('execa')

export function generateTaskList(
  preCommands: CommandSpec[],
  targetDir: string,
  session: any
) {
  const preCommandsInfo = preCommands.map(object => dynamapping(
    object, session, {}
  )).filter(x => !x.prevent)

  return preCommandsInfo.map((commandSpec: CommandSpec) => {
    return {
      title: commandSpec.title,
      task: async () => {
        await execa(
          commandSpec.file,
          convertCommandArgs(commandSpec.arguments, targetDir),
          convertCommandOptions(commandSpec.options, targetDir),
        ).catch((error: any) => {
          throw new Error(`${chalk.red(`error with pre-command ${commandSpec.title}.`)}
Here is the information about the command: ${JSON.stringify(
    commandSpec, null, 1
  )}
You may try contacting the author of your template to see what they suggest.
Here is the error reported:\n${error}`)
        },)
      },
    }
  },)
}
