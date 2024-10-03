from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import io

app = Flask(__name__)
CORS(app)

# Shared Python execution environment (global context)
global_context = {}

# Route for the root URL to confirm the server is running
@app.route('/')
def home():
    return "Welcome to the Python Code Execution Server. Use the /run_code endpoint to execute Python code."

# Route for running Python code
@app.route('/run_code', methods=['POST'])
def run_code():
    global global_context  # Access the shared global context
    code = request.json.get('code')  # Get the code from the POST request

    # Check if the 'code' key exists in the JSON request
    if not code:
        return jsonify({'error': 'No code provided'}), 400

    # Redirect stdout to capture print statements
    old_stdout = sys.stdout
    sys.stdout = io.StringIO()

    try:
        # Execute the code in the shared global context
        exec(code, global_context)

        # Split the code into lines
        code_lines = code.strip().split('\n')

        # Get the output from stdout (for print statements)
        output = sys.stdout.getvalue()

        # Iterate over each line, if the line is an expression, evaluate it
        for line in code_lines:
            line = line.strip()
            if line and not line.startswith("print"):
                try:
                    # Try to evaluate the line, if it's an expression, show its result
                    result = eval(line, global_context)
                    if result is not None:
                        output += str(result) + "\n"
                except:
                    # Ignore if the line is not an expression
                    pass
    except Exception as e:
        output = str(e)
    finally:
        # Reset stdout
        sys.stdout = old_stdout

    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)
