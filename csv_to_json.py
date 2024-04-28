import pandas as pd

df = pd.read_csv('Mobile phone price.csv')


df.columns = ["brand","model","storage","ram","screen_size","camera","battery","price"]
df['price'].replace(r'[$,]', '', regex=True, inplace=True)
df['battery']=df['battery'].astype(int)
df['price']=df['price'].astype(int)
df.to_json('Mobile phone price.json', orient='records')
