export enum GrupoEnum {
    Bebida = "BEBIDA",
    Comida = "COMIDA",
    Ingrediente= "INGREDIENTE",
    Servico = "SERVICO",
    Insumo = "INSUMO",
}

export const GRUPO_LABELS: Record<GrupoEnum, string> = {
    [GrupoEnum.Bebida]: 'Bebida',
    [GrupoEnum.Insumo]: 'Insumo',
    [GrupoEnum.Comida]: 'Produto/Insumos',
    [GrupoEnum.Ingrediente]: 'Normal',
    [GrupoEnum.Servico]: 'Serviço'
};