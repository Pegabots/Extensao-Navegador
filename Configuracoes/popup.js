document.getElementById('carregar').addEventListener('click', () => {
    let url = document.querySelector('#pessoa').value;
    console.log(url);
    if ([...url][0] == '@') { let urlNova = [...url]; urlNova.shift(); url = urlNova.join(''); }
    document.querySelector('#url').href = `https://pegabot.com.br/resultados?socialnetwork=twitter&profile=${url}&search_for=profile&limit=12`;
    document.querySelector('#url').click();
})
