# Instruções para Configuração do Dashboard de Logística no Google Sheets

Siga estas instruções para configurar e utilizar o dashboard de logística com o Google Apps Script.

## Passo 1: Prepare sua Planilha Google

1.  **Crie ou Abra uma Planilha Google:** Faça login na sua conta Google e crie uma nova planilha ou abra uma existente.
2.  **Importe os Dados:** Copie e cole os dados da sua planilha de logística para a primeira aba da sua Planilha Google. A primeira linha deve conter os cabeçalhos das colunas (SHIPMENT, NUMERO DA SM, DIA, etc.).
3.  **Verifique os Cabeçalhos:** Certifique-se de que os nomes das colunas usadas pelo dashboard (`Horário da coleta`, `Horário da entrega`, `UF`, `Coleta 1`, `MODALIDADE`, `DIA`) existem e estão escritos corretamente.

## Passo 2: Abra o Editor do Google Apps Script

1.  Com a sua planilha aberta, vá em `Extensões` > `Apps Script`.
2.  Isso abrirá o editor de scripts em uma nova aba do seu navegador.

## Passo 3: Crie os Arquivos do Script

Você precisará de dois arquivos no seu projeto do Apps Script: `Code.gs` e `Dashboard.html`.

### Arquivo 1: `Code.gs` (Arquivo de Script)

1.  Por padrão, um arquivo chamado `Code.gs` já deve existir. Se não, crie um novo arquivo de script (`+` > `Script`) e renomeie-o para `Code.gs`.
2.  Apague todo o conteúdo existente e cole o código `Code.gs` fornecido.

### Arquivo 2: `Dashboard.html` (Arquivo HTML)

1.  No editor do Apps Script, clique em `+` (Adicionar um arquivo) e selecione `HTML`.
2.  Dê ao arquivo o nome de `Dashboard` e clique em "OK".
3.  Apague todo o conteúdo padrão e cole o código `Dashboard.html` fornecido.

## Passo 4: Salve e Execute o Projeto

1.  **Salve o Projeto:** Clique no ícone de disquete (Salvar projeto).
2.  **Execute uma Função para Autorizar:**
    *   Na barra de ferramentas, selecione a função `getSheetData` no menu suspenso.
    *   Clique em `Executar`.
3.  **Autorização:**
    *   Na primeira vez, o Google solicitará sua autorização. Clique em `Revisar permissões`.
    *   Escolha sua conta do Google.
    *   Pode aparecer um aviso de "Aplicativo não verificado". Clique em `Avançado` e depois em `Acessar <Nome do seu projeto> (não seguro)`.
    *   Clique em `Permitir`.

## Passo 5: Implante o Script como um Aplicativo Web

1.  Clique em `Implantar` no canto superior direito e selecione `Nova implantação`.
2.  Clique no ícone de engrenagem (`Selecionar tipo`) e escolha `App da Web`.
3.  Nas configurações de implantação:
    *   **Descrição:** Adicione uma descrição (ex: "Dashboard de Logística v2").
    *   **Executar como:** Deixe como `Eu (seu.email@gmail.com)`.
    *   **Quem pode acessar:** Selecione `Qualquer pessoa com uma conta do Google` ou `Qualquer pessoa`.
4.  Clique em `Implantar`.
5.  Copie a URL do aplicativo da web fornecida.

## Passo 6: Acesse seu Dashboard

1.  Cole a URL copiada em uma nova aba do seu navegador.
2.  O dashboard será carregado. Sempre que os dados na planilha forem atualizados, basta recarregar a página do dashboard.
3.  **Importante:** Se você fizer alterações no código (`.gs` ou `.html`), você precisa fazer uma **nova implantação** para que as mudanças apareçam online. Vá em `Implantar` > `Gerenciar implantações`, selecione sua implantação, clique em `Editar` (lápis) e escolha `Nova versão` no menu `Versão`.

---

## Passo 7: Manutenção e Customização do Dashboard

Toda a lógica visual e de processamento de dados do dashboard está no arquivo `Dashboard.html`.

### 1. Alterar Títulos e Textos

*   **Título Principal:** Encontre a tag `<h1>` no `<body>` e edite o texto.
    ```html
    <h1>Dashboard de Gestão Logística</h1>
    ```
*   **Rótulos dos KPIs:** Encontre a seção `kpi-container` e edite os textos dentro das divs com a classe `label`.
    ```html
    <div class="label">Total de Viagens</div>
    ```

### 2. Editar um Gráfico Existente

Cada gráfico tem sua própria função `draw...Chart()`, por exemplo, `drawMapChart()`.

1.  **Localize a Função:** Encontre a função do gráfico que deseja alterar (ex: `drawModalityChart`).
2.  **Altere as Opções:** Dentro da função, há um objeto `options`. Você pode alterar o `title`, `colors`, `pieHole`, etc.

    ```javascript
    // Exemplo: Editando o gráfico de Modalidade
    function drawModalityChart(modalityCounts) {
        // ... código de preparação dos dados ...

        const options = {
            title: 'Modalidades de Transporte Utilizadas', // Título alterado
            pieHole: 0.5, // Aumenta o buraco no meio
            colors: ['#ffc107', '#dc3545', '#007bff', '#28a745'], // Novas cores
            // ... outras opções ...
        };
        const chart = new google.visualization.PieChart(document.getElementById('modality_chart_div'));
        chart.draw(chartData, options);
    }
    ```

### 3. Adicionar um Novo Gráfico

Vamos adicionar um gráfico de pizza que mostra a contagem de entregas por `Origem 1`.

1.  **Adicione o Contêiner no HTML:** No `<body>`, dentro de `dashboard-container`, adicione uma nova `div` com um `id` único.
    ```html
    <div class="dashboard-container">
        <!-- ... outros gráficos ... -->
        <div class="chart-container" id="origin_chart_div"></div>
    </div>
    ```

2.  **Crie a Função JavaScript:** Adicione uma nova função `drawOriginChart` no `<script>`.
    ```javascript
    function drawOriginChart(data, originIndex) {
        const originCounts = data.reduce((acc, row) => {
            const origin = row[originIndex] || 'N/A';
            acc[origin] = (acc[origin] || 0) + 1;
            return acc;
        }, {});

        const chartData = new google.visualization.DataTable();
        chartData.addColumn('string', 'Origem');
        chartData.addColumn('number', 'Viagens');
        chartData.addRows(Object.entries(originCounts));

        const options = {
            title: 'Viagens por Origem',
            is3D: true, // Um toque diferente
        };

        const chart = new google.visualization.PieChart(document.getElementById('origin_chart_div'));
        chart.draw(chartData, options);
    }
    ```

3.  **Chame a Nova Função:** Dentro da função `processData`, adicione o índice da nova coluna e chame sua nova função.
    ```javascript
    function processData(rawData) {
        // ...
        const header = rawData.shift().map(h => String(h).trim());
        
        const indices = {
            // ... outros índices ...
            origem: header.indexOf('Origem 1') // Novo índice
        };

        // ...
        
        // --- Desenhar Componentes ---
        // ... chamadas de outros gráficos ...
        drawOriginChart(data, indices.origem); // Chame a nova função
    }
    ```

### 4. Remover um Gráfico

1.  **Remova a Chamada da Função:** Em `processData`, delete a linha que chama a função do gráfico (ex: `drawModalityChart(...)`).
2.  **Remova a Função do Gráfico:** Delete toda a função `drawModalityChart()`.
