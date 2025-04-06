from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 



app = Flask(__name__)
CORS(app)

app.config['DEBUG'] = True


app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///users.sb"
app.config["SQLALCHEMY_TRACK_MODIFICATONS"] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
