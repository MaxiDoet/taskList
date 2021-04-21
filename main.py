from flask import Flask, send_from_directory, request
app = Flask(__name__)

def update_tasks_file(content):
    try:
        f = open("tasks.json", "w")
        f.write(content)
    except:
        return

def get_tasks_content():
    try:
        f = open("tasks.json", "r")
        return f.read()
    except: 
        return ""

@app.route('/')
def index():
    return send_from_directory('public', "index.html")

@app.route('/<path:path>')
def public(path):
    return send_from_directory('public', path)

@app.route('/get_tasks')
def get_tasks():
    return get_tasks_content()

@app.route('/update_tasks')
def update_tasks():
    tasks_content = request.args.get("tasks")
    update_tasks_file(tasks_content)
    return ""

app.run(host="0.0.0.0", port=80)
