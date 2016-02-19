"use strict";
window.$ = window.jQuery = require('jquery');
require('velocity-animate');
require('jquery.transit');
var uid = require('uid');

class Carta {
	constructor (color,numero,id){
		this.color = color;
		this.numero = numero;
		this.id = id;
	}
	
	CrearCartas(colores){
		let deck = [];
		for(var x=0; x<2; x++){
			for (var i = 0; i < 10; i++) { 
				let temp = new Carta(colores[0],i,uid());
				deck.push(temp);
			}
			for (var i = 0; i < 10; i++) { 
				let temp = new Carta(colores[1],i,uid());
				deck.push(temp);
			}
			for (var i = 0; i < 10; i++) { 
				let temp = new Carta(colores[2],i,uid());
				deck.push(temp);
			}
			for (var i = 0; i < 10; i++) { 
				let temp = new Carta(colores[3],i,uid());
				deck.push(temp);
			}
			/*for (var i = 0; i < 4; i++) { 
				let temp = new Carta(colores[i],"+2",uid());
				deck.push(temp);
			}
			for (var i = 0; i < 2; i++) { 
				let temp = new Carta("comodin","+4",uid());
				deck.push(temp);
			}*/
		}
		/*deck.splice(0,1);
		deck.splice(9,1);
		deck.splice(18,1);
		deck.splice(27,1);*/
		return deck;
	}


	Repartir(cartas,player1,player2,player3,player4){

		for (var i = 0; i < cartas.length; i++) { //revulve las cartas
			let card = cartas[i];
			let index = Math.floor(Math.random() * cartas.length - 1 + 1);
			cartas[i] = cartas[index];
			cartas[index] = card;
		}	
		
		for (var i = 0; i < 7; i++) {  //reparte las cartas
			player1.push(cartas[0]);
			cartas.shift();
			player2.push(cartas[0]);
			cartas.shift();
			player3.push(cartas[0]);
			cartas.shift();
			player4.push(cartas[0]);
			cartas.shift();
		}


		return cartas;
	}

}


var colores = ["rojo","azul","amarillo","verde"]; //definimos los colores de las cartas

var carta = new Carta();  // creamos el objeto cartas
var cartas = carta.CrearCartas(colores); // creamos el array con todas las cartas

var player1 =[];
var player2 =[];
var player3 =[];
var player4 =[];
var cartasRevueltas = carta.Repartir(cartas,player1,player2,player3,player4);


var temp = {color:"azul",numero:8};
var cementerio = [];

function ganador(player,turno){
	var ganador = parseInt(turno) -1 ;
	if(player.length == 0){
		$('#winer').fadeIn('slow');
		$('.winer').addClass('ganador');
		var jugadores = ordena(player1,player2,player3,player4);

		var primero = jugadores[0].jugador
		var segundo = jugadores[1].jugador
		var tercero = jugadores[2].jugador
		var cuarto = jugadores[3].jugador

		$(".winer").replaceWith(`<div class="winer"> <h2>Ganador</h2><h2>Jugador${primero}</h2> </div>`);
		$(".second").replaceWith(`<div class="second"> <h2> Jugador${segundo} </h2><h2> 2° lugar </h2> </div>`);
		$(".third").replaceWith(`<div class="third"> <h2> Jugador ${tercero} </h2><h2> 3° lugar </h2> </div>`);
		$(".fourth").replaceWith(`<div class="fourth"> <h2> Jugador ${cuarto} </h2><h2> 4° lugar </h2> </div>`);

		$(".Deck").attr('id',50);
		saberTurno();
	}else{
		$(".Deck").attr('id',turno);
		saberTurno();
	}
}

function puntos(player){
	var puntos = 0;
	for (var i = 0, len = player.length; i < len; i++) {
		puntos=player[i].numero+puntos
	}
	return puntos
}

function ordena (player1,player2,player3,player4){
	var player1 = {puntos:puntos(player1),jugador:1};
	var player2 = {puntos:puntos(player2),jugador:2};
	var player3 = {puntos:puntos(player3),jugador:3};
	var player4 = {puntos:puntos(player4),jugador:4};

	var jugadores = [player1,player2,player3,player4];
	return jugadores.sort( function ( a,b){
		return (a.puntos - b.puntos)
	});
}

