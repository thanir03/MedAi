import pandas as pd
import numpy as np
import warnings
import matplotlib.pyplot as plt
from pandas import read_csv
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib as joblib
from sklearn.naive_bayes import GaussianNB
warnings.filterwarnings('ignore', category=UserWarning)

filename ='Drug.csv'
data = read_csv(filename)

data.replace({'Gender':{'Female':0,'Male':1}},inplace=True)
x = data[['Disease']]

data.replace({'Disease':{'Acne':0, 'Allergy':1, 'Diabetes':2, 'Fungal infection':3, 'Urinary tract infection':4,
 'Malaria':5, 'Migraine':5, 'Hepatitis B':7, 'AIDS':8}},inplace=True)

df_x = data[['Disease','Gender','Age']]
df_y = data [['Drug']]

X_train, X_test, y_train, y_test = train_test_split(df_x,df_y, test_size=0.2, random_state=0)
rf = RandomForestClassifier()
rf = rf.fit(df_x,np.ravel(df_y))

y_pred = rf.predict(X_test)


prediction = rf.predict(X_test)

test = [3,1,24]
test = np.array(test)
test = np.array(test).reshape(1,-1)

prediction = rf.predict(test)
print(prediction[0])

joblib.dump(rf,'medicine.pkl')
clf = joblib.load('medicine.pkl')


gnb = GaussianNB()
gnb = gnb.fit(df_x,np.ravel(df_y))

y_pred = gnb.predict(X_test)