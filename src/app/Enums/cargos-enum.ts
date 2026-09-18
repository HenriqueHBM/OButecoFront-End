export enum CargosEnum {
    Estagiario = "ESTAGIARIO",
    Auxiliar = "AUXILIAR",
    Gerente = "GERENTE",
}

export const CARGOS_LABELS: Record<CargosEnum, string> = {
    [CargosEnum.Estagiario]:"Estagiário",
    [CargosEnum.Auxiliar]:"Auxiliar",
    [CargosEnum.Gerente]:"Gerente",
}
    