function saberTurno(){

	let turno = $(".Deck").attr('id');
	if(turno == 1){
		$('.avatar').css('border-color','#00ff32');
		$('.avatar-player4').css('border-color','transparent');

	}else if (turno == 2){
		$('.avatar').css('border-color','transparent');
		$('.avatar-player2').css('border-color','#00ff32');
		
		var tirar = ia(temp,player2);

		if(tirar == null){
			setTimeout(function () {
				var cardTaken = takeCard(cartasRevueltas, player2);
				$('.Layout-player2').append(`<img id = ${cardTaken.id} class = Carta-left src=./public/images/cover.svg />`);
				$(".Deck").attr('id',3);
				saberTurno();
			}, 3500);
		}else{
			var id = player2[tirar].id;
			setTimeout(function () {
				animar(id);
			}, 2500);
			setTimeout(function () {
				putCard(player2[tirar], id, cartasRevueltas);
				player2 = continua(player2[tirar],player2);
				ganador(player2,3);
			}, 3500);
			
		}
	}else if (turno == 3){
		$('.avatar-player2').css('border-color','transparent');
		$('.avatar-player3').css('border-color','#00ff32');
		var tirar = ia(temp,player3);

		if(tirar == null){
			setTimeout(function () {
				var cardTaken = takeCard(cartasRevueltas, player3);
				$('.Carta-player3').append(`<img id = ${cardTaken.id} class = Carta-cpu src=./public/images/cover2.svg />`);
				$(".Deck").attr('id',4);
				saberTurno();
			}, 3500);
		}else{
			var id = player3[tirar].id;
			setTimeout(function () {
				animar(id);
			}, 1500);
			setTimeout(function () {
				putCard(player3[tirar], id, cartasRevueltas);
				player3 = continua(player3[tirar],player3);
				ganador(player3,4);
			}, 3500);
		}

	}else if(turno == 4){
		$('.avatar-player3').css('border-color','transparent');
		$('.avatar-player4').css('border-color','#00ff32');

		var tirar = ia(temp,player4);

		if(tirar == null){
			setTimeout(function () {
				var cardTaken = takeCard(cartasRevueltas, player4);
				$('.Layout-player4').append(`<img id = ${cardTaken.id} class = Carta-left src=./public/images/cover.svg />`);
				$(".Deck").attr('id',1);
				saberTurno();
			}, 3500);
		}else{
			var id = player4[tirar].id;
			setTimeout(function () {
				animar(id);
			}, 1500);
			setTimeout(function () {
				putCard(player4[tirar], id, cartasRevueltas);
				player4 = continua(player4[tirar],player4);
				ganador(player4,1);
			}, 3500);
		}
	}
	return turno
}

function continua(carta,jugador){
	jugador = actualiza(carta,jugador);
	return jugador
}

function gamePlay(cardtem, cartaJugador, id) {

	var turno = saberTurno();
	cartaJugador = cartaJugador[0];
	if( cartaJugador.numero === "+4"){
		choseColor(cardtem,id,cartasRevueltas,cartaJugador);

	}else if( cartaJugador.numero === "+2" ) {
		if ( turno ==1 && cardtem.numero === cartaJugador.numero || cardtem.color === cartaJugador.color){
			for (var i = 0; i < 2; i++) { 
				var cardTaken = takeCard(cartasRevueltas, player2);
				$('.Carta-player3').append(`<img id = ${cardTaken.id} class = Carta-cpu src=./public/images/${cardTaken.color+cardTaken.numero}.svg />`);
			}
			animar(id);
			setTimeout(function () {
				putCard(cartaJugador, id, cartasRevueltas);
			}, 1000);
			player1 = actualiza(cartaJugador,player1);
			$(".Deck").attr('id',2);
			saberTurno();
		}else if ( turno ==2 && cardtem.numero === cartaJugador.numero || cardtem.color === cartaJugador.color){
			for (var i = 0; i < 2; i++) { 
				var cardTaken = takeCard(cartasRevueltas, player1);
				$('.Carta').append(`<img src=./public/images/${cardTaken.color+cardTaken.numero}.svg id = ${cardTaken.id} class = Carta-imagen />`);
			}
			animar(id);
			setTimeout(function () {
				putCard(cartaJugador, id, cartasRevueltas);
			}, 1000);
			player2=actualiza(cartaJugador,player2);
			$(".Deck").attr('id',1);
			saberTurno();
		}
	}else{
		gamenormal(turno,cardtem,cartaJugador,id);
	}
}

