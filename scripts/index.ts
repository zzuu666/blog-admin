import User from './schemas/user'
import config from './config'
import ModelGenerator from './generators/model'
import ListGenerator from './generators/list'
import * as fs from 'fs'
import * as path from 'path'

const checkTemporaryDirectory = (path: string): void => {
    try {
        fs.readdirSync(path)
    }
    catch (err) {
        fs.mkdirSync(path)
    }
}

checkTemporaryDirectory(path.join(config.root, config.temDir))

const modelGenerator = new ModelGenerator({
    golbalConfig: config,
    schema: User
})

const listGenerator = new ListGenerator({
    golbalConfig: config,
    schema: User
})

modelGenerator.generateFile()
listGenerator.generateFile()
