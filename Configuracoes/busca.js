//A cada evento, percorre as postagens e separa handles em um vetor.
//A primeira atualização ocorre após 5 segundos
var postagens;
var handles;
var analisesTerminadas = {};

//Atualiza a Página
function mudancasNaPagina(handle, indice, chanceDeSerBot)
{
    //console.log(`---\nUsuário em Análise: ${handle}\nChance de ser bot: ${chanceDeSerBot}\n---`);
    //O que fazer na página dependendo do resultado
    if (chanceDeSerBot >= 0.9 && !document.querySelectorAll('article')[indice].querySelector(".extPegaBot")) {
        //Ocultar tweet
        document.querySelectorAll('article')[indice].querySelector('span').style.display = 'none';

    }
    else if (chanceDeSerBot >= 0.6 && !document.querySelectorAll('article')[indice].querySelector(".extPegaBot")) {
        //Probabilidade Alta
        document.querySelectorAll('article')[indice].querySelector('span').style.color = 'red';
        document.querySelectorAll('article')[indice].querySelector('span').innerHTML += '<div class="extPegaBot">' + Math.round(chanceDeSerBot * 100) + '% de chance de ser bot (probabilidade alta)</div>';
    }
    else if (!document.querySelectorAll('article')[indice].querySelector(".extPegaBot")) {
        //Probabilidade Baixa
        document.querySelectorAll('article')[indice].querySelector('span').style.color = 'green';
        document.querySelectorAll('article')[indice].querySelector('span').innerHTML += '<div class="extPegaBot">' + Math.round(chanceDeSerBot * 100) + '% de chance de ser bot (probabilidade baixa)</div>';
    }
}

//Encontra handles e decide se é necessária uma nova solicitação ou não
function handlers()
{
    var postagens = Array.from(document.querySelectorAll('article'));
    handles = postagens.map((postagem) =>
    {
        var handle = [...postagem.innerHTML.match(`\@.*?<`).join('')];
        return handle.slice(0, handle.length - 1).join('');
    });

    //Para cada handle, analisa, por meio do Pegabot, se a conta é um bot ou não.
    handles.forEach((handle, indice) =>
    {
        //Caso a análise de uma conta já não tenha sido feita
        if (!document.querySelectorAll('article')[indice].querySelector(".extPegaBot")) {

            //Há uma resposta (probabilidade) registrada para isso?
            if (!analisesTerminadas.hasOwnProperty(handle)) {
                //Se não, procurar:
                fetch(`https://backend.pegabot.com.br/botometer?socialnetwork=twitter&profile=${handle}&search_for=profile&limit=12`)
                    .then((retorno) => retorno.json()).then((info) => {
                        var chanceDeSerBot = info.profiles[0].bot_probability.all;
                        mudancasNaPagina(handle, indice, chanceDeSerBot);
                        analisesTerminadas[handle] = chanceDeSerBot; //Registrando probabilidade
                    });
            }
            else
            {
                mudancasNaPagina(handle, indice, analisesTerminadas[handle]);
            }
        }
    });
}

console.log("\n\nExtensão PegaBot em Execução\n\n");
var updating = setInterval(handlers, 5000);
