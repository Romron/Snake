window.onload = function(){

	let mainDiv = document.querySelector('#main-field')
	let nColum;
	let nStr = 0
	let counter = 1

	while(nStr < 10){		// создаю поле
		nColum = 0;
		while(nColum < 10){
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

    console.log('массив всех полей создан')

	//========================================================================

	let resultat;
	let is_Thing = 3;
	let snakeNew = makeThing(arr_AllNodeMainDiv[1],'snake','class_snake','id_snakeNew',is_Thing);
	let i = 0;
	let startField = 11;
	let a = 0

	startField НЕ МЕНЯЕТЬСЯ В НУТРИ Ф-ЦИИ!!!!!!!!!!!!!!!!!

	let time =	setInterval(get,1000,startField, arr_AllNodeMainDiv, snakeNew, 0);








}


function get(startField, arr_AllNodeMainDiv, Thing, a){

	console.log("a", a);
	while (a < 3) {
		arr_AllNodeMainDiv[startField].append(Thing[a])
		startField++;
	console.log("a", a);
		a++;
	}
	a = 0;
	startField++;
}






//----------------------------------------------------------------------------------------
// ------------------------------	FUNCTIONS	------------------------------------------
//----------------------------------------------------------------------------------------

function makeThing(nField,nameThing,classThing,idThing,is_Thing=1){
	/*
		создаёт (не выводит на экран, только СОЗДАЁТ!) div или массив div-ов, который(?):
			- елементы которого будут роспологаться в ряд по горизонтали
			- массив должен состоять из не менее трёх елементов
			- номер поля голови должен быть больше за номер поля тела
		на входе получает:
			- nField -- ячейку общего поля в котором будет создан предмет
			- name
			- class
			- id 
			- is_Thing -- флаг
		на выходе возвращает:
			- созданый елемент или массив созданых  елементов
	*/


	if (is_Thing < 1) {		// значит пользователь ввёл некоректные данные

		alert('func makeThing ERR ' + nameThing);
	} else if (is_Thing == 1) {			// значит пользователь хочет создать предмет
			Thing = document.createElement('div');
			Thing.className = classThing;
			Thing.id = idThing;
			resultat = Thing;
			if (!document.querySelector('#'+idThing)) {	//  TODO:   проверка на существование предмета не работает!  ???
				result = '01  ERROR'
			}
	} else {			// значит пользователь хочет создать змею
			let n_AmountElemArr = 0;
			let arr_Things = [];
			// console.log(nField)
			// console.log(arr_AllNodeMainDiv[nField])   //  nField == arr_AllNodeMainDiv[1]
			while(n_AmountElemArr < is_Thing){
				Thing = document.createElement('div');
				Thing.className = classThing;
				Thing.id = idThing + '_' + String(n_AmountElemArr);
				arr_Things.push(Thing);
				// console.log(Thing)
				n_AmountElemArr++;

			}
		
			resultat = arr_Things;
		}

	return resultat;

}
 
function runThing(Thing, startField, arr_AllNodeMainDiv, stopField, i){
	/*
		Отображает движение 
			полученного объекта или массива объектов "Thing"
			из заданного элемента масива "arr_AllNodeMainDiv" 
				который	установлен в "startField"
			в конечный элемен того же массива 
				который установлен в "stopField"
			со скоростью "speedThing" в милисекундах

		на выходе возвращает:
			нечего
	*/
 

}



