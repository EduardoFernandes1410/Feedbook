import pandas as pd
from professor_name_dict import professor_name
from hashlib import md5

FILE = "raw_data/OfertaDeDisciplinas_DCC_20212.csv"

df = pd.read_csv(FILE)
df = df[["COD", "Disciplina","Prof"]]
df = df.drop_duplicates()

def generate_line(cod, desc, prof):
    desc = desc.split(":")[-1].strip()
    subid = '"%s"' % md5((cod+desc+prof).encode()).hexdigest()
    profid = ('"%s"'%md5(prof.encode()).hexdigest()) 
    desc = '"%s"' % desc
    cod = '"%s"' % cod

    return "INSERT INTO subject_tb(subject_id, professor_id, subject_name, subject_cod) VALUES(%s, %s, %s, %s);\n" % (subid, profid, desc, cod)

lines = ["USE feedbook_db;\n"]
for i,e in df.iterrows():
    prof = e.Prof
    if not prof in professor_name.keys():
        if ',' in prof:
            for p in prof.split(','):
                p = p.strip()
                lines.append(generate_line(e.COD, e.Disciplina, professor_name[p]))
        else:
            lines.append(generate_line(e.COD, e.Disciplina, "0"))
    else:
        lines.append(generate_line(e.COD, e.Disciplina, professor_name[prof]))
    
with open("../data/populate_subject_tb.sql", 'w') as f:
    f.writelines(
            lines
        )