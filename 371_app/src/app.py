import os
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all domains to access your Flask API.

# Sample data for prompts
prompts = [
    {"id": 1, "category": "Grief", "prompt": "How to cope with loss?"},
    {"id": 2, "category": "Workplace", "prompt": "How to deal with a difficult boss?"}
]

@app.route('/')
def serve():
    # Return the index.html file from the build directory
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/prompts', methods=['GET', 'POST'])
def prompts_route():
    if request.method == 'GET':
        return jsonify(prompts)  # Return all prompts as JSON
    elif request.method == 'POST':
        new_prompt = request.json  # Get new prompt from the request body
        new_prompt['id'] = len(prompts) + 1  # Generate a new ID
        prompts.append(new_prompt)  # Add the new prompt to the list
        return jsonify(new_prompt), 201  # Return the new prompt with a 201 status

@app.route('/prompts/<int:id>', methods=['PUT', 'DELETE'])
def prompt_by_id(id):
    prompt = next((p for p in prompts if p['id'] == id), None)
    if not prompt:
        return jsonify({"error": "Prompt not found"}), 404
    
    if request.method == 'PUT':
        # Update the prompt with new data
        prompt_data = request.json
        prompt['category'] = prompt_data.get('category', prompt['category'])
        prompt['prompt'] = prompt_data.get('prompt', prompt['prompt'])
        return jsonify(prompt)
    
    elif request.method == 'DELETE':
        # Delete the prompt
        prompts.remove(prompt)
        return jsonify({"message": "Prompt deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Make sure the app runs on port 5000
