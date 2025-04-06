from app import db

class user(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable = False)
    password = db.Column(db.String(100), nullable = False)

    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "username":self.username,
            "password":self.password,
        }

class post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(1000), nullable = False)

    def to_json(self):
        return {
            "id":self.id,
            "username":self.username
            
        }