export class Movimentacoes {
    id !: number;
    fk_id_estoque !: number;
    tipo !: string;
    qtde !: number;
    valorUnitario !: number;
    valorTotal !: number;
    fk_id_usuario !: number;
    fk_id_conversao !: number;
    dataMovimentacao !: string;
    observacao !: string;
    taxaConversao !: number;
    fk_id_produto !: number;
    local !: string;
}
