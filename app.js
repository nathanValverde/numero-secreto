/*
>>>>>>>>> Jogo do número secreto interagindo com a tela HTML <<<<<<<<<<<<<<<
*/

/*--------------------------------------------------------------------------------------------------------------
>>>>>>>>>>>> Código inicial antes de criar funções para otimizar

// função document.querySelector('[tag do HTML que eu quero]') seleciona uma tag específica no HTML
// No caso usa-se o h1 pois ele é a tag responsável pelo título da página no HTML 

let titulo = document.querySelector('h1');

// função [var].innerHTML coloca o valor da variável na tag selecionada

titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
--------------------------------------------------------------------------------------------------------------*/

let listaDeNumerosSorteados = [];
let limiteNumeros = 10;
let chute
let tentativas = 1;
let numeroSecreto = gerarNumAleatorio();
console.log(numeroSecreto);

//Função criada para padronizar o código de modificar o texto de uma tag no HTML
// var [campo] criada genericamente para a função
// Os valores da tag e texto serão substituídos quando a função for chamada futuramente
function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Ativar a narração de voz que foi configurada em HTML no script "responsivevoice.org"
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Função que exibe os textos iniciais do jogo
function textoInicial(){
    exibirTextoNaTela ('h1', 'Jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número entre 1 e 10');
}

// Executa a função antes de tudo
textoInicial();

// Função gera e retorna um número aleatório
function gerarNumAleatorio(){
    // return retorna o valor após a função ser executada
    let numeroGerado = parseInt(Math.random() * limiteNumeros + 1);
    let limiteLista = listaDeNumerosSorteados.length;

    if(limiteLista == limiteNumeros){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroGerado)){
        return gerarNumAleatorio();
    } else {
        // Adiciona número gerado ao final da lista
        listaDeNumerosSorteados.push(numeroGerado);
        return numeroGerado;
    }
}

// Função para limpar o campo que o usuário digita após ele apertar o botão de chutar
function limparCampo(){
    //uso a mesma var criada anteriormente
    chute = document.querySelector('input');
    //Escrevo vazio no valor do campo [por isso .value]
    chute.value = '';
}

// Função para resetar todos os parâmetros e textos
function reiniciarJogo(){
    // Reabilita Botão de 'chute'
    document.getElementById('chute').removeAttribute('disabled');
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    textoInicial();
    tentativas = 1;
    // Reinicia o status do botão 'Novo Jogo' para desabilitado
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Função criada para ser executada quando o botão chute do HTML for clicado
function verificarChute(){
    //recebe valor informado pelo usuário no campo input do HTML e isola o valor numérico com .value
    chute = document.querySelector('input').value;
    console.log(listaDeNumerosSorteados);
    if (chute == numeroSecreto){
        //Seto um atributo de desabilitado no HTML para o botão de chute quando acertar o número secreto
        document.getElementById('chute').setAttribute('disabled', true);
        exibirTextoNaTela('h1', 'ACERTOOOU!!');
        // texto plural ou singular
        let textoTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        // para textos com variáveis ${[var]} deixar separado em uma variável dedicada e informar essa variável para futuras funções
        let textoAcerto = `O número secreto era ${numeroSecreto} e você fez ${tentativas} ${textoTentativa}`
        // Usa o texto pronto da variável para atribuí-lo a função
        exibirTextoNaTela('p', textoAcerto);
        //Habilitar o botão de 'Novo Jogo' que possui o ID único 'reiniciar' e removo o atributo 'disabled' do HTML
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        }else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
} 


