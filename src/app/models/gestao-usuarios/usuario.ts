import { CargosEnum } from "../../Enums/cargos-enum";
import { StatusEnum } from "../../Enums/status-enum";

// Formato da resposta do back (UsuariosResponse)
export class Usuario {
    id           !: number;
    name         !: string;
    user         !: string;
    status       !: StatusEnum;
    role         !: CargosEnum;
    creationDate !: string;
    updateDate   !: string;
    deleteDate   !: string;
}

// Formato do body enviado ao back (UsuariosRequest)
export class UsuarioRequest {
    id        !: number;
    nome      !: string;
    usuario   !: string;
    senha     !: string;
    cargoEnum !: CargosEnum;
}
