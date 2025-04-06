from app import db
class post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    
    
    def to_json(self):
        return {
            "id":self.id,
            "username":self.username,
            "description":self.description,
            
        }