window.onload = function(){

	arr_MainField = create_MainField(20,20);
	Snake = create_Snake();
	move_Snake(arr_MainField,Snake,6,380,3);
	

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


//----------------------------------------------------------------------

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
		- с права на лево
		- сверху вниз
		- снизу вверх
*/



function move_Snake(arr_MainField,arr_divSnake,start_Field,stop_Field,mode_Move=1){
	/*
		отображает и двигает змею на поле
	*/
	
	let length_Snake = arr_divSnake.length;

	let time_q;

	switch(mode_Move) {
		case 1:  // движение справа на лево
			console.log("case 1 ");
			
			time_q = setInterval(q,200,stop_Field);
			
			break

		case 2:  // движение слева на право
			console.log("case 2 ");

			time_q = setInterval(q,200,stop_Field);

		 	break
		case 3:  // движение сверху вниз
			console.log("case 3 ");

			vertical_time = setInterval(vertical_Move,200,stop_Field);

		 	break
	}


	function q(stop_Field){
		n = 0;

		if (mode_Move == 2) {
			firstElement_Snake = arr_MainField[start_Field - length_Snake].querySelector("div .class_snake");
			console.log("firstElement_Snake = ", firstElement_Snake);
			console.log("typeof(firstElement_Snake) = ", typeof(firstElement_Snake));
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
		   if (mode_Move == 2) {
		   	start_Field ++;			//	!!!!
		   }else{
		   	start_Field --;
		   }
		   n ++;
	    }

	    if (mode_Move == 2) {
		    if (stop_Field < start_Field) {		// !!!!
			    	clearInterval(time_q)
			}
	    } else {
	    	if (stop_Field > start_Field) {		// !!!!
		    	clearInterval(time_q)
			}
	    }
	}

	function vertical_Move(stop_Field){
		n = 0
		
		// console.log("start_Field = ", start_Field);

		firstElement_Snake = arr_MainField[start_Field].querySelector("div .class_snake");

		console.log("firstElement_Snake = ", firstElement_Snake);
		console.log("typeof(firstElement_Snake) = ", typeof(firstElement_Snake));
		// console.log("firstElement_Snake = ", firstElement_Snake);

		if (firstElement_Snake != null) {
			firstElement_Snake.remove();		    	
		}

		while(n < 1){
			divSnake = arr_MainField[start_Field];
			snake = document.createElement('div');
			snake.className = "class_snake";
			divSnake.append(snake);	
			n ++;
			start_Field = start_Field + 20;
		}



		if (stop_Field < start_Field) {		// !!!!
			clearInterval(vertical_time)
		}
	}





}





