#!/usr/bin/env node

// @ts-check
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2), { string: ['_'] });
const prompts = require('prompts')
const {
  yellow,
  blue,
  red
} = require('kolorist')
const { isEmpty, isValidPackageName, toValidPackageName, emptyDir, copy, pkgFromUserAgent } = require('./utils')

const FRAMEWORKS = [
  {
    name: 'vue',
    color: yellow,
    variants: [
      {
        name: 'vue-ipt',
        display: 'JavaScript',
        color: yellow
      },
    ]
  },
]

const cwd = process.cwd()

const TEMPLATES = FRAMEWORKS.map(
  (f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]
).reduce((a, b) => a.concat(b), [])

async function init () {
  let targetDir = argv._[0]
  let template = argv.template || argv.t
  const defaultProjectName = !targetDir ? 'winning-ipt-project' : targetDir

  let result = {}

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: '项目包名:',
          initial: defaultProjectName,
          onState: (state) =>
            (targetDir = state.value.trim() || defaultProjectName)
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? '当前目录'
              : `目标目录 "${targetDir}"`) +
            ` 不为空。删除存在的文件并继续?`
        },
        {
          type: (_, { overwrite } ) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' 操作取消')
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: '项目包名:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: template && TEMPLATES.includes(template) ? null : 'select',
          name: 'framework',
          message:
            typeof template === 'string' && !TEMPLATES.includes(template)
              ? `"${template}" 不是正确的模板. 请从以下模板中选择: `
              : '选择一个框架:',
          initial: 0,
          choices: FRAMEWORKS.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.name),
              value: framework
            }
          })
        },
        {
          type: (framework) =>
            framework && framework.variants ? 'select' : null,
          name: 'variant',
          message: '选择一个模板:',
          // @ts-ignore
          choices: (framework) =>
            framework.variants.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.name),
                value: variant.name
              }
            })
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

   // user choice associated with prompts
   const { framework, overwrite, packageName, variant } = result

   const root = path.join(cwd, targetDir)

   if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  // determine template
  template = variant || framework || template

  console.log(`\n正在往${root}传输...`)

  const templateDir = path.join(__dirname, `template-${template}`)

  const files = fs.readdirSync(templateDir)
  const renameFiles = {
    _gitignore: '.gitignore'
  }
  function write (file, content) {
    
    const targetPath = renameFiles[file]
    ? path.join(root, renameFiles[file])
    : path.join(root, file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = require(path.join(templateDir, `package.json`))

  pkg.name = packageName || targetDir

  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\nwell done!\n`)
}

init().catch((e) => {
  console.error(e)
})