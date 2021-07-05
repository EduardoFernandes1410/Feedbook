from html.parser import HTMLParser
from bs4 import BeautifulSoup
import re
import hashlib

"""

Realiza o parse da página de professores do site do DCC para obter as informações 
de cada professor e gerar o arquivo .sql que irá popular o banco.

"""

with open("raw_data/Professores _ DCC.html", "r") as f:
    lines = f.readlines()
    lines = ''.join([x.strip() for x in lines])

soup = BeautifulSoup(lines, 'html.parser')
professors = soup.find_all("div", {"class": "node node-professor node-teaser contextual-links-region clearfix"})

lines = ["USE feedbook_db;\n"]
names = []

lines.append(            
    "INSERT INTO professor_tb(professor_id, professor_name, professor_img_url, professor_email) VALUES(\"%s\", \"%s\", %s, %s);\n"
    % (hashlib.md5("0".encode()).hexdigest(), "NULL", "NULL", "NULL")
)

for i,p in enumerate(professors):

    # Encontra o campo com o nome do professor
    name = p.find_all(class_="rdf-meta element-hidden")[0]["content"]
    name = name.strip()

    # Encontra a url da miniatura da foto do docente
    all_images = p.find_all('img')
    for img in all_images:
        if "foto-mini" in str(img):
            img_url = img["src"]

    # Encontra o email do docente e checa validade
    email = p.find_all(text=re.compile("@dcc.ufmg|@ufmg.br|.org"))
    if len(email) != 1 or email[0] == "contato@dcc.ufmg.br": 
        email = "NULL"
    else:
        email = "\"%s\""%email[0]
    
    # Gera o comando SQL para inserção na base
    lines.append(            
        "INSERT INTO professor_tb(professor_id, professor_name, professor_img_url, professor_email) VALUES(\"%s\", \"%s\", \"%s\", %s);\n"
        % (hashlib.md5(name.encode()).hexdigest(), name, img_url, email)
    )
    names.append(name)

# Salva o arquivo .sql
with open("../data/populate_professor_tb.sql", 'w') as f:
    f.writelines(
            lines
        )

print("Arquivo gerado.")
import pandas as pd
pd.DataFrame(names).to_csv("professor_name.csv")