function gamenormal(turno,cardPlay,cartaJugar,id){
	if( turno == 1 && (cardPlay.color === cartaJugar.color  || cardPlay.numero === cartaJugar.numero)){
			animar(id);
			setTimeout(function () {
				putCard(cartaJugar, id, cartasRevueltas);
			}, 1000);
			player1 = actualiza(cartaJugar,player1);
			ganador(player1,2);
		}
	else if(turno == 2 && (cardPlay.color === cartaJugar.color  || cardPlay.numero === cartaJugar.numero)){
			animar(id);
			setTimeout(function () {
				putCard(cartaJugar, id, cartasRevueltas);
			}, 1000);
			player2 = actualiza(cartaJugar,player2);
			$(".Deck").attr('id',1);
			saberTurno();
		}
}

function animar(id) {
	var union = '#' + id + ''; //concatena el # con el id
	var position = $(union).offset(); //se obtinen left de la carta del jugador con #id mediante jQuery
	var left = position.left;
	var top = position.top;
	var positionCentro = $('#deck').offset(); //se obtinen left top de la carta del centro
	var leftCentro = positionCentro.left;
	var topCentro = positionCentro.top;
	let turno = $(".Deck").attr('id');
	if(turno == 1){
		$(union).velocity({ //se hace una animacion 
			top: topCentro  - top-30,
			left: leftCentro - left,
		},'slow');
	}else if(turno == 2){
		$(union).velocity({
			rotateZ: -90,
			top: topCentro  - top+30,
			left: leftCentro + left-30,
		},'slow');
	}else if (turno == 3){
		$(union).velocity({
			top: topCentro  + top-17,
			left: leftCentro - left,
		},'slow');
	}else if (turno == 4){
		$(union).velocity({
			rotateZ: -90,
			top: topCentro  - top+30,
			left: leftCentro - left-31,
		},'slow');
	}
}

function actualiza(cartaJugador,player){
	temp = cartaJugador;
	cementerio.push(temp);
	player = deleteCard(player,cartaJugador);
	return player;
}

function deleteCard(player,cardPlay){
	var tempPlayer = $.grep(player, function (elemento){
		return elemento.id != cardPlay.id;
	});
	player = tempPlayer
	return player;
}

function putCard(cartaJugador, id, cartasRevueltas) {
	$('#deck').attr('src',`./public/images/${cartaJugador.color+cartaJugador.numero}.svg`);
	$('.Cpu').html($('.Cpu').html());
	var id = '#' + id;
	$(id).remove();
	if(cartasRevueltas.length <= 5){
		var temporal = cartas.revolverCartas(cementerio);
		for (var i = 0; i < temporal.length; i++) { 
			cartasRevueltas.push(temporal[i]);
		}
	}
}

function takeCard(cartas, player) {
	player.push(cartas[0]);
	var temp = cartas[0];
	cartas.shift();
	return temp;
}

