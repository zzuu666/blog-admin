import { Schema } from '../types/schema'
import { Config as GolbalConfig } from '../config'
import { toPascalCase } from '../utils/util'
import * as shell from 'shelljs'

export interface Options {
    // 文件输出路径
    output?: string
    // 根路径
    golbalConfig: GolbalConfig
    schema: Schema
}

class GeneratorBase {
    options: Options

    constructor(options: Options) {
        this.options = options
    }

    replaceCommonMark(file) {
        const { schema } = this.options

        shell.sed('-i', /<%= name %>/g, schema.model, file)
        shell.sed('-i', /<%= pascal-name %>/g, toPascalCase(schema.model), file)
        shell.sed('-i', /<%= const-name %>/g, schema.model.toUpperCase(), file)
        shell.sed('-i', /<%= plural-name %>/g, schema.plural, file)
        shell.sed('-i', /<%= pascal-plural-name %>/g, toPascalCase(schema.plural), file)
    }
}

export default GeneratorBase
