// ══════════════════════════════════════════════════════════════════
// config-loterias.js
// Configuração das 5 loterias — cada arquivo HTML mapeia para
// uma Planilha Mestra diferente via window.LOTERIA_ID
// ══════════════════════════════════════════════════════════════════

// Mapa: chave de detecção → configuração da loteria
// A chave deve estar contida no nome do arquivo HTML
const LOTERIAS_CONFIG = {
  'viabrasil': {
  nome: 'Via Brasil',
  sheetId: '1kJQaIHZ76xKcuv2USGhodXGB1jBorNoR3b5oOxzUhmA',
  controleId: '1DEQz5QEhytc_b_rCK4RuoANK2iBcb6w5dUTjHR64evk',
  abaExternos: 'D.Centro',
  funcionarios: ['Gil', 'Lorrane', 'Felipe', 'Roberta'],
},
  'loteria2': {
    nome:    'Loteria 2',
    sheetId: 'ID_PLANILHA_MESTRA_LOTERIA_2',
  },
  'loteria3': {
    nome:    'Loteria 3',
    sheetId: 'ID_PLANILHA_MESTRA_LOTERIA_3',
  },
  'loteria4': {
    nome:    'Loteria 4',
    sheetId: 'ID_PLANILHA_MESTRA_LOTERIA_4',
  },
  'loteria5': {
    nome:    'Loteria 5',
    sheetId: 'ID_PLANILHA_MESTRA_LOTERIA_5',
  },
};

// Detecta a loteria ativa pelo nome do arquivo HTML atual
// Remove hífens e underscores para comparação flexível
// Ex: "fechamento-via-brasil-tela1.html" → "viabrasil" → match
function detectarLoteria() {
  const arquivo = window.location.pathname
    .split('/').pop()
    .replace('.html', '')
    .replace(/[-_]/g, '')   // remove hífens e underscores
    .toLowerCase();

  for (const key of Object.keys(LOTERIAS_CONFIG)) {
    if (arquivo.includes(key.toLowerCase())) return key;
  }
  return null;
}

function getLoteria() {
  const key = detectarLoteria();
  if (!key) return null;
  return { key, ...LOTERIAS_CONFIG[key] };
}

// ══════════════════════════════════════════════════════════════════
// NOMES DAS ABAS POR FUNCIONÁRIO
// ══════════════════════════════════════════════════════════════════
// Cada funcionário tem 4 abas na planilha:
//   "{nome} - Gerais"
//   "{nome} - Produtos"
//   "{nome} - Boloes Internos"
//   "{nome} - Boloes Externos"

function nomesAbas(funcionario) {
  return {
    gerais:          `${funcionario} - Gerais`,
    produtos:        `${funcionario} - Produtos`,
    boloesInternos:  `${funcionario} - Boloes Internos`,
    boloesExternos:  `${funcionario} - Boloes Externos`,
  };
}

// ══════════════════════════════════════════════════════════════════
// CABEÇALHOS DAS ABAS
// ══════════════════════════════════════════════════════════════════

const CABECALHOS = {

  gerais: [
    'Data', 'Troco Inicial', 'Relatório Diário', 'Depósito Bancário',
    'PIX CNPJ', 'Diferença PIX', 'Troco Sobra', 'Prêmio Raspadinha',
    'Resgate Telesena', 'Dívidas Clientes',
    'Total Débitos', 'Total Créditos', 'Quebra', 'Justificativa',
  ],

  produtos: [
    'Data',
    'Rasp R$2,50 Qtd', 'Rasp R$2,50 Val',
    'Rasp R$5,00 Qtd', 'Rasp R$5,00 Val',
    'Rasp R$10,00 Qtd', 'Rasp R$10,00 Val',
    'Rasp R$20,00 Qtd', 'Rasp R$20,00 Val',
    'Total Raspadinha',
    'Tele Preço', 'Tele Qtd', 'Tele Val',
    // Federais: colunas dinâmicas adicionadas na hora (Fed1 Concurso, Fed1 Qtd, Fed1 Val, ...)
    // As colunas de federal são prefixadas com o número do federal
  ],

  // Bolões Internos e Externos têm o mesmo layout
  boloes: [
    'Data', 'Tipo', 'KEY', 'Origem', 'Modalidade',
    'Concurso', 'Valor Cota', 'Qtd Vendida', 'Subtotal',
  ],
};
