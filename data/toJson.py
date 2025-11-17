import csv
import json
import pandas as pd

# Nom du fichier CSV à lire
csv_file = 'especes.csv'
# Nom du fichier JSON à créer
json_file = 'especes.json'

df = pd.read_csv("especes.csv")

indexNames = df[(df["photo"].isnull())].index
df.drop(indexNames, inplace=True)

df = df.fillna("")

# Lire le CSV et le convertir en liste de dictionnaires
data = "[ \n"
for row in df.to_dict(orient="records"):
	print(row)
	data = data + str(row) + ",\n"
data = data[:-2] + "\n]"
data = data.replace("\'", "\"")   
# Écrire les données au format JSON
with open(json_file, 'w', encoding='utf-8') as f:
    f.write(data)

print(f"Conversion terminée ! Le fichier JSON a été créé : {json_file}")
