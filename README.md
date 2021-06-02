# Feedbook
TP1 de Engenharia de Software

## Grupo:
- Augusto Maillo Queiroga de Figueiredo - 2019006450 - Back-end
- Eduardo Augusto Militão Fernandes - 2019006540 - Front-end
- Pedro Dias Pires - 2019007040 - Back-end
- Arthur de Brito Bonifácio - 2019006370 - Front-end

## Proposta:
Sistema digital para feedback das disciplinas ofertadas pelo DCC-UFMG.

## Componentes:
- Sistema de cadastro
- Cadastro de disciplinas na forma de um questionário
  - Nível de empenho exigido pela disciplina;
  - Qualidade do material fornecido;
  - Nível de complexidade do conteúdo;
  - Nível de relevância nas aulas ministradas para o entendimento do conteúdo;
  - Comentário (opcional);
- Ranqueamento das disciplinas

## Tecnologias:
- MySQL
- NodeJS
- Angular

## Features:
- Diferenciação de disciplinas obrigatórias e opcionais;
- Possibilidade de avaliações anônimas;
- Up/down vote nas avaliações públicas;
- Identificação visual dos docentes;

## Backlog do sprint - 02/06
- Como usuário, eu gostaria de me cadastrar/entrar na plataforma
  - Criar tabela de usuários no BD [Augusto]
  - Implementar driver do banco de dados para tabela de usuários [Pedro]
  - Implementar camada de controle do back-end para login e cadastro [Augusto]
  - Implementar página de cadastro [Arthur]
  - Implementar página de login [Arthur]
  - Implementar camada de controle do front-end [Eduardo]

- Como usuário, gostaria de poder alterar detalhes da minha conta como nome ou senha
  - Implementar página de configuração [Arthur]
  - Implementar um controlador para alteração de dados do usuário [Pedro]
  - Implementar camada de controle do front-end [Eduardo]

- Como usuário, eu gostaria de avaliar uma disciplina
  - Criar tabela de avaliações, de matérias e de professores [Augusto]
  - Implementar driver do banco de dados [Pedro]
  - Implementar camada de controle do back-end [Augusto]
  - Implementar página de avaliação [Arthur]
  - Implementar camada de controle do front-end [Eduardo]

- Como usuário, eu gostaria de ver a lista de todas as disciplinas, ordenado por algum critério
  - Implementar camada de controle do back-end [Augusto]
  - Implementar página de feed de matérias [Arthur]
  - Implementar camada de controle do front-end [Eduardo]

- Como usuário, eu gostaria de ver todas as avaliações de uma disciplina
  - Implementar camada de controle do back-end [Pedro]
  - Implementar página de avaliações de uma disciplina [Arthur]
  - Implementar camada de controle do front-end [Eduardo]


- Como usuário, eu gostaria de dar upvote/downvote em alguma avaliação
  - Implementar camada de controle do back-end [Pedro]
  - Implementar botão de upvote/downvote [Arthur]
  - Implementar camada de controle do front-end [Eduardo]
