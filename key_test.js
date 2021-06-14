
let q;

window.onload = function(){
	addEventListener("keydown", press_kye);



	console.log("q == ", q);



	// window.removeEventListener("keydown", press_kye);
}



function press_kye(mmmm){
	console.log("keyCode: \n", mmmm.keyCode);
	q = mmmm.keyCode;

	if (q == 32) {

		console.log("нажат пробел ");

		removeEventListener("keydown", press_kye);

	}

}