/* TODO:
	вынести длину змеи в глобальную переменную
	вынести все ф-ции в отдельный файл

*/

let Colums = 20;		// кол-во колонок в MainField
let Strings = 20;		// кол-во рядов в MainField
let key;


window.onload = function(){
	begin();
	
	time_game = setInterval(frame_of_game,200)
	console.log("time_game --- = ", time_game);


}




function begin() {
	/*
		Инициализация работы всей программы
	*/


	arr_MainField = create_MainField(Colums,Strings);		// создание массива полей	
	Snake = create_Snake();		// создание змеи
}

function frame_of_game() {
	/*
		состояние игрового поля каждыйотдельно взятый кадр
	*/

	function control(event) {
   	key = event.key; 
   	console.log('key = ',key);
	}


	document.addEventListener('keydown', control);



   	console.log('*key = ',key);


		if(key == "Escape"){ 		//stop
		// if(key == 's'){ 		//stop

	   	console.log('**key = ',key);
			document.removeEventListener('keydown', control);
			clearInterval(time_game);
		}	
		

}

// =========  functionS  =================


function create_MainField(Colums=10,Strings=10){		// функция по созданию поля
	/*
		Создаёт главное поле игры без контейнера
	*/

	let mainDiv = document.querySelector('#main-field')
	let nColum;
	let nStr = 0
	let counter = 1
	let n = 0;

	while(nStr < Strings){		// количество строк
		nColum = 0;
		while(nColum < Colums){		// количество колонок
			div = document.createElement('div');
			div.className = "field";
			div.innerHTML = counter;
			div.id = "f" + counter;
			mainDiv.append(div);
			nColum ++;
			counter ++;
		}
		nStr ++;
	}
	// получаю массив всех полей
    let arr_AllNodeMainDiv = mainDiv.childNodes;

    return arr_AllNodeMainDiv;
}

function create_Snake(lengthSnake=3){		// функция по созданию змеи
	/*
		создаю тело змеи
	*/

	let arr_divSnake = [];	// тело змеи
	let snake;	//сегмент тела змеи
	let n=0;	//счётчик созданых сегментов тела змеи

    while(n < lengthSnake){
	   	// arr_divSnake = arr_MainField[start_Field];
		snake = document.createElement('div');
	    snake.className = "class_snake";
	    // arr_divSnake.append(snake);
	    arr_divSnake.push(snake);
	    // start_Field ++;
	    n ++;
    }

    return arr_divSnake;
}

