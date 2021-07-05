# FeedBook Backend API

### Introdução

Este arquivo contém as instruções e especificações da API Backend do projeto FeedBook. Todos os endpoints estão especificados neste documento.

### Configurações

* As configurações do banco de dados devem ser atualizadas em `Configs/Database.json`.

* Para execuções locais, o arquivo `.env` deve ser configurado como desejar. Caso utilize um banco remoto, já populado, é necessário ter conhecimento do arquivo `.env` utilizado em sua geração.

## Endpoints
**NOTA**: Em caso de erro, todos os endpoints retornam um json no formato especificado ao fim do documento.

* ### **Log in** - /user/login
    Realiza a autenticação de um usuário. 

    Json a ser enviado na requisição:
    ```json
    {
        "email": ...,
        "password": ...
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "user": 
        {
            "name": ...,
            "surname": ...,
            "email": ...,
            "id": ...
        },
        "token": ...
    }
    ```

* ### **Registro** - /user/register
    Realiza o cadastro de um novo usuário no sistema.

    Json a ser enviado na requisição:
    ```json
    {
        "name": ...,
        "surname": ...,
        "email": ...,
        "paasword": ...
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "user": 
        {
            "name": ...,
            "surname": ...,
            "email": ...,
            "id": ...
        },
        "token": ...
    }
    ```

* ### **Configurações** - /user/update
    Altera os dados do usuário.
    Json a ser enviado na requisição:
    ```json
    {
        "token": ...,
        "user":
        {
            "email": ...,
            "id":  ...,
            "name": ..,
            "surname": ...,
            "password": (opcional),
        }
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "token": ...,
        "user":
        {
            "email": ...,
            "id":  ...,
            "name": ..,
            "surname": ...
        }
    }


* ### **Feed principal** - /feed/all
    Retorna todas as disciplinas cadastradas, ordenadas por alguma chave.


    Json a ser enviado na requisição:
    ```json
    {
        "orderBy": key*,
        "token": ...,
        "userId": ...
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "subjects": 
        [
            {
            "subjectId": ...,
            "professorName": ...,
            "professorImgUrl": ...,
            "professorEmail": ...,
            "meanDedicationTime": ...,
            "meanMaterialQuality": ...,
            "meanProfessorEvaluation": ...,
            "meanContentComplexity": ...,
            "meanGeneral": ...,
            "subjectCod": ...,
            "subjectName": ...,
            "evaluationsCount": ...
            },
            ...
        ]
    }
    ```

    **key***: "meanDedicationTime"/ "meanMaterialQuality"/ "meanProfessorEvaluation"/ "meanContentComplexity"/ "meanGeneral"/ "evaluationsCount"

* ### **Buscar por uma disciplina** - /feed/search
    Procura uma disciplina na base pelo nome e/ou código. Retorna todas as disciplinas onde existe correspondência.

    Json a ser enviado na requisição:
    ```json
    {
        "query": ...,
        "token": ...
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "subjects": 
        [
            {
            "subjectId": ...,
            "professorName": ...,
            "professorImgUrl": ...,
            "professorEmail": ...,
            "meanDedicationTime": ...,
            "meanMaterialQuality": ...,
            "meanProfessorEvaluation": ...,
            "meanContentComplexity": ...,
            "meanGeneral": ...,
            "subjectCod": ...,
            "subjectName": ...,
            "evaluationsCount": ...
            },
            ...
        ]
    }
    ```

* ### **Avaliações de uma disciplina** - /subject/evaluations
    Retorna todas as avaliações de uma disciplina.

    Json a ser enviado na requisição:
    ```json
    {
        "userId": ...,
        "subjectId": ...,
        "token": ...
    }
    ```

    Json de resposta (sucesso):
    ```json
    {
        "evaluation": 
        [
            {
                "evaluationId": ...,
                "evaluationOwner": ...,
                "evaluationDedicationTime": ...,
                "evaluationMaterialQuality": ...,
                "evaluationProfessorEvaluation": ...,
                "evaluationContentComplexity": ...,
                "evaluationGeneral": ...,
                "evaluationDesc": ...,
                "evaluationUpvoteCount": ...,
                "evaluationDownvoteCount": ...,
                "evaluationUpvoted": ...,
                "evaluationDownvoted": ...,
            },
            ...
        ]
    }
    ```

* ### **Postar uma avaliação** - /subject/evaluate
    Posta uma avaliação no sistema.

    Json a ser enviado na requisição:
    ```json
    {
        "userId": ...,
        "subjectId": ...,
        "token": ...,
        "evaluation":
        {
            "owner": ...,
            "dedicationTime": ...,
            "materialQuality": ...,
            "professorEvaluation": ...,
            "contentComplexity": ...,
            "generalEvaluation": ...,
            "desc": ...
        }
    }
    ```

    Essa requisição não retorna nenhum dado.
### **Json de erro**

```json
{
    "error": errorMsg
}
```