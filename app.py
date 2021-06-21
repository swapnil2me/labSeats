from flask import Flask, render_template
app = Flask(__name__)

users = ['00','01','10','11']
active = ['no','no','no','no']

usermap = {v:active[i] for i,v in enumerate(users)}


@app.route('/')
def index():
    print(list(usermap.values()))
    return render_template('index.html', users=list(usermap.keys()), active=list(usermap.values()))


@app.route('/update/<user>/<active>', methods = ['GET', 'POST'])
def update_state(user,active):
    global usermap
    usermap[user] = active
    print(usermap)
    return str(user) + ' to ' + str(active)


if __name__ == '__main__':
  app.run(host='', port=8000, debug=True)
