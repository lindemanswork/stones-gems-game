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
	return "Home"#render_template('index.html')

@app.route('/game/<num>')
def game(num):
	if int(num)<0 or int(num)>5:
		return "Invalid game page"
	else:
		return render_template('index.html',number = num)

@app.route("/settings")
def settings():
	return render_template('gamesettings.html')


@app.route("/logSettings", methods = ["POST"])
def logSettings():
	print "----------------log settings--------------"
	global db
	print request.get_json() 
	db.gamesettings.update({'_id':"585aaffb697d587528d98450"}, request.get_json(), upsert=True)
	return "Logged game settings"

@app.route("/getSettings",methods = ["GET"])
def getSettings():
	data = db.gamesettings.find({'_id':"585aaffb697d587528d98450"})
	gamedata = [JSONEncoder().encode(game) for game in data]
	print "gamedata:"
	print gamedata
	return jsonify(result = gamedata)

@app.route("/logUserData",methods = ["POST"])
def logData():
	db.userdata.insert(request.get_json())
	return "Logged data"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)