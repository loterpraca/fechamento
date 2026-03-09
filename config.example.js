// ══════════════════════════════════════════════════════════════════
// config.example.js
// ARQUIVO DE EXEMPLO - Copie para config.local.js e configure
// ══════════════════════════════════════════════════════════════════

// IMPORTANTE: Após clonar o repositório:
// 1. Copie este arquivo: cp config.example.js config.local.js
// 2. Configure suas URLs e IDs no config.local.js
// 3. O arquivo config.local.js está no .gitignore e não será commitado

const CONFIG_EXAMPLE = {
  
  // URL do seu Google Apps Script (após fazer deploy)
  // Encontre em: Apps Script > Implantar > Gerenciar implantações
  BACKEND_URL: 'https://script.google.com/macros/s/SEU_ID_AQUI/exec',
  
  // ID da planilha onde os fechamentos serão gravados
  // Encontre na URL: https://docs.google.com/spreadsheets/d/ID_AQUI/edit
  PLANILHA_FECHAMENTOS_ID: 'SEU_ID_DA_PLANILHA_FECHAMENTOS',
  
  // ID da planilha onde ficam os usuários cadastrados
  PLANILHA_USUARIOS_ID: 'SEU_ID_DA_PLANILHA_USUARIOS',
  
  // Nome da aba onde estão os usuários (padrão: "Usuarios")
  ABA_USUARIOS: 'Usuarios',
  
  // Tempo de duração da sessão em minutos (padrão: 720 = 12 horas)
  SESSAO_DURACAO_MIN: 720,
  
  // Ambiente (development ou production)
  AMBIENTE: 'development',
  
  // Habilitar logs detalhados no console
  DEBUG_MODE: true,
  
};

// Exemplo de estrutura da planilha de usuários:
// 
// | login   | senha  | nome          | perfil   | ativo |
// |---------|--------|---------------|----------|-------|
// | gil     | 123456 | Gil Santos    | Gerente  | SIM   |
// | lorrane | abc123 | Lorrane Silva | Operador | SIM   |
//
// Certifique-se de que:
// 1. A primeira linha contém os cabeçalhos exatamente como acima
// 2. A coluna "ativo" deve conter "SIM" ou "NÃO" (sem acentos)
// 3. Todos os campos são obrigatórios

// ══════════════════════════════════════════════════════════════════
// INSTRUÇÕES PARA CONFIGURAÇÃO
// ══════════════════════════════════════════════════════════════════

/*

PASSO 1: CONFIGURAR GOOGLE APPS SCRIPT
---------------------------------------
1. Acesse https://script.google.com
2. Crie novo projeto
3. Cole o código do arquivo Code-v2.gs
4. Configure os IDs das planilhas no código
5. Implantar > Nova implantação > Web app
6. Copie a URL de implantação

PASSO 2: CONFIGURAR PLANILHAS
------------------------------
1. Crie uma planilha para usuários
2. Crie aba "Usuarios" com as colunas listadas acima
3. Adicione pelo menos um usuário de teste
4. Copie o ID da planilha (da URL)

PASSO 3: CONFIGURAR FRONTEND
-----------------------------
1. Copie este arquivo: cp config.example.js config.local.js
2. Edite config.local.js com suas configurações
3. Ou configure diretamente em:
   - backend-auth.js (linha 7)
   - login.html (linha 177)

PASSO 4: TESTAR
---------------
1. Abra login.html no navegador
2. Faça login com um usuário cadastrado
3. Teste o fluxo completo

Para mais detalhes, consulte:
- docs/README-CONFIGURACAO.md
- docs/CHECKLIST-IMPLEMENTACAO.md

*/
