from flask import (Flask, render_template)

app = Flask("__main__")

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Webapp")
@app.route("/department")
def department():
    return render_template("index.html", flask_token=testes())

def testes():
    return "oi"

app.run(debug=True)