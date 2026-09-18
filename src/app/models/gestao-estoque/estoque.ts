import { StatusEnum } from "../../Enums/status-enum";

export class Estoque {
    id !: number;
    produto !: number;
    qtdeEstoque !: number;
    fk_id_conversao !: number;
    local !: string;
    dataCriacao !: string;
    dataAtualizado !: string;
    deleted_at !:string;
}
