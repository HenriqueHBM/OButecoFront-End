// Formato da resposta do back (MovimentacoesEstoqueResponse)
export class Movimentacoes {
    id !: number;
    fk_id_stock !: number;
    type !: string;
    quantity !: number;
    unitPrice !: number;
    totalPrice !: number;
    fk_id_user !: number;
    user !: string;
    conversion !: string;
    product !: string;
    fk_id_conversion !: number;
    fk_id_product !: number;
    observation !: string;
    movDate !: string;
}

// Formato do body enviado ao back (MovimentacoesEstoqueRequest)
// O usuário não é mais enviado: o back pega o usuário logado pelo token
export class MovimentacaoRequest {
    fk_id_estoque !: number;
    tipo !: string;
    qtde !: number;
    valorUnitario !: number;
    fk_id_conversao !: number;
    taxaConversao !: number;
    observacao !: string;
    fk_id_produto !: number;
    local !: string;
}
