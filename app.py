from flask import Flask, render_template, request, redirect
from flask_mail import Mail, Message
from flask_sitemapper import Sitemapper
import threading as th
import time
import datetime
import subprocess
import termcolor as tc

app = Flask(__name__)
app.config['SECRET_KEY'] = '7110c8ae51a4b5af97be6534caef90e4bb9bdcb3380af008f90b23a5d1616bf319bc298105da20fe'

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'manu365manu@gmail.com'
with open('secrets/secrets.txt') as f:
    app.config['MAIL_PASSWORD'] = f.readlines()[0]
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

sm = Sitemapper(app)
mail = Mail(app)

def subprocessNPX(debug=False):
    tailwindcss_command = "npx tailwindcss -i ./static/assets/css/src/input.css -o ./static/assets/css/dist/output.css --watch"
    tailwindcss = subprocess.Popen(tailwindcss_command, stdin=subprocess.PIPE, shell=True) if debug else None


@sm.include()
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/m")
def index_m():
    return render_template("index-m.html")

@sm.include()
@app.route("/aboutme")
def aboutme():
    return render_template("aboutme.html")

@sm.include()
@app.route("/m/aboutme")
def aboutme_m():
    return render_template("aboutme-m.html")


@sm.include()
@app.route("/home")
def home():
    redirect("/")


@app.route("/sitemap.xml")
def r_sitemap():
    return sm.generate()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('page-404.html'), 404


@app.route('/submit', methods=['POST'])
def submit():
    name, email, message = request.form['name'], request.form['email'], request.form['message']
    msg = Message('From {}@portfolio.manu365.dev'.format(name), 
                    sender=email,
                    recipients=['manu365manu@gmail.com'])
    msg.body = message
    mail.send(msg)
    # Do something with the email, such as sending an email
    print("Email sent", email)
    return redirect("/#")

if __name__ == '__main__':
    debug = True
    subprocessNPX(debug=debug)
    if not debug:
        context = ('fullchain.pem', 'privkey.pem')#certificate and key files host='manu365.dev'
        app.run(debug=False, ssl_context=context, port=4433 , host='manu365.dev')
    else:
        app.run(debug=True, port=12344 , host='0.0.0.0')

