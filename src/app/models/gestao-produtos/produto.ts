import { CategoriaEnum } from "../../Enums/categoria-enum";
import { GrupoEnum } from "../../Enums/grupo-enum";
import { StatusEnum } from "../../Enums/status-enum";

export class Produto {
    id !: number;
    nome !: string;
    status !: StatusEnum;
    categoriaEnum !: CategoriaEnum;
    grupoEnum !: GrupoEnum;
    precoVenda !: number;
    observacao !: string;
    created_at !: string;
    updated_at !: string;
    deleted_at !:string;
}