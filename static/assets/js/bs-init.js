var optMsg = {'00':'You can indicate time till you will be in lab by submitting the text above',
              '01':'You can indicate time till you will be in lab by submitting the text above',
              '10':'You can indicate time till you will be in lab by submitting the text above',
              '11':'You can indicate time till you will be in lab by submitting the text above'};
var optMsgColor = {'00':'#39a2db','01':'#39a2db','10':'#39a2db','11':'#39a2db'};
var cards;
var sessionUser;
var statusNode;
sessionUser = localStorage.getItem("sessionUser");

document.addEventListener("DOMContentLoaded", ()=>{

  // SocketIO Connection
  updateCountLabel();
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port, {cookie: true});

  socket.on("connect", ()=>{
    console.log("socket connected");

    if (sessionUser != null) {
      socket.emit('tap in', {'card': sessionUser});
      socket.emit('status change', {'card': sessionUser, 'status':localStorage.getItem("statusMessage")});
    }

    statusNode = document.getElementById('status');
    statusNode.hidden = true;
    

    cards = document.getElementsByClassName("card");
  	for (var card of cards) {
  		card.addEventListener("click", (event) => {
  			let target = event.target || event.srcElement;
  			let clsList = target.classList;
  			let user, charac;

  			clsList.forEach((item, i) => {
  				if (item.startsWith("user")) {
  					user = item.split("-")[1];
  				}
  			});

  			let active;

        document.getElementById('card-'+user).classList.forEach((item, i) => {
  				if (item.startsWith("active")) {
  					active = item.split("-")[1];
  				}
  			});

  			if (active == "yes" ) {
          statusNode.hidden = true;
          if (sessionUser == user) {
            localStorage.clear();
            socket.emit('status change', {'card': user, 'status':optMsg[user]});
            socket.emit('tap out', {'card': user});
          }

  			} else {

          if (localStorage.getItem("sessionUser") == null) {
            localStorage.setItem("sessionUser", user);
            sessionUser = localStorage.getItem("sessionUser");
            statusNode.hidden = false;
            socket.emit('tap in', {'card': user});
          }

  			}

  		})
  	}

    statusNode.onsubmit = (e) => {
      e.preventDefault();
      statusNode.hidden = true;
      let statusMessage = statusNode["statusMessage"].value;
      statusNode.reset();
      socket.emit('status change', {'card': sessionUser, 'status':statusMessage});
    }

  }) // socket on connect exit

  socket.on("announce tap in", data => {
    let tapInCard = document.getElementById('card-'+data["card"]);
    let tapInCardSubtitle = document.getElementById('subtitle-'+data["card"]);
    tapInCardSubtitle.innerHTML = "is occupied"

    activaeCard(tapInCard);

    let characEl = document.getElementById('charc-'+data["card"]);

    characEl.innerHTML = optMsg[data["card"]];
    characEl.style.color = optMsgColor[data["card"]];
    updateCountLabel()

  })

  socket.on("announce tap out", data => {
    let tapOutCard = document.getElementById('card-'+data["card"]);
    let tapOutCardSubtitle = document.getElementById('subtitle-'+data["card"]);
    tapOutCardSubtitle.innerHTML = "is available"

    deActivaeCard(tapOutCard)

    let characEl = document.getElementById('charc-'+data["card"]);

    characEl.innerHTML = "";
    characEl.style.color = optMsgColor[data["card"]];
    updateCountLabel()

  })

  socket.on("announce status change", data => {
    let statusMessage = data["status"];
    let characEl = document.getElementById('charc-'+data["card"]);
    localStorage.setItem("statusMessage", statusMessage)
    characEl.innerHTML = statusMessage;
    updateCountLabel()

  })

  function updateCountLabel() {
    let coutLabel = document.getElementById('state_count');
    let stateCount = document.getElementsByClassName('active-no').length;
    if (stateCount) {
      let isare = (stateCount === 1) ? 'is' : 'are';
      let s = (stateCount === 1) ? '' : 's';
      coutLabel.innerHTML=`<h5 style="color: #66de93;">There ${isare} ${stateCount} empty state${s}.</h5>
                           <p style="color: #cdf0ea;">Which state will you be in the Lab?</p>
                           <p style="color: #cdf0ea;">Dont forget to return the state after you leave the Lab.</p>`;
    } else {
      coutLabel.innerHTML=`<h5 style="color: #ff616d";>There are no states available \\_(--)_/</h5>
			                     <p style="color: #cdf0ea;">Come back later</p>
                           <p style="color: #cdf0ea;">or call someome to exchange the state with you.</p>`;
    }
  }

  function activaeCard(cardNode) {
    cardNode.classList.remove("active-no");
    cardNode.classList.add("active-yes");
    cardNode.style.animationName = "slidein";
    cardNode.style.animationDuration = "1s";
    cardNode.style.backgroundColor = "#66de93";
  }

  function deActivaeCard(cardNode) {
    cardNode.classList.remove("active-yes");
    cardNode.classList.add("active-no");
    cardNode.style.animationName = "slideout";
    cardNode.style.animationDuration = "1s";
    cardNode.style.backgroundColor = "rgb(12,8,27)";

  }
})
