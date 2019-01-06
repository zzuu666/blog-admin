import GenerateBase from './base'
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

class ListGenerator extends GenerateBase {

    generateFormColumns() {
        const { schema } = this.options
        const optionsColumnTempalte: string =
`    {
        title: 'Options',
        key: 'action',
        render: (text, record) => (
            <span>
                <Link to={ \`${schema.prefixPath}/${schema.model}/edit/\${record.id}\` }>编辑</Link>
                <Divider type="vertical" />
                <a href="javascript:;">屏蔽</a>
                <Divider type="vertical" />
                <a href="javascript:;">删除</a>
            </span>
        )
    }`
        const generateNormalColumnTemplate = (property: Property): string => (
`    {
        title: '${toPascalCase(property.name)}',
        dataIndex: '${property.name}'
    },\n`
        )

        const normalColumnsTemplate: string
            = schema.properties
                .map(property => generateNormalColumnTemplate(property))
                .join('')
        return normalColumnsTemplate
    }

    generateFile() {
        const { root, temDir } = this.options.golbalConfig
        const output = this.options.output || path.join(root, temDir, 'pages')
        try {
            fs.readdirSync(output)
        }
        catch (err) {
            fs.mkdirSync(output)
        }
        shell.cp('-r', path.join(__dirname, '../templates/list'), output)
        shell.ls('-R', output).forEach(file => {
            if (file.indexOf('.ts') === -1) {
                return
            }
            const absoluteFile = path.join(output, file)
            this.replaceCommonMark(absoluteFile)
            shell.sed('-i', /<%= form-columns %>/g, this.generateFormColumns(), absoluteFile)
        })
    }
}

export default ListGenerator
