from app import app, db
from flask import request, jsonify
from models import user, post  # Make sure to import 'post' model here

# Get all users
@app.route("/api/users", methods=["GET"])
def get_friends():
    try:
        usr = user.query.all()
        result = [u.to_json() for u in usr]  # Fixed: using correct variable name for iteration
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"Error fetching users: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Create a new user
@app.route("/api/users", methods=["POST"])
def create_user():
    try:
        data = request.json
        
        # Check if all required fields are present
        required_fields = ["name", "username", "password"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f'Missing required field: {field}'}), 400
        
        name = data["name"]
        username = data["username"]
        password = data["password"]

        # Create and add new user to the database
        new_user = user(name=name, username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.to_json()), 201
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error creating user: {str(e)}")
        return jsonify({"error": str(e)}), 500

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

        # Create and add new post to the database
        new_post = post(username=username, description=description)
        db.session.add(new_post)
        db.session.commit()

        return jsonify(new_post.to_json()), 201
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error creating post: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route("api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    try:
        post_id = post_id
        post_to_delete = post.query.get(post_id)
        
        if not post_to_delete:
            return jsonify({"error": "Post not found"}), 404
        
        db.session.delete(post_to_delete)
        db.session.commit()
        
        return jsonify({"message": "Post deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error deleting post: {str(e)}")
        return jsonify({"error": str(e)}), 500
