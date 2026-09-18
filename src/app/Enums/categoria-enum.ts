export enum CategoriaEnum {
    Normal = "NORMAL",
    ProdutoInsumos = "PRODUTO_INSUMOS",
    Insumo = "INSUMO",
    Servico = "SERVICO",
}

export const CATEGORIA_LABELS: Record<CategoriaEnum, string> = {
    [CategoriaEnum.Normal]: "Normal",
    [CategoriaEnum.ProdutoInsumos]: "Produto/Insumos",
    [CategoriaEnum.Insumo]: "Insumo",
    [CategoriaEnum.Servico]: "Serviço",
}