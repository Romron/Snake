let firstElement_Snake;
let k = 0;	// первая отрисовка змеи
let pointer_end_row = 0;  // указатель конца ряда
let counter_row = 1;	// счётчик количества пройденных строк
window.onload = function(){

	arr_MainField = create_MainField(20,20);
	Snake = create_Snake();
	// move_Snake(arr_MainField,Snake,380,6,1,2);
	// move_Snake(arr_MainField,Snake,23,380,2,2);
	move_Snake(arr_MainField,Snake,10,390,3,2);
	// move_Snake(arr_MainField,Snake,390,10,4,2);

}

function create_MainField(Colums=10,Strings=10){
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

function create_Snake(lengthSnake=3){
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

// -------------------------------------------------------------------

/*
	Режимы движения:
		- движение змеи должно быть бесконечным !!!
		- по кольцу 
			достигая стенки продалжает 
			движение в том же направлении 
			но с начала ряда
		- зеркальные стенки
			змея отражается от стен и 
			движется в обратном направлении
	Направления движения
		+ слева направо
		+ с права на лево
		+ сверху вниз
		+ снизу вверх
*/



function move_Snake(arr_MainField,arr_divSnake,start_Field,stop_Field,direct_Move=1,mode_Move=2){
	/*
		отображает и двигает змею на поле
	*/
	
	let length_Snake = arr_divSnake.length;
	let horizont_time;

	switch(direct_Move) {
		case 1:  // движение справа на лево
			console.log("case 1 ");
			horizont_time = setInterval(horizont_Move,200,stop_Field);
			break
		case 2:  // движение слева на право
			console.log("case 2 ");
			horizont_time = setInterval(horizont_Move,200,stop_Field);
		 	break
		case 3:  // движение сверху вниз
			console.log("case 3 ");
			vertical_time = setInterval(vertical_Move,200,stop_Field);
		 	break
		case 4: // движение снизу вверх
			console.log("case 4 ");
			vertical_time = setInterval(vertical_Move,200,stop_Field);
			break
	}


	function horizont_Move(stop_Field){
		n = 0;

		if (direct_Move == 2) {		// движение слева на право
			firstElement_Snake = arr_MainField[start_Field - length_Snake].querySelector("div .class_snake");
		}else{
			firstElement_Snake = arr_MainField[start_Field + length_Snake].querySelector("div .class_snake");
		}
	    if (firstElement_Snake != null) {
	    	firstElement_Snake.remove();		    	
		}

	    while(n < 1){
		   divSnake = arr_MainField[start_Field];
			snake = document.createElement('div');
		   snake.className = "class_snake";
		   divSnake.append(snake);	
		   if (direct_Move == 2) {
		   	start_Field ++;			
		   }else{
		   	start_Field --;
		   }
		   n ++;
	    }
			
		if (mode_Move == 2) {
			Move_on_ring();
		}

	}

	function vertical_Move(stop_Field){
		n = 0
		if (direct_Move == 3){	//	движение сверхув низ
			if (k == 3){		// если нарисовано три сегмента тела змеи то получить последний сигмент
				console.log("*start_Field", start_Field);
				firstElement_Snake = arr_MainField[start_Field - 60].querySelector("div .class_snake");
			}
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}
			divSnake = arr_MainField[start_Field];
			console.log("**start_Field = ", start_Field);
			snake = document.createElement('div');
			snake.className = "class_snake";
			divSnake.append(snake);	

			if (mode_Move == 2){		//		включаю режим движения по кольцу
				Move_on_ring();
			}	

			start_Field = start_Field + 20;
			if (k == 3){
				k = 3
			}else{
				k ++
			}

			if (mode_Move == 1){		// делаем движение конечным
				if (stop_Field < start_Field) {	
					clearInterval(vertical_time)
				}
			}

		}else{	// direct_Move = 4 движение снизу вверх
				if (k == 3){
					firstElement_Snake = arr_MainField[start_Field + 60].querySelector("div .class_snake");
				}
				if (firstElement_Snake != null) {
					firstElement_Snake.remove();		    	
				}
				divSnake = arr_MainField[start_Field];
				snake = document.createElement('div');
				snake.className = "class_snake";
				divSnake.append(snake);	

				if (mode_Move == 2){		//		включаю режим движения по кольцу
					Move_on_ring();
				}	

				start_Field = start_Field - 20;

				if (k == 3){
					k = 3
				}else{
					k ++
				}
				if (stop_Field > start_Field) {		
					clearInterval(vertical_time)
				}
			}

		}
	function Move_on_ring(){
		if (direct_Move == 1){	// движение с права на лево 
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
		}else if (direct_Move == 2){	// вижение с лева на право
			let pointer_end_row = start_Field % 20;

			if (pointer_end_row == 0) {
				firstElement_Snake = arr_MainField[start_Field - length_Snake].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
				firstElement_Snake.remove();		    	
				start_Field = start_Field - 19;	// начинаю рисовать змею с начала того же ряда
			}

			firstElement_Snake = arr_MainField[start_Field - length_Snake + 20].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}
		}else if (direct_Move == 3){	// движение сверху вниз

			let counter_row_fact = ~~(start_Field / 20) + 1
			let del_Field = 0; 

			console.log("start_Field = ", start_Field);
			// console.log("counter_row_fact = ", counter_row_fact);
			console.log("counter_row = ", counter_row);


			if (counter_row_fact => 20) {
				start_Field = start_Field % 20;
				del_Field = start_Field + 380;
				console.log("del_Field = ", del_Field);
				firstElement_Snake = arr_MainField[del_Field].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
				k = 0;
				counter_row = 0;
				console.log("NEW_start_Field = ", start_Field);
			} 


			counter_row ++;

		}

}
}
