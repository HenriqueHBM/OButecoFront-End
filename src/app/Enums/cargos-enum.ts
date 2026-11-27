export enum CargosEnum {
    Estagiario = "ESTAGIARIO",
    Auxiliar = "AUXILIAR",
    Gerente = "GERENTE",
    Admin = "ADMIN",
}

export const CARGOS_LABELS: Record<CargosEnum, string> = {
    [CargosEnum.Estagiario]:"Estagiário",
    [CargosEnum.Auxiliar]:"Auxiliar",
    [CargosEnum.Gerente]:"Gerente",
    [CargosEnum.Admin]:"Administrador",
}
