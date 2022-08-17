# VR-Software

![logo vr-software](https://www.vrsoft.com.br/storage/settings/May2021/lZA5eprMiWbhXfVBCF39.png)

##
Tabela de conteúdos
=================

   * [Pontos cumpridos do desafio](#pontos-cumpridos-do-desafio)
   * [Setup do Projeto](#setup-do-projeto)
      - [Backend](#backend)
      - [Gateway](#gateway)
      - [Frontend](#frontend)
   * [Arquitetura do sistema](#arquitetura-do-sistema) 


# Pontos cumpridos do desafio:
- [x] Deverá conter uma UI de consulta de aluno, e outra para curso;
- [x] Será possível a edição do nome do aluno, e descrição e ementa do curso, cada uma em sua respectiva UI;
- [x] Deverá conter uma UI para realizar o cadastro de um aluno em um ou mais cursos;
- [x] Criar a impressão de cada uma das telas de consulta;
- [x] Implementar o backend responsável pela entrada e saída de dados do frontend
- [x] Implementar um gateway entre o frontend e o backend
- [x] A criação do banco de dados deverá ser automática;
- [ ] Implementar um serviço de stream (fila) entre o frontend e o backend
- [x] Desenhar a arquitetura de toda a aplicação;
- [x] Subir os códigos fontes para uma ferramenta de versionamento (GitLab, GitHub, BitBucket)

##


# Setup do Projeto

O projeto foi divido em 3 componentes principais: o Backend responsável por processar toda a lógica de criação de usuário e cursos. Frontend que é a interface que permite o usuário possa criar alunos e cursos e também consulta-los. É o Gateway  faz parte do sistema de gerenciamento da API. O projeto deve funcionar independente do editor de texto usado, mas eu recomento utilizar o  [Visual Studio Code](https://code.visualstudio.com/download)


### Backend
A implementação é uma API REST simples que necessita realizar as instalações das seguintes ferramentas para funcionar:
 - [**NodeJS**](https://nodejs.org/en/download/): Ambiente de execução JavaScript server-side.
 - [**NestJS**](https://docs.nestjs.com/first-steps): Framework NodeJS para aplicações escaláveis.
 - [**TypeScript**](https://www.typescriptlang.org/download): Adiciona tipagem ao JavaScript, permitindo ter um código mais organizado e legível.
 - [**Docker**](https://docs.docker.com/engine/install/ubuntu/): será utilizado um container rodando um banco postgres para ser nossa base de dados.
 - [**Yarn**](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable): gerenciador de pacote utilizado no projeto, porque não npm? Porque os dois funcionam de forma semelhante, no entanto o **Yarn** tem uma sintaxe mais inchuta.
 
Após realizar instalar todas as ferramentas execute os seguintes passos:   
 - Dentro da pasta do repositório execute: ```npm install ou yarn ```
 - Crie um container postgres: ```docker run --name vr-software-db -e POSTGRES_DB=vr-software -e POSTGRES_PASSWORD=teste123 -p 5432:5432 -d postgres```
 - Rode as migrations do banco de dados:  ```npm run typeorm migration:run ou yarn typeorm migration:run```
 - Pronto, seu ambiente está configurado basta rodar: ```npm run start:dev ou yarn start:dev```
  
### Gateway
 Execute os seguintes passos:
 - Dentro da pasta do repositório execute: ```npm install ou yarn ```
 - Pronto, seu ambiente está configurado basta rodar: ```npm run start:dev ou yarn start:dev```
  

### Frontend
A implementação da interface web foi feita utilizando o framework Angular e para funcionar corretamente necessita da seguinte ferramenta:
 - [**Angular**](https://angular.io/start) .

Após instalar todas as ferramentas execute os seguintes passos:
 - Dentro da pasta do repositório execute: ```npm install ou yarn ```
 - Pronto, seu ambiente está configurado basta rodar: ```ng s```


**_*Lembre-se que o backend e gateway deve estar rodando_**


### Arquitetura do sistema

<img width="996"  src="https://i.postimg.cc/KzSW-M0vt/diagrama-vr-software.png">


