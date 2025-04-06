from app import app, db
from flask import request, jsonify
from models import post  # Make sure to import 'post' model here


# Get all posts
@app.route("/api/posts", methods=["GET"])
def get_posts():
    try:
        posts = post.query.all()
        result = [p.to_json() for p in posts]  # Corrected to use the correct variable name
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error fetching posts: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Create a new post
@app.route("/api/posts", methods=["POST"])
def create_post():
    try:
        data = request.json
        
        # Check if all required fields are present
        required_fields = ["username", "description"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f'Missing required field: {field}'}), 400
        
        username = data["username"]
        description = data["description"]
        img_url = data.get("image_url")  

        # Create and add new post to the database
        new_post = post(username=username, description=description, image_url=img_url)
        db.session.add(new_post)
        db.session.commit()

        return jsonify(new_post.to_json()), 201
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error creating post: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/posts/<int:id>", methods=["DELETE"])
def delete_post(id):
    try:

        current_Post = post.query.get(id)
        if current_Post is None:
            return jsonify({"error":"post not found"})
        db.session.delete(current_Post)
        db.session.commit()
        return jsonify({"msg": "Post deleted successfully"}), 201
    
    except:
        db.session.rollback()
        return jsonify({"error":f"Failed to delete"}), 500

