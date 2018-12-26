export interface Config {
    root: string
    temDir: string
}

const config: Config = {
    root: __dirname,
    temDir: 'tmp'
}

export default config
