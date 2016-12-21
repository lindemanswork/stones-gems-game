import os
from flask import Flask
from flask import render_template,jsonify,request, redirect,url_for
import csv
import sys
import server
from server import *
import sys
import json
from JSONEncoder import JSONEncoder
from login import *
import json, xmltodict

app = Flask(__name__)

db = server.get_db()

username = None
mygames={}

maincollection = None

reload(sys)
sys.setdefaultencoding('utf-8')


@app.route("/")
@app.route("/home")
def home():
	return render_template('index.html')





	#return render_template('index3.html', games = mygames)



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)