let cards = document.getElementsByClassName("card");
let countClick = 0;
let cardInfoStorage = [];
let cardStorage = [];

for (card of cards) {
	card.addEventListener("click", open);
}

function open() {
	let cardInfo = JSON.parse(this.getAttribute("value"));

	// this.firsChild = img tag
	this.firstChild.setAttribute("src", cardInfo.frontImg);

	console.log(cardInfo);
	console.log(this);

	// kiem tra xem 2 cards co giong nhau khong
	countClick++;
	cardInfoStorage.push(cardInfo);
	cardStorage.push(this);
	if (cardInfoStorage.length === 2) {
		if (cardInfoStorage[0].type === cardInfoStorage[1].type) {
			for (card of cardStorage) {
				card.style.background = "red";
			}
		}

		cardInfoStorage = [];
		cardStorage = [];
	}

	if (countClick === 2) {
		setTimeout(() => {
			countClick = 0;
			for (card of cards) {
				card.firstChild.setAttribute("src", cardInfo.backImg);
			}
		}, 1000);
	}
}
