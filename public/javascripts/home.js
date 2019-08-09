let cards = document.getElementsByClassName("card");
let cardInfoStorage = []; // chứa những card đã được click
let cardStorage = [];
let finished = []; // chứa type của các card đã đc ghép đôi, nếu finish.length = cards.length/2 là end game

let score1HTML = document.querySelector("#user1 > div[class=score]");
let score2HTML = document.querySelector("#user2 > div[class=score]");
let score1 = 0;
let score2 = 0;
let countClick = 0;

// Set default view for score = 0;
score1HTML.textContent += String(score1);
score2HTML.textContent += String(score2);
for (card of cards) {
	card.addEventListener("click", open);
}

// Hàm kiểm tra xem lượt Click hiện tại đang thuộc người chơi nào(user1 hay user2)
function activeUser(num) {
	if ((num - 1) % 4 === 0 || (num - 2) % 4 === 0) {
		return 1;
	}
	return 2;
}

// Hàm tạo thông báo sau khi endgame
function endGame() {
	if (finished.length === cards.length / 2) {
		if (score1 > score2) {
			window.alert("User 1 win");
		} else if (score1 < score2) {
			window.alert("User 2 win");
		} else {
			window.alert("User1 === User2");
		}
	}
}

function open() {
	countClick++;

	if (activeUser(countClick) === 1) {
		console.log("user 1");
		score1HTML.parentNode.style.background = "red";
		score2HTML.parentNode.style.background = "white";
	} else {
		console.log("user 2");
		score1HTML.parentNode.style.background = "white";
		score2HTML.parentNode.style.background = "red";
	}

	// render score into view
	score1HTML.textContent = `Score: ${score1}`;
	score2HTML.textContent = `Score: ${score2}`;

	let cardInfo = JSON.parse(this.getAttribute("value"));
	// this.firsChild = img tag (div.card img)
	this.firstChild.setAttribute("src", cardInfo.frontImg);

	// kiem tra xem 2 cards co giong nhau khong
	cardInfoStorage.push(cardInfo); // chứa info(value ở các thẻ div.card) các thẻ đang lật (tối đa 2 thẻ)
	cardStorage.push(this); // chứa con trỏ của 2 cái info trên, để sau này tham chiếu đến
	if (cardInfoStorage.length === 2) {
		if (cardInfoStorage[0].type === cardInfoStorage[1].type) {
			setTimeout(() => {
				if (activeUser(countClick) === 1) {
					score1++;
					score1HTML.textContent = `Score: ${score1}`;
				} else {
					score2++;
					score2HTML.textContent = `Score: ${score2}`;
				}
				for (let card of cardStorage) {
					card.style.position = "relative";
					card.style.top = "10000px";
				}
				finished.push(cardInfoStorage[0].type);
				cardInfoStorage = [];
				cardStorage = [];
			}, 800);
		} else {
			setTimeout(() => {
				for (let i = 0; i < cards.length; i++) {
					let value = JSON.parse(cards[i].getAttribute("value"));
					let type = value.type;
					let backImg = value.backImg;
					let img = cards[i].firstChild;
					if (!finished.includes(type)) {
						img.setAttribute("src", backImg);
					}
				}
				cardInfoStorage = [];
				cardStorage = [];
			}, 800);
		}
	}
}
