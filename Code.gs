function doGet() {
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
