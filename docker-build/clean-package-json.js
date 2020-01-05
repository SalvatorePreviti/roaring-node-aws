const path = require('path')
const fs = require('fs')

const pjsPath = path.resolve(__dirname, '../lib/roaring-aws/package.json')

const pjson = JSON.parse(fs.readFileSync(pjsPath))

pjson.private = true

for (const key of Object.keys(pjson)) {
  if (key.startsWith('_')) {
    delete pjson[key]
  }
}

delete pjson.devDependencies
delete pjson.files
delete pjson.gypfile
delete pjson.husky
delete pjson['lint-staged']
delete pjson.scripts

fs.writeFileSync(pjsPath, JSON.stringify(pjson, null, 2))
