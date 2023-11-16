// Selecionando o elemento 'busca' e adicionando um escutador com o atributo 'submit'que se refere ao formulário. Após isso, chamo uma função com um parametro para prevenir o comportamento padrão do formulário com a função 'preventDefault'.
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    // value é o método que pega os valores digitados no input.
    let input = document.querySelector('#searchInput').value;
    
    // Se o input for diferente de vazio
    if(input !== ''){
        // Chamando a função clearInfo para limpar a tela.
        clearInfo();
        // Chamando a função showWarning com a mensagem 'Carregando...'
        showWarning('Carregando...');

        // URL da API que será feito a requisição. Nessa URL é colocado o valor que o usuário passou no 'input'. Precisamos usar a função 'encodeURI' para transformar o valor do input numa string que o navegador consiga ler por causa de espaços e caracteres especiais que possam existir.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b377ffce812b311f84995a8b6c089a70&units=metric&lang=pt_br`

        // O resultado da requisição feita na URL será armazenada na variável results
        let results = await fetch(url);
        // O resultado é transformado num objeto json e armazenado na variável json.
        let json = await results.json();

        // Se o código do resultado for 200...
        if(json.cod === 200){
            // Quando for acionada, chama a função showWarning e não exibe nenhum mensagem.
            showWarning('');

            // Selecionando os elementos e adicionando os valores obtidos no resultado da requisição.
            document.querySelector('.titulo').innerHTML = `${json.name}, ${json.sys.country}`;
            document.querySelector('.tempInfo').innerHTML = `${Math.floor(json.main.temp)} <sup>ºC</sup>`;

            document.querySelector('.ventoInfo').innerHTML = `${json.wind.speed} <span>km/h</span>`;

            document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.deg - 90}deg)`;

            document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);

            // Seleciona o elemento que mostrará os resultados e muda o display para 'block'
            document.querySelector('.resultado').style.display = 'block';
        
        } else { // Se não for 200...
            // Limpa a tela com a função clearInfo e exibe a mensagem com a função ShowWarning.
            clearInfo();
            showWarning('Não conseguimos encontrar essa localização...');
            }
        }
});

// Essa função vai esconder o elemento que exibe os resultados alterando o display pra 'none' e em seguindo chama a função showWarning com a mensagem 'Carregando...'.
function clearInfo(){
    document.querySelector('.resultado').style.display = 'none';
    showWarning('Carregando...');
}

// Essa função vai exibir na tela qualquer mensagem que for atribuida ao parametro.
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}