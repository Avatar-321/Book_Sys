from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.neighbors import NearestNeighbors
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins='http://localhost:3000') 
 
# Load your data and models
popular_df = pickle.load(open('popular.pkl', 'rb'))
pt = pickle.load(open('pt.pkl', 'rb'))
books = pickle.load(open('books.pkl', 'rb'))
similarity_scores = pickle.load(open('knn_model.pkl', 'rb'))

@app.route('/', methods=['GET', 'POST'])
def index():
   topBooks = [
     {
        'book_name': row['Book-Title'],
        'author': row['Book-Author'],
        'image': row['Image-URL-M'],
        'votes': int(row['num_ratings']),
        'rating': float(row['avg_rating'])
    }
    for index, row in popular_df.iterrows()
]
   return jsonify(topBooks)


@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'POST':
       
        user_input = request.json.get('user_input')

        indices = np.where(pt.index == user_input)[0]
        if len(indices) == 0:
            return jsonify({"error": "User input not found in dataset"})

        index = indices[0]
        distances, similar_items_indices = similarity_scores.kneighbors([pt.iloc[index]])
        similar_items = similar_items_indices[0][1:5]

        data = []
        for i in similar_items:
            item = {}
            temp_df = books[books['Book-Title'] == pt.index[i]]
            item['title'] = temp_df.drop_duplicates('Book-Title')['Book-Title'].values[0]
            item['author'] = temp_df.drop_duplicates('Book-Title')['Book-Author'].values[0]
            item['image_url'] = temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values[0]
            data.append(item)

        print("Recommendations:", data)
        return json.dumps(data)
    
    elif request.method == 'GET':
       
        initial_recommendations = get_initial_recommendations()  
        return jsonify(initial_recommendations)

def get_initial_recommendations():
    # Define logic to fetch initial recommendations
    # For example, you can return the first few recommendations from your dataset
    initial_recommendations = []
    for i in range(5):
        item = {}
        item['title'] = books.iloc[i]['Book-Title']
        item['author'] = books.iloc[i]['Book-Author']
        item['image_url'] = books.iloc[i]['Image-URL-M']
        initial_recommendations.append(item)
    return initial_recommendations

if __name__ == '__main__':
    app.run(debug=True)
