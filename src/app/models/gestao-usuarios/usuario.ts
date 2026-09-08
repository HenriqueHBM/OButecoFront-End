import { Timestamp } from "rxjs";

export class Usuario {
    id         !:number;
    nome       !: string;
    usuario    !: string;
    senha      !: string;
    status     !: boolean;
    cargo      !: number;
    created_at !: string;
    updated_at !: string;
    deleted_at !:string;
}

// function constructor(
//     id: number,
//     nome: string,
//     usuario: string,
//     senha: string,
//     cargo: string,
//     data_criacao: string,
//     status: boolean,
// ) {
//     id = id;
//     nome = nome;
//     usuario = usuario;
//     senha = senha;
//     cargo = cargo;
//     data_criacao = data_criacao;
//     status = status;
// }
