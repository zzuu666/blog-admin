import { Property, Schema } from '../types/schema'
import { Config as GolbalConfig } from '../config'
import { toPascalCase } from '../utils/util'
import * as path from 'path'
import * as fs from 'fs'
import * as shell from 'shelljs'

export interface Options {
    // 文件输出路径
    output?: string
    // 根路径
    golbalConfig: GolbalConfig
    schema: Schema
}

class ModelTemplate {
    options: Options

    constructor(options: Options) {
        this.options = options
    }

    generateExportContent(properties: Property[]): string {
        const result = properties.map(property => `    ${property.name}: ${property.type}`).join('\n')
        return result
    }

    generateFile() {
        const { schema } = this.options
        const { root, temDir } = this.options.golbalConfig
        const output = this.options.output || path.join(root, temDir, 'models')
        const outputFile = path.join(output, `./${schema.model}.ts`)
        try {
            fs.readdirSync(output)
        }
        catch (err) {
            fs.mkdirSync(output)
        }
        shell.cp(path.join(__dirname, '../templates/model.template'), outputFile)
        shell.sed('-i', '<%= name %>', toPascalCase(schema.model), outputFile)
        shell.sed('-i', '<%= properties %>', this.generateExportContent(schema.properties), outputFile)
    }
}

export default ModelTemplate
