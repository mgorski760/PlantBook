from app import app, db
from flask import request, jsonify
from models import user

#Get all users
@app.route("/api/users", methods=["GET"])
def get_friends():
    usr = user.query.all()
    result = [user.to_json()for usr in usr]
    return jsonify(result)

