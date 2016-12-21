from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb://heroku_x81wv2hv:upjcjpnd69qsb462cims6rc5qr@ds133388.mlab.com:33388/heroku_x81wv2hv')
    db = client.heroku_x81wv2hv
    return db

