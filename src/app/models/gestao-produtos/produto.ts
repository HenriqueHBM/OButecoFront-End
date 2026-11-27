import { CategoriaEnum } from "../../Enums/categoria-enum";
import { GrupoEnum } from "../../Enums/grupo-enum";
import { StatusEnum } from "../../Enums/status-enum";
import { InsumoProduto, InsumoProdutoRequest } from "./insumo-produto";

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
    insumos: InsumoProduto[] = [];
}

// corpo enviado no POST/PUT (mesmos nomes do ProdutoRequest do back)
export interface ProdutoRequest {
    id: number | null;
    nome: string;
    categoriaEnum: CategoriaEnum;
    grupoEnum: GrupoEnum;
    precoVenda: number | null;
    observacao: string | null;
    insumos: InsumoProdutoRequest[];
}
