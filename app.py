from flask import Flask, render_template, request, redirect, send_file
from flask_mail import Mail, Message
from flask_sitemapper import Sitemapper
import json
import subprocess
import os
import re


app = Flask(__name__)
# generate a secret key with os.urandom(24) and store it in a file
print("------ Generating secret key... ------")
app.config['SECRET_KEY'] = os.urandom(24)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'manu365manu@gmail.com'
with open('secrets/secrets.txt') as f:
    app.config['MAIL_PASSWORD'] = f.readlines()[0]
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

sm = Sitemapper(app)
mail = Mail(app)

@sm.include()
@app.route("/")
def index():
    with open('static/content/proj.json') as f:
        return render_template("index.html", projects=json.load(f)["Projects"])

@sm.include()
@app.route("/aboutme")
def aboutme():
    return render_template("aboutme.html")

@sm.include()
@app.route("/projects")
def projects():
    with open('static/content/proj.json') as f:
        return render_template("projects.html", projects=json.load(f)["Projects"])

@sm.include()
@app.route("/home")
def home():
    redirect("/")

@sm.include()
@app.route("/curriculum")
def curriculum():
    return send_file("content/curriculum4.pdf")

@app.route("/sitemap.xml")
def r_sitemap():
    return sm.generate()

@app.errorhandler(404)
def page_not_found(e):
    return render_template('page-404.html'), 404


WHITELIST_COUNTRIES = ["FR", "ES", "US", "UK", "DE", "IT", "NL", "BE", "PT"]
ALLOWED_LINKS = ["github", "linkedin", "twitter", "facebook"]
BLACKLIST_WORDS = ["bitcoin", "earn", "money", "free", "click", "here", "subscribe", "buy", "sell", "trade", "crypto", "currency", "investment", "invest", "profit", "earnings", "earn", "cash", "dollar", "euro", "pound", "yen", "yuan", "rupee", "peso", "real", "ruble", "franc", "lira", "dinar", "dirham", "won", "krona", "krone", "kroner",
                     "bitcoin", "ethereum", "ripple", "litecoin", "monero", "dash", "zcash", "dogecoin", "tron", "stellar", "cardano", "tezos", "chainlink", "polkadot", "uniswap", "aave", "maker", "compound", "yearn", "sushi", "curve", "balancer", "synthetix", "cream", "yfi", "yfii", "yfiii",
                        "buy", "sell", "trade", "crypto", "currency", "investment", "invest", "profit", "earnings", "earn", "cash", "dollar", "euro", "pound", "yen", "yuan", "rupee", "peso", "real", "ruble", "franc", "lira", "dinar", "dirham", "won", "krona", "krone", "kroner",
]



@app.route('/submit', methods=['POST'])
def submit():
    name, email, message = request.form['name'], request.form['email'], request.form['message']
    
    if (not name or not email or not message):
        print("error")
        return redirect("/")
    
    #filter out spam check 
    # 1. if the headers of the post request are not from a browser, the ip is not from a contry that is not in the whitelist
    # 2. if contains words like: "bitcoin", "earn"...
    # 3. if contains links that are not from github, linkedin, etc
    
    
    
    if any([word in message for word in BLACKLIST_WORDS]):
        print("Blacklisted word")
        return redirect("/")

    # find links with regex:
 
    links = re.findall(r'(https?://[^\s]+)', message)
    for link in links:
        if not any([allowed_link in link for allowed_link in ALLOWED_LINKS]):
            print("Not allowed link")
            return redirect("/")
    
    
    
    msg = Message('From {}'.format(email), 
                    sender=email,
                    recipients=['manu365manu@gmail.com'])
    msg.body = "From: {}\n".format(name) + message
    mail.send(msg)
    print("Email sent", email)
    return redirect("/#")

def subprocessNPX(debug=False):
    tailwindcss_command = "npx tailwindcss -i ./static/assets/css/src/input.css -o ./static/assets/css/dist/output.css --watch"
    tailwindcss = subprocess.Popen(tailwindcss_command, stdin=subprocess.PIPE, shell=True) if debug else None

if __name__ == '__main__':
    debug = False
    subprocessNPX(debug=debug)
    if not debug:
        context = ('secrets/fullchain.pem', 'secrets/privkey.pem')#certificate and key files host='manu365.dev'
        app.run(debug=False, ssl_context=context, port=4433 , host='manu365.dev')
    else:
        app.run(debug=True, port=12344 , host='0.0.0.0')

