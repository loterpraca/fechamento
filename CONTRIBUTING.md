# 🤝 Contribuindo para o SISLOT

Obrigado por considerar contribuir com o SISLOT! Este documento fornece diretrizes para contribuições.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Padrões de Código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Depois clone seu fork
git clone https://github.com/seu-usuario/sislot.git
cd sislot
```

### 2. Crie uma Branch

```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bugfix
```

### 3. Faça suas Alterações

- Mantenha o código limpo e documentado
- Siga os padrões de código do projeto
- Teste suas alterações

### 4. Commit

```bash
git add .
git commit -m "feat: descrição da feature"
# ou
git commit -m "fix: descrição do bugfix"
```

### 5. Push e Pull Request

```bash
git push origin feature/minha-feature
```

Depois abra um Pull Request no GitHub.

## 📝 Padrões de Código

### JavaScript

- Use `const` e `let` (não use `var`)
- Use arrow functions quando apropriado
- Indentação: 2 espaços
- Ponto-e-vírgula opcional, mas seja consistente
- Nomes de variáveis em camelCase
- Nomes de constantes em UPPER_CASE

```javascript
// ✅ Bom
const userName = 'João';
const calculateTotal = (values) => {
  return values.reduce((a, b) => a + b, 0);
};

// ❌ Evitar
var user_name = 'João';
function calculate_total(values) {
  var total = 0;
  for(var i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
}
```

### HTML/CSS

- Indentação: 2 espaços
- Use aspas duplas para atributos HTML
- Classes CSS em kebab-case
- Mantenha a estrutura semântica

```html
<!-- ✅ Bom -->
<div class="user-profile">
  <h2 class="profile-title">Nome do Usuário</h2>
</div>

<!-- ❌ Evitar -->
<div class="userProfile">
  <h2 class="ProfileTitle">Nome do Usuário</h2>
</div>
```

### Google Apps Script

- Siga as mesmas regras do JavaScript
- Documente funções complexas
- Use try-catch para tratamento de erros
- Retorne sempre objetos com estrutura `{ok, ...}`

```javascript
// ✅ Bom
function login_(body) {
  try {
    // lógica
    return {ok: true, data: resultado};
  } catch(err) {
    return {ok: false, error: err.message};
  }
}
```

## 🔄 Processo de Pull Request

### Antes de Abrir o PR

- [ ] Código testado localmente
- [ ] Sem erros no console
- [ ] Documentação atualizada (se necessário)
- [ ] Commits organizados e com mensagens claras

### Mensagens de Commit

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, ponto-e-vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Atualizações de build, configurações, etc

Exemplos:
```
feat: adicionar validação de CPF no login
fix: corrigir cálculo de quebra na tela 4
docs: atualizar README com novas instruções
```

### Descrição do PR

Ao abrir um PR, inclua:

1. **O que foi feito**: Descreva as alterações
2. **Por que foi feito**: Explique a motivação
3. **Como testar**: Passos para validar
4. **Screenshots**: Se aplicável

Exemplo:
```markdown
## O que foi feito
Adicionei validação de CPF no formulário de login.

## Por que foi feito
Para garantir que apenas CPFs válidos sejam aceitos no sistema.

## Como testar
1. Acessar a tela de login
2. Tentar fazer login com CPF inválido
3. Verificar mensagem de erro

## Screenshots
[imagem]
```

## 🐛 Reportar Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir**:
   - Passo 1
   - Passo 2
   - Passo 3
3. **Comportamento esperado**: O que deveria acontecer
4. **Comportamento atual**: O que está acontecendo
5. **Screenshots/Logs**: Se possível
6. **Ambiente**:
   - Navegador e versão
   - Sistema operacional
   - Versão do SISLOT

### Template de Issue para Bug

```markdown
**Descrição**
Uma descrição clara do bug.

**Reproduzir**
Passos para reproduzir:
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

**Esperado**
O que você esperava que acontecesse.

**Atual**
O que realmente aconteceu.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - Navegador: [ex: Chrome 120]
 - SO: [ex: Windows 11]
 - Versão: [ex: 1.0]
```

## 💡 Sugerir Melhorias

### Como Sugerir

1. Verifique se a sugestão já não existe nas Issues
2. Abra uma nova Issue com label "enhancement"
3. Descreva detalhadamente a melhoria
4. Explique o benefício para os usuários
5. Se possível, sugira uma implementação

### Template de Issue para Melhoria

```markdown
**Sua melhoria está relacionada a um problema?**
Uma descrição clara do problema. Ex: "Fico frustrado quando [...]"

**Descreva a solução que você gostaria**
Uma descrição clara do que você quer que aconteça.

**Descreva alternativas que você considerou**
Outras soluções ou funcionalidades que você considerou.

**Contexto adicional**
Qualquer outro contexto ou screenshots sobre a melhoria.
```

## 🎯 Áreas que Precisam de Ajuda

Estamos sempre procurando ajuda em:

- 📝 Melhorias na documentação
- 🐛 Correção de bugs
- ✨ Novas funcionalidades
- 🎨 Melhorias de UI/UX
- 🧪 Testes e validações
- 🌍 Traduções
- ♿ Acessibilidade

## 📞 Dúvidas?

Se tiver dúvidas sobre como contribuir:

- Abra uma Issue com a tag "question"
- Entre em contato através das Issues
- Veja a documentação em `/docs`

## 🙏 Obrigado!

Toda contribuição, por menor que seja, é muito apreciada! Obrigado por ajudar a tornar o SISLOT melhor para todos.

---

**Lembre-se**: Seja respeitoso, construtivo e colaborativo. Estamos todos aqui para aprender e melhorar o projeto juntos! 🚀
