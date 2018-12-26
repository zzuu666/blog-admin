import User from './schemas/user'
import config from './config'
import ModelGenerator from './templates/model'
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
    golbalConfig: config
})

modelGenerator.generateFile(User)
