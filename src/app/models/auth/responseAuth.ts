// Formato da resposta do POST /login (LoginResponse no back-end)
export interface ResponseAuth {
    token: string;
    id: number;
    nome: string;
}
