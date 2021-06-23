from flask import Flask, render_template
from flask_socketio import SocketIO, emit
app = Flask(__name__)
socketio = SocketIO(app)

users = ['00','01','10','11']
active = ['no','no','no','no']
optMsg = ['its so cold in here!','peace','peace','this heat is killing me!']

usermap = {v:active[i] for i,v in enumerate(users)}

@app.route('/')
def index():
    return render_template('index.html', users=users, active=active, optMsg = optMsg)

@app.route('/update_status/<user>/<status>', methods = ['GET', 'POST'])
def update_status(user,status):
    global optMsg
    ind = users.index(user)
    optMsg[ind] = status
    return "status" + users[ind] + ' to ' + optMsg[ind]

@socketio.on("tap in")
def tap_in(data):
    global usermap, active
    ind = users.index(data["card"])
    active[ind] = 'yes'
    usermap[data["card"]] = 'yes'
    emit("announce tap in", {"card":data["card"]}, broadcast = True)

@socketio.on("tap out")
def tap_in(data):
    global usermap, active
    ind = users.index(data["card"])
    active[ind] = 'no'
    usermap[data["card"]] = 'no'
    emit("announce tap out", {"card":data["card"]}, broadcast = True)

@socketio.on("status change")
def status_change(data):
    global optMsg
    ind = users.index(data["card"])
    optMsg[ind] = data["status"]
    emit("announce status change", {"card":data["card"],"status":data["status"]}, broadcast = True)

if __name__ == '__main__':
  app.run(host='', port=8000, debug=True)
