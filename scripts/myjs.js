let firstElement_Snake;
let k = 0;	// первая отрисовка змеи
let pointer_end_row = 0;  // указатель конца ряда
let counter_row = 1;	// счётчик количества пройденных строк
let counter_row_fact  // счётчик количества пройденных строк
// let q = 0		// счётчик начала колонки
let flag_last_row = 1;
let del_Field = 0; // поле удаления
window.onload = function(){

	arr_MainField = create_MainField(20,20);		// создание массива полей
	Snake = create_Snake();		// создание змеи
	// move_Snake(arr_MainField,Snake,380,6,1,2);
	// move_Snake(arr_MainField,Snake,23,380,2,2);
	move_Snake(arr_MainField,Snake,10,390,3,2);
	// move_Snake(arr_MainField,Snake,390,10,4,2);

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


	function horizont_Move(stop_Field){		// горизонтальное движение
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

	function vertical_Move(stop_Field, counter_row){		// вертикальное движение
		n = 0

		del_Field = start_Field - 60;		// номерполя из которого нужно удалить сегмент змеи


		if (direct_Move == 3){	//	движение сверху вниз

			// если к < 3 то текущие ряд меньше 3 а это значить что del_Field отрицательное число
			console.log("*del_Field = ", del_Field);
			if (k >= 3){		// если нарисовано три сегмента тела змеи то получить последний сигмент
				firstElement_Snake = arr_MainField[del_Field].querySelector("div .class_snake");		// ищем последний кусок тела змеи
			}
			if (firstElement_Snake != null) {		// удаляем последний кусок тела змеи
				firstElement_Snake.remove();		    	
			}



			console.log("*start_Field = ", start_Field);
			divSnake = arr_MainField[start_Field];	  // находим поле в которое нужно поместить следуйщий кусок змеи
			snake = document.createElement('div');	  // создаём следущий кусок змеи
			snake.className = "class_snake";			  // присваевоем ему класс
			divSnake.append(snake);				// помещаем его на поле

			if (mode_Move == 2){		//		включаю режим движения по кольцу
					Move_on_ring();
			}
			if (counter_row != 20 || counter_row != 21){		// если сейчас 20 или 21 ряд тогда этот переход на новый ряд будет неактивен			
				start_Field = start_Field + 20;
			}
			if (k == 3){			// если уже нарисовано 3 сегмента тогда больше не рисовать 
				k = 3
			}else{		// иначе создать ещё
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
	function Move_on_ring(counter_row){
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

				console.log("del_Field = ", del_Field);
				console.log("start_Field = ", start_Field);

		 	counter_row_fact = ~~(start_Field / 20) + 1;		// находим текущий ряд
				console.log("counter_row_fact = ", counter_row_fact);
			if (counter_row_fact >= 20) {			// если номер текущего ряда 20 и более
					
				console.log("counter_row >= 20");
					flag_last_row = 1;	// момент при котором голова уже на первом ряду а всё остальное тело ещё на последних рядах

					// голова на первом ряду
					start_Field = start_Field - 380;		//преходим на номер поля первого ряда
					del_Field = start_Field + 340;
			}

			if (counter_row_fact == 1 && flag_last_row == 1) {
				start_Field = start_Field + 20;		//преходим на номер поля второго ряда
				del_Field = start_Field + 340;
			}

			if (counter_row_fact == 2  && flag_last_row == 1){
				start_Field = start_Field + 20;		//преходим на номер поля третьего ряда
				del_Field = start_Field + 340;
			}

			// firstElement_Snake = arr_MainField[del_Field].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
			// firstElement_Snake.remove();

				// 	k = 0; 	// обнуляю кол-во сегментов тела змеи нарисованных с первого ряда
					// start_Field = start_Field + 20	// движемся дальше	
					// firstElement_Snake = arr_MainField[340 + start_Field].querySelector("div .class_snake");	// удаляю части змеи в конце текущего ряда
				// 	console.log("del_Field", start_Field + 340)
				// 	firstElement_Snake.remove();
				// 	k = 0; 	// обнуляю кол-во сегментов тела змеи нарисованных с первого ряда
				// 	start_Field = start_Field - 20		// удаляю лишние поля
				// if (q == 2){		// если уже перешёл тогда
				// 	counter_row = 3		//счёчик рядов ставим на номер текущего ряда
				// 	q = 0		// обнуляем счёчик по переходу на начало колонки
				// }
			// } 
			counter_row ++;
		}
	}

}