export interface Property {
    name: string
    type: string
    desc?: string
}

export interface Schema {
    model: string
    properties: Property[]
}
