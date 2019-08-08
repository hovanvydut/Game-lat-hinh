let cards = document.getElementsByClassName("card");
let cardInfoStorage = []; // chứa những card đã được click
let cardStorage = [];
let opened = [];

for (card of cards) {
	card.addEventListener("click", open);
}

function open() {
	let cardInfo = JSON.parse(this.getAttribute("value"));

	// this.firsChild = img tag
	this.firstChild.setAttribute("src", cardInfo.frontImg);

	// kiem tra xem 2 cards co giong nhau khong
	cardInfoStorage.push(cardInfo);
	cardStorage.push(this);
	if (cardInfoStorage.length === 2) {
		if (cardInfoStorage[0].type === cardInfoStorage[1].type) {
			setTimeout(() => {
				console.log("ok");
				console.log(cardStorage);
				for (let card of cardStorage) {
					card.style.backgroundColor = "red";
					card.style.position = "relative";
					card.style.top = "10000px";
				}
			}, 1000);
			opened.push(cardInfoStorage[0].type);
		} else {
			setTimeout(() => {
				for (let i = 0; i < cards.length; i++) {
					let value = JSON.parse(cards[i].getAttribute("value"));
					let type = value.type;
					let backImg = value.backImg;
					let img = cards[i].firstChild;
					if (!opened.includes(type)) {
						img.setAttribute("src", backImg);
					}
				}
			}, 800);
		}
		cardInfoStorage = [];
		cardStorage = [];
	}
	// else {
	// 	setTimeout(() => {
	// 		for (let i = 0; i < cards.length; i++) {
	// 			let value = JSON.parse(cards[i].getAttribute("value"));
	// 			let type = value.type;
	// 			let backImg = value.backImg;
	// 			let img = cards[i].firstChild;
	// 			if (!opened.includes(type)) {
	// 				img.setAttribute("src", backImg);
	// 			}
	// 		}
	// 	}, 1000);
	// }
}