$(function () {
	saberTurno();
	$('.Carta').on('click', '.Carta-imagen', function () {
		let id = $(this).attr('id');
		let cardPlay = $.grep(player1, function (e){
			return e.id === id;
		});
		let turno = $(".Deck").attr('id');
		console.log(turno);
		if (turno == 1){
			gamePlay(temp,cardPlay, id);
		}
	});


	$('#deck').attr('src',`./public/images/${temp.color+temp.numero}.svg`);
	$('.Cpu').html($('.Cpu').html());
	for (var z = 0; z < 7; z++) {
		$('.Carta').append(`<img src=./public/images/${player1[z].color+player1[z].numero}.svg id = ${player1[z].id} class = Carta-imagen alt=${'imagen'+ z} />`);
		$('.Carta-player2').append(`<img id = ${player2[z].id} class = Carta-left src=./public/images/cover.svg /> `);
		$('.Carta-player3').append(`<img id = ${player3[z].id} class = Carta-cpu src=./public/images/cover2.svg /> `);
		$('.Carta-player4').append(`<img id = ${player4[z].id} class = Carta-left  src=./public/images/cover.svg /> `);
	}

	$('.Deck').on('click', 'img', function () {
  		let turno = $(".Deck").attr('id');
		if (turno == 1){
			var cardTaken = takeCard(cartasRevueltas, player1);
			$('.Carta').append(`<img src=./public/images/${cardTaken.color+cardTaken.numero}.svg id = ${cardTaken.id} class = Carta-imagen />`);
			$(".Deck").attr('id',2);
			saberTurno();
		}
	});
});

function css(player){
	$('img').each(function(){
	   $(this).addClass("uno");
	});
	var valor = 0;
	for (var z = 0; z < player.length; z++) {
		$('.uno').css("left",valor);
	}
	var valor = valor - 40;
}

function ia(cartaBuscar,player) {
	var color = cartaBuscar.color
	var numero = cartaBuscar.numero
	for (var i = 0, len = player.length; i < len; i++) {
		if (player[i].color === color)
		return i; 
		if (player[i].numero === numero)
		return i;
	}
	return null;
}

function demo(color,cardPlay,id,cartasRevueltas,cartaJugador){
	var turno = saberTurno();
	if (turno == 1){
		for (var i = 0; i < 4; i++) { 
			var cardTaken = takeCard(cartasRevueltas, player2);
			$('.Carta-player3').append(`<img id = ${cardTaken.id} class = Carta-cpu src=./public/images/${cardTaken.color+cardTaken.numero}.svg />`);
		}
		animar(id);
		setTimeout(function (){
			putCard(cartaJugador, id, cartasRevueltas);
		},1000)
		cardPlay = {color:color,numero:cartaJugador.numero,id:cartaJugador.id};
		player1 = actualiza(cardPlay,player1);
		$(".Deck").attr('id',2);
		saberTurno();
	}else if(turno == 2){
		for (var i = 0; i < 4; i++) { 
			var cardTaken = takeCard(cartasRevueltas, player1);
			$('.Carta').append(`<img src=./public/images/cover.svg id = ${cardTaken.id} class = Carta-imagen />`);
		}
		setTimeout(function (){
			putCard(cartaJugador, id, cartasRevueltas);
		},1000)
		cardPlay = {color:color,numero:cardPlay.numero,id:cardPlay.id};
		player2 = actualiza(cardPlay,player2);
		$(".Deck").attr('id',1);
		saberTurno();
	}
}

function choseColor(cardPlay,id,cartasRevueltas,cartaJugador){
		$('#hidden').fadeIn('slow');
		$('#hidden').addClass('vista');

		$('#rojo').on('click',function () {
			$('#hidden').removeClass('vista');
			let color = $(this).attr('id');
			demo(color,cardPlay,id,cartasRevueltas,cartaJugador);
			$('#hidden').fadeOut('slow');
			
		});
		$('#azul').on('click',function () {
			$('#hidden').removeClass('vista');
			let color = $(this).attr('id');
			demo(color,cardPlay,id,cartasRevueltas,cartaJugador);
			$('#hidden').fadeOut('slow');
		});
		$('#amarillo').on('click',function () {
			$('#hidden').removeClass('vista');
			let color = $(this).attr('id');
			demo(color,cardPlay,id,cartasRevueltas,cartaJugador);
			$('#hidden').fadeOut('slow');
		});
		$('#verde').on('click',function () {
			$('#hidden').removeClass('vista');
			let color = $(this).attr('id');
			demo(color,cardPlay,id,cartasRevueltas,cartaJugador);
			$('#hidden').fadeOut('slow');
		});
}