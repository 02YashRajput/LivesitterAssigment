from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from models import Overlay
from bson.objectid import ObjectId
# Create a Flask application instance
app = Flask(__name__)
CORS(app)
# Configure MongoDB connection URI
app.config["MONGO_URI"] = "mongodb://localhost:27017/livesitter"
# Initialize PyMongo with the app
mongo = PyMongo(app)



@app.route('/', methods=['POST'])
def create_overlay():
    """
    Create a new overlay.

    Request body must contain:
    - x: int, x-coordinate of the overlay
    - y: int, y-coordinate of the overlay
    - width: int, width of the overlay
    - height: int, height of the overlay
    - type: str, type of the overlay
    - content: str, content of the overlay

    Returns:
    - JSON response with a message and the created overlay, or an error message.
    """
    data = request.json
    overlay = Overlay(
        x=data['x'],
        y=data['y'],
        width=data['width'],
        height=data['height'],
        type=data['type'],
        content=data['content']
    )
    try:
        # Insert overlay into MongoDB and get the inserted ID
        result = mongo.db.overlays.insert_one(overlay.to_dict())
        overlay_data = overlay.to_dict()
        overlay_data["id"] = str(result.inserted_id)  # Convert ObjectId to string
        overlay_data.pop('_id', None)  # Remove _id from the response
        return jsonify({"message": "Overlay created", "overlay": overlay_data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/', methods=['GET'])
def get_overlays():
    """
    Retrieve all overlays.

    Returns:
    - JSON response containing a list of all overlays, or an error message.
    """
    try:
        # Query to get all overlays from MongoDB
        overlays = mongo.db.overlays.find()
        overlays_list = []
        for overlay in overlays:
            overlay['id'] = str(overlay['_id'])  # Convert ObjectId to string
            overlay.pop('_id', None)  # Remove _id from each overlay
            overlays_list.append(overlay)  # Add each overlay to the list
            
        print(overlays_list)
        return jsonify(overlays_list), 200  # Return the list of overlays
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/', methods=['PUT'])
def update_overlay():
    """
    Update an existing overlay.

    Request body must contain:
    - id: str, ID of the overlay to update
    - (other fields to update, e.g., x, y, width, height, type, content)

    Returns:
    - JSON response with a message indicating the result of the update or an error message.
    """
    data = request.json
    overlay_id = data.get('id')  # Get the overlay ID from the request data

    # Check if the ID is provided
    if not overlay_id:
        return jsonify({"error": "Missing overlay ID"}), 400

    # Remove the id field from the data to avoid modifying it
    data.pop('id', None)

    try:
        # Update the overlay in the database
        result = mongo.db.overlays.update_one(
            {"_id": ObjectId(overlay_id)},  # Convert the ID to ObjectId
            {"$set": data}  # Set the new values
        )

        if result.modified_count == 0:
            return jsonify({"message": "No overlay found with that ID"}), 404

        return jsonify({"message": "Overlay updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/<string:overlay_id>", methods=["DELETE"])
def delete_overlay(overlay_id):
    """
    Delete an existing overlay.

    Request path must contain:
    - overlay_id: str, ID of the overlay to delete

    Returns:
    - JSON response with a message indicating the result of the deletion or an error message.
    """
    # Check if the ID is provided
    if not overlay_id:
        return jsonify({"error": "Missing overlay ID"}), 400

    try:
        # Delete the overlay from the database
        result = mongo.db.overlays.delete_one({"_id": ObjectId(overlay_id)})  # Convert to ObjectId

        if result.deleted_count == 0:
            return jsonify({"message": "No overlay found with that ID"}), 404

        return jsonify({"message": "Overlay deleted"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5001)  # Run the Flask application in debug mode
