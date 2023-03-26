const PIE_MENU_RADIUS = 150;
const NODE_DIAMETER = 60;
const MIN_DISTANCE_FROM_SCREEN_BORDER = PIE_MENU_RADIUS + NODE_DIAMETER;


let greyedZone = el('div');
greyedZone.id='greyedZoneId';
greyedZone.classList.add('modal');
let pieMenu = el('div');
pieMenu.id = 'pieMenuId';
greyedZone.appendChild(pieMenu);
document.body.appendChild(greyedZone);

greyedZone = id("greyedZoneId");
window.onclick = function(event) {
	if (event.target == greyedZone) {
		hideAndCleanPieMenu();
	}
}

function hideAndCleanPieMenu() {
	greyedZone.style.display = "none";
	removeAllChildren('pieMenuId');
}

function newNode(obj) {
	let node = el("div");
	node.className = "choiceMenu menuNode";
	node.innerHTML = obj.title;
	if (obj.action) {
		node.onclick = function(evt) {
			obj.action();
			hideAndCleanPieMenu();
		};
	}
	if (obj.subchoice) {
		node.onclick = function(evt) {
			let rect = evt.target.getBoundingClientRect();
			const x = rect.left;
			const y = rect.top;
			drawPieMenu(obj.subchoice, x, y);
		};
	}
	return node;
}


function drawPieMenu(menuObj, centerX, centerY) {
	const pieMenu = id('pieMenuId');
	for (let i = 0 ; i < pieMenu.children.length ; i++) {
		pieMenu.children[i].classList.add('transparent');
	}
	const effectiveX = Math.max(
		MIN_DISTANCE_FROM_SCREEN_BORDER, 
		Math.min(window.innerWidth-MIN_DISTANCE_FROM_SCREEN_BORDER, centerX)
	);
	const effectiveY = Math.max(
		MIN_DISTANCE_FROM_SCREEN_BORDER,
		Math.min(window.innerHeight-MIN_DISTANCE_FROM_SCREEN_BORDER, centerY)
	);
	
	const count = Object.keys(menuObj).length;
	const portion = 2* Math.PI / count;
	let i = 0;
	for (let k in menuObj) {
		let  x = Math.cos(portion * i) * PIE_MENU_RADIUS;
		let  y = Math.sin(portion * i) * PIE_MENU_RADIUS;
		let elem = newNode(menuObj[k]);
		elem.style.top = effectiveY + y;
		elem.style.left = effectiveX + x;
		pieMenu.appendChild(elem);
		i++;
	}
	pieMenu.style.top = effectiveY;
	pieMenu.style.left = effectiveX;
}

document.body.addEventListener('contextmenu', function(ev) {
	ev.preventDefault();
	if (greyedZone.style.display === "block")  return;
	greyedZone.style.display = "block";
	drawPieMenu(menu, ev.clientX, ev.clientY);
	return false;
}, false);