# Extensão para Navegador Pegabot

![Maintained? yes](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![Ask me anything](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

Neste repositório encontra-se a extensão para navegadores do Pegabot.

## Aviso
As primeiras modificações (commits) enviados pelo grupo 2C estão em [outro repositório](https://github.com/edujpmouta/challenge).  
Lá, é possível ver o andamento da formulação da extensão.  
  
Equipe 2C (Botinux):
+ Guilherme Rodrigues (desenvolvimento)
+ Eduardo Mouta (desenvolvimento)
+ Beatriz Karoline (design)
+ Jade Simões (design)

## Funcionalidades
Essa extensão foi elaborada para a Hackathon ITS - Pegabot, e tem como principal objetivo  
utilizar da ferramenta de identificação de bots para lutar contra a fake news e detecctar atividades suspeitas.  
Para isso, a Extensão de Navegador Pegabot
+ Em comunicação com a API do Pegabot, calcula a probabilidade de cada usuário em uma página do Twitter ser um robô,  
emitindo alertas ao longo da página, à medida que processa as informações.
+ Disponibiliza uma janela pop-up, que recebe como dado um nome de usuário e abre a página do Pegabot, já calculando uma análise mais aprofundanda.


## Instruções para Rodar Extensão (Chrome)
1. Aperte no botão "Code';
2. Clique em Download ZIP;
3. Vai ser baixado arquivo "Extensao-Navegador-main";
4. Extraia a pasta do arquivo ZIP instalado;
5. Abra o navegador;
6. Busque o ícone ou botão de extensões;
7. Clique em "Gerenciar Extensões";
8. Ative "Modo Desenvolvedor";
9. Clicque em "Carregar Sem Compactação";
10. Clique na pasta recém-extraída "Extensao-Navegador-main";
11. Clique na pasta "Configuracoes";
12. A extensão será instalada e estará pronta para uso.

## Background

O objetivo dessa extensão é permitir analisar um perfil de usuário do Twitter sem a necessidade de sair da página onde estiver. Se você vir o @ de um perfil em algum site, basta deixar a extensão aberta e ela realizará uma análise chamando um endpoint da API do Pegabot.

## Código de Conduta

Observe nosso nosso [Código de Conduta](./CODE_OF_CONDUCT.md) na hora de realizar interações aqui no repositório. O objetivo é promover um espaço saudável de desenvolvimento.

## Contribuindo

Encorajamos todos os interessados a contribuírem para o projeto. Se você quiser mais informações, acesse [contribuindo para o projeto](/CONTRIBUTING.md) para entender como você pode contribuir.

## Versão

O Projeto será mantido sob as diretrizes de versão semântica, tanto quanto possível. Os lançamentos serão numerados com o seguinte formato:

`<major>.<minor>.<patch>`

Para obter mais informações sobre SemVer, visite http://semver.org.

## Licença

Este projeto é gratuito e de código aberto. Você pode usá-lo para projetos comerciais, projetos de código aberto ou praticamente o que você quiser. No entanto, você deve disponibilizar o código fonte de qualquer biblioteca que utilize código fonte disponibilizado nesse repositório. Você pode ver [aqui](/LICENSE) qual é a Licensa utilizada no projeto. Para uma explicação simples e em português dessa licensa, acesse esse [site](http://escolhaumalicenca.com.br/licencas/lgpl-v3/#).


## Agradecimentos

A versão inicial desse repositório foi desenvolvida por **[@otaviouss](https://github.com/otaviouss)**.


