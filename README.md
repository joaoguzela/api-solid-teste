# App

Gympass style app. 

## RFs (Requisitos funcionais)
- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuario logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possível o usuario obter seu historico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próximas;
- [ ] Deve ser possível o usuario buscar uma academia pelo nome;
- [ ] Deve ser possível um usuario fazer check-in em uma academia
- [ ] Deve ser possível validar o check-in de um usuário;

## RNs (Regras de negócio)
- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuario não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in so pode ser validado até 20 minutos apos criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)
- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

save-exact= A versão da depedencia vai ficar fixa no package.JSON# api-solid-teste
