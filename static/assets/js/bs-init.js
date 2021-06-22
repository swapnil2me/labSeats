//
// if (window.innerWidth < 768) {
// 	[].slice.call(document.querySelectorAll('[data-bss-disabled-mobile]')).forEach(function (elem) {
// 		elem.classList.remove('animated');
// 		elem.removeAttribute('data-bss-hover-animate');
// 		elem.removeAttribute('data-aos');
// 	});
// }
//
// document.addEventListener('DOMContentLoaded', function() {
//
// 	var hoverAnimationTriggerList = [].slice.call(document.querySelectorAll('[data-bss-hover-animate]'));
// 	var hoverAnimationList = hoverAnimationTriggerList.forEach(function (hoverAnimationEl) {
// 		hoverAnimationEl.addEventListener('mouseenter', function(e){ e.target.classList.add('animated', e.target.dataset.bssHoverAnimate) });
// 		hoverAnimationEl.addEventListener('mouseleave', function(e){ e.target.classList.remove('animated', e.target.dataset.bssHoverAnimate) });
// 	});
// }, false);
var cards;
var sessionUser;
sessionUser = localStorage.getItem("sessionUser");

function sleep(miliseconds) {
   let currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}


document.addEventListener("DOMContentLoaded", ()=>{

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

      // localStorage.setItem("sessionUser", user);
      console.log("-----------");
      console.log(localStorage.getItem("sessionUser"))
      console.log("-----------");

      let characEl = document.getElementById('charc-'+user);

      switch (user) {
        case '00':
          charc = "its so cold in here!";
          characEl.style.color = "#39a2db";
          break;
        case '11':
          charc = "this heat is killing me!";
          characEl.style.color = "#ff616d";

          break;
        case '01':
          charc = "peace";
          characEl.style.color = "#ffface";

          break;
        case '10':
          charc = "peace";
          characEl.style.color = "#ffface";

          break;
        default:
          charc = "";
      }

			let user_card = document.getElementById(user)
			let active;
			user_card.classList.forEach((item, i) => {
				if (item.startsWith("active")) {
					active = item.split("-")[1];
				}
			});
      let subtitle = user_card.childNodes[1].childNodes[3]

			if (active == "yes" ) {
        console.log(sessionUser,user);
				if (sessionUser == user) {
          localStorage.clear();
          user_card.classList.remove("active-yes");
  				user_card.classList.add("active-no");
  				user_card.style.animationName = "slideout";
  				user_card.style.animationDuration = "1s";
  				sleep(200)
  				user_card.style.backgroundColor = "rgb(12,8,27)";
  				// user_card.parentNode.style.order = 1;
          subtitle.innerHTML = "is available"
          // update state on serve

          characEl.innerHTML = "";

          let sendPost = async () => {
            let status = 'no';
            let url = `/update/${user}/${status}`; // the URL to send the HTTP request to
            let method = 'POST';
            let response = await fetch(url, { method });
            let data = await response.text(); // or response.json() if your server returns JSON

          }

          sendPost();
        }
        else {
          console.log("you are not the session user for this card");
        }

        //

			} else {

        if (localStorage.getItem("sessionUser") == null) {
          localStorage.setItem("sessionUser", user);
          sessionUser = localStorage.getItem("sessionUser");
  				user_card.classList.remove("active-no");
  				user_card.classList.add("active-yes");
  				user_card.style.animationName = "slidein";
  				user_card.style.animationDuration = "1s";
  				sleep(200)
  				user_card.style.backgroundColor = "#66de93";
  				// user_card.parentNode.style.order = -1;
          subtitle.innerHTML = "is occupied"

          characEl.innerHTML = charc;

          let sendPost = async () => {
            let status = 'yes';
            let url = `/update/${user}/${status}`; // the URL to send the HTTP request to
            let method = 'POST';
            let response = await fetch(url, { method });
            let data = await response.text(); // or response.json() if your server returns JSON

          }

          sendPost();

        }

        // update state on serve


        //
			}

		})
	}
	// card.forEach((item, i) => {
		// item.addEventListener("onClick", (event) => {
		// 	let target = event.target || event.srcElement;
	// 	})
	// });
  let coutLabel = document.getElementById('state_count');
  let stateCount;
  function updateCountLabel() {
    stateCount = document.getElementsByClassName('active-no').length;
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
  updateCountLabel()

  setInterval(updateCountLabel, 200);
})
