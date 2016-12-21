from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb://heroku_hgj2dkpq:192ledtpq5qhbs9ghpao0h2v2p@ds141078.mlab.com:41078/heroku_hgj2dkpq')
    db = client.heroku_hgj2dkpq
    return db

