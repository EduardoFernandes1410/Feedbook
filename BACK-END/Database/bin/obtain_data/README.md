## Requisitos

* Python 3
* Pip 3
* BeautifulSoup 4
* Arquivo HTML com dados dos [professores](https://dcc.ufmg.br/dcc/?q=pt-br/professores) salvo em raw_data.
* Arquivo CSV com os dados das disciplinas salvo em raw_data.

## Instruções

Para instalar os pacotes necessários execute no terminal
```
pip3 install -r requirements.txt
```

O arquivo SQL para popular a base de professores do banco de dados pode ser executado da seguinte forma:

```
python3 parse_professors_data.py
```

A execução salvará o arquivo ```Persistence/bin/data/populate_professor_tb.sql``` usado na configuração inicial do banco.


O arquivo SQL para popular a base de disciplinas do banco de dados pode ser executado da seguinte forma:

```
python3 parse_subjects_data.py
```

A execução salvará o arquivo ```Persistence/bin/data/populate_subject_tb.sql``` usado na configuração inicial do banco.