import { Property, Schema } from '../types/schema'
import { Config as GolbalConfig } from '../config'
import { toPascalCase } from '../utils/util'
import * as path from 'path'
import * as fs from 'fs'

export interface Options {
    // 文件输出路径
    output?: string
    // 根路径
    golbalConfig: GolbalConfig
}

class ModelTemplate {
    options: Options

    constructor(options: Options) {
        this.options = options
    }

    generateExportHeader(type: string, name: string): string {
        return `export ${type} ${toPascalCase(name)} {\n`
    }

    generateExportContent(properties: Property[]): string {
        const result = properties.map(property => `    ${property.name}: ${property.type}`).join('\n')
        return result
    }

    generateExportEnd(): string {
        return '\n}'
    }

    generateTemplate(schema: Schema): string {
        const header = this.generateExportHeader('interface', schema.model)
        const content = this.generateExportContent(schema.properties)
        const end = this.generateExportEnd()
        return `${header}${content}${end}\n`
    }

    generateFile(schema: Schema, callback?: (error: NodeJS.ErrnoException) => void) {
        const { root, temDir } = this.options.golbalConfig
        const output = this.options.output || path.join(root, temDir, 'models')
        const outputFile = path.join(output, `./${schema.model}.ts`)
        const fileContent = this.generateTemplate(schema)
        try {
            fs.readdirSync(output)
        }
        catch (err) {
            fs.mkdirSync(output)
        }
        fs.writeFile(outputFile, fileContent, 'utf8', callback)
    }
}

export default ModelTemplate
