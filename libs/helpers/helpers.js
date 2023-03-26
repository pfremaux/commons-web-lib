function id(i) {
	return document.getElementById(i);
}

function el(name) {
	return document.createElement(name);
}

function removeAllChildren(i) {
	const myNode = document.getElementById(i);
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}
}

window.onerror = function(a,b,c) {
	console.log("a="+a+", b="+b+", c="+c);
	// TODO Send logs to server here.
};

function log(s) {
	console.log(s);
}

function logj(s) {
	console.log(JSON.stringify(s));
}

function hide(o) {
	if (typeof o === "string") {
		log("cache "+o);
		id(o).style.display = "none";
	}
	o.style.display = "none";
}

function show(o) {
	if (typeof o === "string") {
		id(o).style.display = "inline";
	}
	o.style.display = "inline";
}

function toggle() {
	if (typeof o === "string") {
		if (id(o).style.display === "inline") {
			id(o).style.display = "none";
		} else {
			id(o).style.display = "inline";
		}
	}
	if (o.style.display === "inline") {
		o.style.display === "none"
	} else {
		o.style.display = "inline"
	}
}

const PAGE_SIZE = 5;
let GLOBAL = {
	tablesPages:{},
	tables:{},
	boxTypes:{},
	counter:{
		value:0,
		reset:function() {
			GLOBAL.counter.value = 0;
		},
		incAndGet:function() {
			return ++GLOBAL.counter.value;
		}
	}
};