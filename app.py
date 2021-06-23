from flask import Flask, render_template
app = Flask(__name__)

users = ['00','01','10','11']
active = ['no','no','no','no']
optMsg = ['its so cold in here!','peace','peace','this heat is killing me!']

usermap = {v:active[i] for i,v in enumerate(users)}


@app.route('/')
def index():
    # print(list(usermap.values()))
    return render_template('index.html', users=users, active=active, optMsg = optMsg)


@app.route('/update/<user>/<state>', methods = ['GET', 'POST'])
def update_state(user,state):
    global usermap, users, active
    ind = users.index(user)
    active[ind] = state
    usermap[user] = state
    # print(usermap)
    return str(user) + ' active ' + str(state)


@app.route('/update_status/<user>/<status>', methods = ['GET', 'POST'])
def update_status(user,status):
    global optMsg
    ind = users.index(user)
    optMsg[ind] = status
    print('==============')
    print("status" + users[ind] + ' to ' + optMsg[ind])
    print('==============')

    return "status" + users[ind] + ' to ' + optMsg[ind]


if __name__ == '__main__':
  app.run(host='', port=8000, debug=True)
