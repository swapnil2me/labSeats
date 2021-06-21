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
function sleep(miliseconds) {
   let currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}


document.addEventListener("DOMContentLoaded", ()=>{
	cards = document.getElementsByClassName("card");
	// console.log(cards);
	for (var card of cards) {
		// console.log(card);
		card.addEventListener("click", (event) => {
			let target = event.target || event.srcElement;
			let clsList = target.classList;
			let user;
			clsList.forEach((item, i) => {
				if (item.startsWith("user")) {
					user = item.split("-")[1];
				}
			});

			let user_card = document.getElementById(user)
			let active
			user_card.classList.forEach((item, i) => {
				if (item.startsWith("active")) {
					active = item.split("-")[1];
				}
			});
			console.log();
      let timeTag = user_card.childNodes[1].childNodes[3]
			if (active == "yes") {
        timeTag.innerHTML = '';
				user_card.classList.remove("active-yes");
				user_card.classList.add("active-no");
				user_card.style.animationName = "slideout";
				user_card.style.animationDuration = "1s";
				sleep(200)
				user_card.style.backgroundColor = "rgb(12,8,27)";
				user_card.parentNode.style.order = 1;
        // update state on serve

        let sendPost = async () => {
          let status = 'no';
          let url = `/update/${user}/${status}`; // the URL to send the HTTP request to
          let method = 'POST';
          let response = await fetch(url, { method });
          let data = await response.text(); // or response.json() if your server returns JSON
          console.log(data);

        }

        sendPost();

        //

			} else {
        timeTag.innerHTML = 'is in lab';
				user_card.classList.remove("active-no");
				user_card.classList.add("active-yes");
				user_card.style.animationName = "slidein";
				user_card.style.animationDuration = "1s";
				sleep(200)
				user_card.style.backgroundColor = "green";
				user_card.parentNode.style.order = -1;

        let sendPost = async () => {
          let status = 'yes';
          let url = `/update/${user}/${status}`; // the URL to send the HTTP request to
          let method = 'POST';
          let response = await fetch(url, { method });
          let data = await response.text(); // or response.json() if your server returns JSON
          console.log(data);

        }

        sendPost();

        // update state on serve


        //
			}

			// console.log();
		})
	}
	// card.forEach((item, i) => {
		// item.addEventListener("onClick", (event) => {
		// 	let target = event.target || event.srcElement;
		// 	console.log(target);
	// 	})
	// });
})
