export interface Property {
    name: string
    type: string
    desc?: string
}

export interface Schema {
    model: string
    prefixPath: string
    plural: string
    properties: Property[]
}
