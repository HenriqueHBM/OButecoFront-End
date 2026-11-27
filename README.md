# OButeco — Front-End 

Interface Angular 19 do sistema OButeco. Consome a API do [OButecoBack-End](https://github.com/HenriqueHBM/OButecoBack-End). 

## Segurança no front

- Token JWT guardado no `sessionStorage` e enviado automaticamente pelo `auth.interceptor.ts`
- Rotas protegidas: `authGuard` (precisa estar logado), `guestGuard` (login), `roleGuard` (por cargo)
- 401 -> logout e volta ao login; 403 -> aviso "Sem permissão" 

 ## URL da API
 - Produção (`environment.ts`): `/api` 
 — relativo ao endereço do site; o Apache repassa para o Spring.
 - Desenvolvimento (`environment.development.ts`): `http://localhost:8080`.

## Rodar localmente 
```bash npm install npx ng serve # http://localhost:4200 (back-end precisa estar rodando na 8080) ``` 

## Build de produção 

```npx ng build # saída em dist/obuteco-front-end/browser``` 

O deploy completo na AWS (script `.sh`) está documentado no README do back.