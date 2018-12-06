const isProduction: boolean = process.env.NODE_ENV === 'production'

export const deployPath: string =  isProduction ? '/markii' : ''
