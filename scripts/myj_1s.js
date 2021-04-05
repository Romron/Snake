let firstElement_Snake;
let k = 0;	// первая отрисовка змеи

window.onload = function(){

	arr_MainField = create_MainField(20,20);
	Snake = create_Snake();
	move_Snake(arr_MainField,Snake,380,6,1);
	// move_Snake(arr_MainField,Snake,6,380,2);
	// move_Snake(arr_MainField,Snake,10,390,3);
	// move_Snake(arr_MainField,Snake,390,10,4);

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



function move_Snake(arr_MainField,arr_divSnake,start_Field,stop_Field,direct_Move=1,mode_Move=1){
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

		if (direct_Move == 2) {
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

	    // direct_Move = 1 тогда движение по кольцу
	    // иначе сработает clearInterval
		if (direct_Move == 1) {
			
			Move_on_ring();

		} else {
		    if (direct_Move == 2) {
			    if (stop_Field < start_Field) {		
				    	clearInterval(horizont_time)
				}
		    } else {
		    	if (stop_Field > start_Field) {		
			    	clearInterval(horizont_time)
				}
		    }
		}
	}

	function vertical_Move(stop_Field){
		n = 0
		if (direct_Move == 3){
			if (k == 3){
				firstElement_Snake = arr_MainField[start_Field - 60].querySelector("div .class_snake");
			}
			if (firstElement_Snake != null) {
				firstElement_Snake.remove();		    	
			}
				divSnake = arr_MainField[start_Field];
				snake = document.createElement('div');
				snake.className = "class_snake";
				divSnake.append(snake);	
				start_Field = start_Field + 20;
				if (k == 3){
					k = 3
				}else{
					k ++
				}
			if (stop_Field < start_Field) {	
				clearInterval(vertical_time)
			}
		}else{
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
		console.log('Move_on_ring start')

		console.log("start_Field = ", start_Field);
		let q = start_Field % 20;
		console.log("q = ", q);

		if (q == 0) {
			firstElement_Snake = arr_MainField[start_Field + length_Snake].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			firstElement_Snake.remove();		    	
			start_Field = start_Field + 19;	// начинаю рисовать змею с начала того же ряда
		}
			firstElement_Snake = arr_MainField[start_Field + length_Snake - 20].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			if (firstElement_Snake != null) {
			firstElement_Snake.remove();		    	
			}		
	}

}

