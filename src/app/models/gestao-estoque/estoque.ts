// Formato da resposta do back (EstoquesResponse)
export class Estoque {
    id !: number;
    product !: string;
    fk_id_product !: number;
    stockQuantity !: number;
    fk_id_conversion !: number;
    local !: string;
    creationDate !: string;
    updateDate !: string;
}

// Formato do body enviado ao back (EstoquesRequest)
export class EstoqueRequest {
    fk_id_produto !: number;
    qtdeEstoque !: number;
    fk_id_conversao !: number;
    local !: string;
}
