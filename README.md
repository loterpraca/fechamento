# 🏪 SISLOT - Sistema de Fechamento de Lotéricas

Sistema web completo para gerenciamento de fechamento de caixa de lotéricas, com autenticação de usuários e integração com Google Sheets.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0-blue.svg)

## 📋 Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Documentação](#documentação)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre

O SISLOT é um sistema completo para gestão de fechamento de caixa de lotéricas, desenvolvido para simplificar e organizar o processo de fechamento diário. O sistema conta com:

- ✅ Autenticação segura de usuários
- ✅ Fluxo guiado em 4 etapas
- ✅ Gravação automática em Google Sheets
- ✅ Cálculo automático de quebras
- ✅ Interface moderna e responsiva
- ✅ Controle de sessão e permissões

## 🚀 Funcionalidades

### Sistema de Autenticação
- Login com usuário e senha
- Sessões com duração configurável (padrão: 12h)
- Validação automática em todas as páginas
- Controle de usuários ativos/inativos
- Perfis de usuário (Gerente, Operador, etc.)

### Fluxo de Fechamento
1. **Tela 1 - Dados Externos**: Relatórios, depósitos, PIX, troco, dívidas
2. **Tela 2 - Operações**: Raspadinhas, Telesena, Federais
3. **Tela 3 - Bolões**: Internos e Externos
4. **Tela 4 - Resumo**: Cálculo de quebra e finalização

### Recursos Adicionais
- Cálculo automático de totais e quebras
- Validação de campos obrigatórios
- Navegação entre telas com persistência de dados
- Gravação com identificação do usuário responsável
- Design moderno com tema escuro
- Totalmente responsivo

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Google Apps Script
- **Armazenamento**: Google Sheets
- **Autenticação**: Token-based (Cache do Apps Script)

## 📥 Instalação

### Pré-requisitos

- Conta Google
- Acesso ao Google Sheets
- Acesso ao Google Apps Script
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/sislot.git
cd sislot
```

2. **Configure o Google Apps Script**
   - Acesse https://script.google.com
   - Crie um novo projeto
   - Cole o código do arquivo `Code-v2.gs`
   - Siga as instruções em [docs/README-CONFIGURACAO.md](docs/README-CONFIGURACAO.md)

3. **Configure as planilhas**
   - Crie uma planilha de usuários (veja estrutura abaixo)
   - Configure os IDs no `Code-v2.gs`

4. **Configure o frontend**
   - Edite `backend-auth.js` (linha 7) com a URL do Apps Script
   - Edite `login.html` (linha 177) com a URL do Apps Script

5. **Pronto!** Abra `login.html` no navegador

## ⚙️ Configuração

### Estrutura da Planilha de Usuários

Crie uma planilha com a aba "Usuarios" contendo:

| login   | senha  | nome          | perfil   | ativo |
|---------|--------|---------------|----------|-------|
| gil     | 123456 | Gil Santos    | Gerente  | SIM   |
| lorrane | abc123 | Lorrane Silva | Operador | SIM   |

### Configuração do Backend

No arquivo `Code-v2.gs`, configure:

```javascript
const CFG = {
  mestraId: 'ID_DA_PLANILHA_FECHAMENTOS',
  controleId: 'ID_DA_PLANILHA_USUARIOS',
  abaUsuarios: 'Usuarios',
  sessoesTtlMin: 720  // 12 horas
};
```

### URLs do Backend

Configure em **dois lugares**:

1. `backend-auth.js` (linha 7)
2. `login.html` (linha 177)

```javascript
const BACKEND_URL = 'https://script.google.com/macros/s/SEU_ID/exec';
```

## 📖 Uso

### Login
1. Acesse `login.html`
2. Entre com usuário e senha cadastrados
3. Será redirecionado para a Tela 1

### Fechamento
1. **Tela 1**: Preencha dados externos (relatórios, depósitos, etc.)
2. **Tela 2**: Registre operações (raspadinhas, federais, etc.)
3. **Tela 3**: Informe bolões internos e externos
4. **Tela 4**: Revise o resumo e finalize

### Logout
Clique no botão "Sair" no canto superior direito

## 📁 Estrutura do Projeto

```
sislot/
├── login.html                              # Tela de login
├── backend-auth.js                         # Sistema de autenticação
├── config-loterias.js                      # Configuração das lotéricas
├── viabrasil-tela1.html                   # Tela 1 - Dados Externos
├── viabrasil-tela2.html                   # Tela 2 - Operações
├── viabrasil-tela3.html                   # Tela 3 - Bolões
├── viabrasil-tela4.html                   # Tela 4 - Resumo
├── Code-v2.gs                             # Backend (Google Apps Script)
├── viabrasil-tela1-exemplo-completo.html  # Exemplo de tela modificada
├── README.md                              # Este arquivo
├── LICENSE                                # Licença do projeto
└── docs/
    ├── INDEX-PACOTE.md                    # Índice da documentação
    ├── README-CONFIGURACAO.md             # Manual completo
    ├── GUIA-RAPIDO-MODIFICACOES.md       # Guia de modificações
    └── CHECKLIST-IMPLEMENTACAO.md         # Checklist de implementação
```

## 📚 Documentação

A documentação completa está disponível na pasta `docs/`:

- **[INDEX-PACOTE.md](docs/INDEX-PACOTE.md)**: Índice e visão geral
- **[README-CONFIGURACAO.md](docs/README-CONFIGURACAO.md)**: Manual detalhado
- **[GUIA-RAPIDO-MODIFICACOES.md](docs/GUIA-RAPIDO-MODIFICACOES.md)**: Guia prático
- **[CHECKLIST-IMPLEMENTACAO.md](docs/CHECKLIST-IMPLEMENTACAO.md)**: Lista de verificação

### Início Rápido

1. Leia [INDEX-PACOTE.md](docs/INDEX-PACOTE.md)
2. Siga [README-CONFIGURACAO.md](docs/README-CONFIGURACAO.md)
3. Use [CHECKLIST-IMPLEMENTACAO.md](docs/CHECKLIST-IMPLEMENTACAO.md)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/sislot/issues) com:
- Descrição do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Desenvolvimento Inicial** - Sistema de fechamento de caixa
- **Contribuidor** - Sistema de autenticação e integração

## 🙏 Agradecimentos

- Comunidade de desenvolvedores
- Google Apps Script
- Todos os contribuidores

## 📞 Suporte

- 📧 Email: suporte@seudominio.com
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/sislot/issues)
- 📖 Wiki: [Documentação Completa](docs/)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!

**Versão:** 1.0  
**Última Atualização:** Março 2026  
**Status:** ✅ Ativo e em manutenção
