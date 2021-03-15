window.onload = function(){

	arr_MainField = create_MainField();
	Snake_U = create_Snake();
	move_Snake(arr_MainField,Snake_U,21,50);
	

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

function move_Snake(arr_MainField,arr_divSnake,start_Field,stop_Field){
	/*
		отображает и двигает змею на поле
	*/
	
	let time_q = setInterval(q,200,stop_Field);
    // let element;
    
	function q(stop_Field){
		n = 0;

		firstElement_Snake = arr_MainField[start_Field-3].querySelector("div .class_snake");
	    if (firstElement_Snake != null) {
	    	firstElement_Snake.remove();	
		}

	    while(n < 1){
		   	divSnake = arr_MainField[start_Field];
			snake = document.createElement('div');
		    snake.className = "class_snake";
		    divSnake.append(snake);	
		    start_Field ++;
		    n ++;
	    }
	    if (start_Field > stop_Field) {
		    	clearInterval(time_q)
		}

	}
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


