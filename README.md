
[//]: # ( ns__file unit: standard, comp: README.md )

[//]: # ( ns__custom_start beginning )

[//]: # ( ns__custom_end beginning )

[//]: # ( ns__start_section intro )

[//]: # ( ns__custom_start description )

![](images/bash-fool.gif)

run a sequence of bash commands as specified by a json

[//]: # ( ns__custom_end description )

[//]: # ( ns__custom_start afterDescription )

[//]: # ( ns__custom_end afterDescription )

[//]: # ( ns__custom_start badges )

[//]: # ( ns__start_section usageSection )

[![codecov](https://codecov.io/gh/YizYah/bash-fool/branch/main/graph/badge.svg?token=019QO4XK1Z)](https://codecov.io/gh/YizYah/bash-fool)
[![Version](https://img.shields.io/npm/v/bash-fool.svg)](https://npmjs.org/package/bash-fool)
[![Downloads/week](https://img.shields.io/npm/dw/bash-fool.svg)](https://npmjs.org/package/bash-fool)
[![License](https://img.shields.io/npm/l/bash-fool.svg)](https://github.com/YizYah/bash-fool/blob/master/package.json)

[![Geenee](https://img.shields.io/badge/maintained%20by-geenee-brightgreen)](https://npmjs.org/package/geenee)
[![Template](https://img.shields.io/badge/template-ts--packrat-blue)](https://npmjs.org/package/ts-packrat)

[//]: # ( ns__custom_end badges )

[//]: # ( ns__end_section intro )


[//]: # ( ns__start_section api )


[//]: # ( ns__custom_start Usage )
# Why
Frequently you need to have a cli execute several commands.  The tools execa and listr make this easy, but why go to the trouble of repeating the same boilerplate each time?

# What
A function that generates a listr for execution of a set of bash commands using execa.  You just pass in an array of commands and a listr is generated for it.  You can also have:
* __targetDir__ a string indicating the directory that you can use in commands.  Anywhere that you use a `$codeDir` placeholder, it will be dynamically replaced by `targetDir`.  
* __session__ an object that lets you dynamically replace other strings in your commands.  You must insert a key `keyName` into `session`, and then you can use it by placing into a command specification that string `__session.keyName__`.  For instance, `__session.lastName__` could be used in a command, and `session` could be `{lastName: 'jones'}.

# Usage
First, install the package:
```
npm i bash-fool
```
Here is a sample usage:
```
const bashFool = require('bash-fool')

const commands = [
  {
    'title': 'echo a string',
    'file': 'echo',
    'arguments': [
      'this is echoed: __session:echoedString',
    ],
  },
  {
    title: 'more nothing',
    file: 'echo',
    arguments: [
      'second echoed function',
    ],
  },
]

const echoedString = 'foobar'
const session = { echoedString }

const targetDir = 'nonexistent'

async () => {
  let listr = await bashFool(commands, targetDir, session)
  await listr.run() 
     // will echo: `this is echoed: foobar` 
     // and then: `second echoed function` 
});
```

[//]: # ( ns__custom_end Usage )



[//]: # ( ns__custom_start APIIntro )

[//]: # ( ns__custom_end APIIntro )


[//]: # ( ns__custom_start constantsIntro )


[//]: # ( ns__custom_end constantsIntro )



[//]: # ( ns__start_section types )


[//]: # ( ns__end_section types )


[//]: # ( ns__end_section api )

