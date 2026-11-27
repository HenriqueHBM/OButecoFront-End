// Insumo usado por um produto da categoria PRODUTO_INSUMOS (ficha técnica)

// o que o back devolve dentro de Produto.insumos
export class InsumoProduto {
    insumoId!: number;
    nomeInsumo!: string;
    qtde!: number;
}

// o que o back espera receber no cadastro/edição (ProdutoRequest.InsumosRequest)
export interface InsumoProdutoRequest {
    insumoId: number;
    qtde: number;
}
