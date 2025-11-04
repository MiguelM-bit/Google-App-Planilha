function doGet(e) {
  // Verifica se o parâmetro 'page' foi passado na URL
  const page = e.parameter.page || 'dashboard';
  
  if (page === 'config' || page === 'configurator') {
    return HtmlService.createHtmlOutputFromFile('Configurator')
        .setTitle('Configurador do Dashboard')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  // Por padrão, retorna o dashboard
  return HtmlService.createHtmlOutputFromFile('Dashboard')
      .setTitle('Dashboard de Logística')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getSheetData() {
  try {
    // Força a abertura da planilha pelo ID para garantir o escopo de permissão correto.
    const ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
    const sheet = ss.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Se não houver dados, retorna um array vazio para evitar erros no lado do cliente.
    if (!data) {
      return [];
    }
    
    // Converte objetos de data para strings ISO para evitar problemas com JSON.
    // O Apps Script trata datas/horas da planilha como objetos Date do JavaScript.
    return data.map(row => 
      row.map(cell => {
        if (cell instanceof Date) {
          // Formata a data para um padrão consistente que o JavaScript no cliente pode usar.
          return Utilities.formatDate(cell, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
        }
        return cell;
      })
    );
  } catch (e) {
    // Se houver um erro, registre-o para depuração no Apps Script.
    Logger.log('Erro em getSheetData: ' + e.toString());
    // Retorna um erro que pode ser tratado no lado do cliente.
    throw new Error('Falha ao ler os dados da planilha. Verifique as permissões e os logs do script. Erro: ' + e.toString());
  }
}

// ===== FUNÇÕES DO CONFIGURADOR =====

/**
 * Retorna os cabeçalhos (headers) da planilha ativa
 */
function getSheetHeaders() {
  try {
    const ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
    const sheet = ss.getActiveSheet();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    return headers.map(h => String(h).trim()).filter(h => h !== '');
  } catch (e) {
    Logger.log('Erro em getSheetHeaders: ' + e.toString());
    throw new Error('Falha ao ler cabeçalhos da planilha: ' + e.toString());
  }
}

/**
 * Salva a configuração do usuário usando Properties Service
 */
function saveConfiguration(configJson) {
  try {
    const properties = PropertiesService.getUserProperties();
    properties.setProperty('DASHBOARD_CONFIG', configJson);
    
    // Também salva em ScriptProperties como backup
    PropertiesService.getScriptProperties().setProperty('DASHBOARD_CONFIG_BACKUP', configJson);
    
    Logger.log('Configuração salva com sucesso');
    return true;
  } catch (e) {
    Logger.log('Erro ao salvar configuração: ' + e.toString());
    throw new Error('Falha ao salvar configuração: ' + e.toString());
  }
}

/**
 * Carrega a configuração salva do usuário
 */
function loadConfiguration() {
  try {
    const properties = PropertiesService.getUserProperties();
    let config = properties.getProperty('DASHBOARD_CONFIG');
    
    // Se não encontrar nas properties do usuário, tenta o backup
    if (!config) {
      config = PropertiesService.getScriptProperties().getProperty('DASHBOARD_CONFIG_BACKUP');
    }
    
    return config;
  } catch (e) {
    Logger.log('Erro ao carregar configuração: ' + e.toString());
    throw new Error('Falha ao carregar configuração: ' + e.toString());
  }
}

/**
 * Gera um dashboard customizado baseado na configuração
 */
function generateCustomDashboard(configJson) {
  try {
    // Salva a configuração
    saveConfiguration(configJson);
    
    // Retorna a URL do dashboard (mesmo endpoint, mas o Dashboard.html vai ler a config)
    const url = ScriptApp.getService().getUrl();
    
    Logger.log('Dashboard customizado gerado. URL: ' + url);
    return url;
  } catch (e) {
    Logger.log('Erro ao gerar dashboard customizado: ' + e.toString());
    throw new Error('Falha ao gerar dashboard: ' + e.toString());
  }
}
