import { CategoriaEnum } from "../../Enums/categoria-enum";
import { GrupoEnum } from "../../Enums/grupo-enum";
import { StatusEnum } from "../../Enums/status-enum";

export class Produto {
    id !: number;
    name !: string;
    status !: StatusEnum;
    categoryEnum !: CategoriaEnum;
    groupEnum !: GrupoEnum;
    salePrice !: number;
    observation !: string;
    creationDate !: string;
    updateDate !: string;
    deletedDate !:string;
}