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

## Funcionalidades:
- Diferenciação de disciplinas obrigatórias e opcionais;
- Possibilidade de avaliações anônimas;
- Up/down vote nas avaliações públicas;
- Identificação visual dos docentes;

## Backlog do produto
- Como usuário, eu gostaria de me cadastrar/entrar na plataforma
- Como usuário, gostaria de poder alterar detalhes da minha conta como nome ou senha
- Como usuário, eu gostaria de avaliar uma disciplina
- Como usuário, eu gostaria de ver a lista de todas as disciplinas, ordenado por algum critério
- Como usuário, eu gostaria de ver todas as avaliações de uma disciplina
- Como usuário, eu gostaria de dar upvote/downvote em alguma avaliação
- Diferenciação de disciplinas obrigatórias e opcionais;

## Backlog do sprint - 02/06
- Como usuário, eu gostaria de me cadastrar/entrar na plataforma (Concluído)
  - Criar tabela de usuários no BD [Augusto] (Concluído)
  - Implementar driver do banco de dados para tabela de usuários [Pedro] (Concluído)
  - Implementar camada de controle do back-end para login e cadastro [Augusto] (Concluído)
  - Implementar página de cadastro [Eduardo] (Concluído)
  - Implementar página de login [Eduardo] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

- Como usuário, gostaria de poder alterar detalhes da minha conta como nome ou senha (Concluído)
  - Implementar página de configuração [Eduardo] (Concluído)
  - Implementar um controlador para alteração de dados do usuário [Pedro] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

- Como usuário, eu gostaria de avaliar uma disciplina (Concluído)
  - Criar tabela de avaliações, de matérias e de professores [Augusto] (Concluído)
  - Implementar driver do banco de dados [Pedro] (Concluído)
  - Implementar camada de controle do back-end [Augusto] (Concluído)
  - Implementar página de avaliação [Eduardo] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

- Como usuário, eu gostaria de ver a lista de todas as disciplinas, ordenado por algum critério (Concluído)
  - Implementar camada de controle do back-end [Augusto] (Concluído)
  - Implementar página de feed de matérias [Eduardo] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

- Como usuário, eu gostaria de ver todas as avaliações de uma disciplina (Concluído)
  - Implementar camada de controle do back-end [Pedro] (Concluído)
  - Implementar página de avaliações de uma disciplina [Eduardo] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

- Como usuário, eu gostaria de dar upvote/downvote em alguma avaliação (Concluído)
  - Implementar camada de controle do back-end [Pedro] (Concluído)
  - Implementar botão de upvote/downvote [Eduardo] (Concluído)
  - Implementar camada de controle do front-end [Arthur] (Concluído)

## Diagrama da Arquitetura
![](Diagrama.jpeg)
