# Regras

## Cadastro

### Com o Google
- Usar a função de autenticação
- Se já estiver cadastrado, ela retorna um erro
- Caso o cadastro seja bem sucedido, salvar o usuário no Database também
- Deixar username como null e defined_username como true

### Com email e senha
- Receber username, email e senha pelo formulário
- Verificar se username já está sendo usado. Se sim, retornar erro
- Usar a função de autenticação e tratar possíveis erros
- Caso o cadastro seja bem sucedido, salvar o usuário no Database também

### Importante!
- Gravar informações acepted_terms e acepted_privacy
- Só deixar o usuário clicar nos botões se aceitar

### Estrutura de um usuário
```json
{
  "users": {
    "<username>": {
      "username": "string | null",
      "email": "string",
      "profile_photo": "string",
      "background_photo": "string",
      "saved_posts": [
        // ...
      ],
      "acepted_terms": "boolean",
      "acepted_privacy": "boolean",
      "defined_username": "boolean"
    }
  }
}
```