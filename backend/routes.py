from app import app, db
from flask import request, jsonify
from models import user

#Get all users
@app.route("/api/users", methods=["GET"])
def get_friends():
    usr = user.query.all()
    result = [user.to_json()for usr in usr]
    return jsonify(result)

#Create a new user
@app.route("/api/users",methods=["POST"])
def create_user():
    try:

        data = request.json
        
        #check to see if "username" and "password"
        required_fields = ["name","username","password"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f'Missing required field: {field}'}), 400
            
            name = data.get("name")
            username = data.get("username")
            password = data.get("password")

            new_user = user(name=name,username=username,password=password)

            db.session.add(new_user)
            db.session.commit()

            return jsonify(new_user.to_json()), 201
                           
    except Exception as e:
        db.session.rollback()
        app.debug = True
        return jsonify({"error": str(e)}), 500
