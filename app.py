from flask import Flask, render_template
from flask_pymongo import PyMongo
import stock_search

app = Flask(__name__)
# Use flask_pymongo to set up mongodb connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/stock_db")

@app.route("/")
def index():
   stock_app = mongo.db.stock_app.find_one()
   return render_template("index.html", stock_app=stock_app)

@app.route("/stock")
def stock_info():
   stock_app = mongo.db.stock_app
   stock_data = stock_search.stock()
   stock_app.update({}, stock_data, upsert=True)
   return stock_data

if __name__ == "__main__":
   app.run()