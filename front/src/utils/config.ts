export const HOME_TABLE_HEADERS = {
    Cliente: 'cliente',
    Produto: 'produto',
    Valor: 'valor',
    Status: 'status',
    'Data Criação': 'createdAt',
}

export type Order = {
    id: string
    cliente: string
    produto: string
    valor: string
    status: string
    createdAt: string
}

export const INTL_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
}
