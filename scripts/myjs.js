/* TODO:
	вынести длину змеи в глобальную переменную
	вынести все ф-ции в отдельный файл

*/

let Colums = 20;		// кол-во колонок в MainField
let Strings = 20;		// кол-во рядов в MainField
let key;
let n = 0;
let question_Direct = "start_Direct"; 
let question_Field = "start_Field";
direct_Move = question_Direct;
start_Field = question_Field;
let length_Snake = 3;
let firstElement_Snake;
let k = 0;
let glob_key_Code;
window.onload = function(arr_Result){
	arr_Begins = begin();
	time_game = setInterval(frame_of_game,200,arr_Begins);

}

// =========  functionS  =================



function frame_of_game(arr_Begins) {
	/*
		состояние игрового поля каждыйотдельно взятый кадр
	*/
	let counter_row_fact = ~~(start_Field / 20) + 1;		// находим текущий ряд
	document.addEventListener('keydown', control);
	console.log("glob_key_Code", glob_key_Code);
	if(glob_key_Code == "39"){
		to_right()
	}
	else if(glob_key_Code == "37"){
		to_left()
	}	
	else if(glob_key_Code == "40"){
		to_down()
	}
	else if(glob_key_Code == "38"){
		to_up()
	}	
		function to_down(){
			
	
			if (start_Field < 3 * Colums){
				firstElement_Snake = arr_MainField[start_Field + (Strings * Colums - 3 * Colums)].querySelector("div .class_snake");		// 3 это lengthSnake 
			}else{
				firstElement_Snake = arr_MainField[start_Field-60].querySelector("div .class_snake");
			}

			if (firstElement_Snake != null) {		// удаляем последний кусок тела змеи
				firstElement_Snake.remove();		    	
			}
			divSnake = arr_MainField[start_Field];	  // находим поле в которое нужно поместить следуйщий кусок змеи
			console.log("start_Field", start_Field);
			console.log("divSnake", divSnake);
			snake = document.createElement('div');	  // создаём следущий кусок змеи
			snake.className = "class_snake";			  // присваевоем ему класс
			divSnake.append(snake);	
			if (k == 3){			// если уже нарисовано 3 сегмента тогда больше не рисовать 
				k = 3
			}else{		// иначе создать ещё
				k ++
			}
			if (counter_row_fact == Strings){
				start_Field = start_Field - (Strings * Colums - Colums);
			}else{ 
				start_Field = start_Field + 20;
			}
	   }
		function to_up(){
			if (start_Field > (Strings * Colums - 3 * Colums)){
				firstElement_Snake = arr_MainField[start_Field - (Strings * Colums - 3 * Colums)].querySelector("div .class_snake");		// 3 это lengthSnake 
			}else{
				firstElement_Snake = arr_MainField[start_Field + 60].querySelector("div .class_snake");
			}

			if (firstElement_Snake != null) {		// удаляем последний кусок тела змеи
				firstElement_Snake.remove();		    	
			}
			divSnake = arr_MainField[start_Field];	  // находим поле в которое нужно поместить следуйщий кусок змеи
			snake = document.createElement('div');	  // создаём следущий кусок змеи
			snake.className = "class_snake";			  // присваевоем ему класс
			divSnake.append(snake);	
			if (k == 3){			// если уже нарисовано 3 сегмента тогда больше не рисовать 
				k = 3
			}else{		// иначе создать ещё
				k ++
			}
			if (counter_row_fact <= 1){
				start_Field = start_Field + (Strings * Colums - Colums);
			}else{
				start_Field = start_Field - 20;
			}
		}
			}
	

	function to_right(){	
			firstElement_Snake = arr_MainField[start_Field - length_Snake].querySelector("div .class_snake");
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}			
			divSnake = arr_MainField[start_Field];
			snake = document.createElement('div');
			snake.className = "class_snake";
			divSnake.append(snake);	
			start_Field ++;			
			let pointer_end_row = start_Field % 20;	// указатель того что голова змеи достигла конца строки
			if (pointer_end_row == 0) {
				firstElement_Snake = arr_MainField[start_Field - length_Snake].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
				firstElement_Snake.remove();		    	
				start_Field = start_Field - 19;	// начинаю рисовать змею с начала того же ряда
			}
			firstElement_Snake = arr_MainField[start_Field - length_Snake + 20].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}
	}
	function to_left(){	
			firstElement_Snake = arr_MainField[start_Field + length_Snake].querySelector("div .class_snake");
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}			
			divSnake = arr_MainField[start_Field];
			snake = document.createElement('div');
			snake.className = "class_snake";
			divSnake.append(snake);	
			start_Field --;			
			let pointer_end_row = start_Field % 20;	// указатель того что голова змеи достигла конца строки
			if (pointer_end_row == 0) {
				firstElement_Snake = arr_MainField[start_Field + length_Snake].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
				firstElement_Snake.remove();		    	
				start_Field = start_Field + 19;	// начинаю рисовать змею с начала того же ряда
			}
			firstElement_Snake = arr_MainField[start_Field + length_Snake - 20].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}
	}

function control(e){
	/*
		получает код нажатой клавиши
	*/
	
	let key_Code = e.keyCode; 
	console.log("key_Code==", key_Code);
  	if(key_Code == 27){ 		//принажатии ESC 
		document.removeEventListener('keydown', control);
		clearInterval(time_game);	
	}	

	glob_key_Code = key_Code;
	return key_Code;
}



function begin() {
	/*
		Инициализация работы всей программы
	*/

	// let arr_Result = question_user();
	// для тестов
		let arr_Result = {
			"start_Field": 67,
			"start_Direct": 3,
		};
	
	arr_MainField = create_MainField(Colums,Strings);		// создание массива полей	
	Snake = create_Snake();		// создание змеи
	set_Snake(arr_Result, Snake);

	let arr_Results = {arr_Result, Snake}
	return arr_Results

	function set_Snake(arr_Result,arr_divSnake){
		/*
			
		*/

		console.log("Snake = ", arr_divSnake);
		console.log("arr_Result = ", arr_Result);
		console.log("arr_  ", arr_Result.start_Field	);


		start_Field = arr_Result.start_Field; 
		while(n < arr_divSnake.length){
		 	arr_MainField[start_Field].append(arr_divSnake[n]);
		 	start_Field ++;
		 	n ++;
		}
	}

	function question_user(){
		/*
			
		*/

		let start_Field = window.prompt("Your start field is?");
		let start_Direct = window.prompt("Your direct is? 1)To the right; 2)To the left; 3)To the down; 4)To the up");
		let arr_Result = {
			"start_Field": start_Field,
			"start_Direct": start_Direct,
		};

		console.log(arr_Result);
		return arr_Result;
	}
}

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
