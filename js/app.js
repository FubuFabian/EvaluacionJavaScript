var Calculadora = {
	
	operando1: 0,
	operandoSize: 0,
	operando2: 0,
	resultado: 0,
	operacion: "",
	signo: false,
	numberDisp: "0",
	resDisplay: false,
	
	init: function(){
		
		var teclas1 = document.querySelectorAll(".teclado img");
		
		for(var i=0;i<teclas1.length;i++){
			teclas1[i].onmousedown = this.tecla1Down;
			teclas1[i].onmouseup = this.tecla1Up;
		}
		
		var teclas2 = document.querySelectorAll(".teclado .row .col1 img");
		
		for(i=0;i<teclas2.length;i++){
			teclas2[i].onmousedown = this.tecla2Down;
			teclas2[i].onmouseup = this.tecla2Up;
		}
		
		var teclaMas = document.getElementById("mas");
		teclaMas.onmousedown = this.teclaMasDown;
		teclaMas.onmouseup = this.teclaMasUp;
		
	},
	
	tecla1Down: function(e){
		
		var tecla = e.target;
		
		tecla.style.height = "60px";
		tecla.style.width = "20%";
		tecla.style.margin = "1px 1%";
		
		Calculadora.teclaDown(tecla);
	
	}, 
	
	tecla1Up: function(e){
		
		var tecla = e.target;
		
		tecla.style.height = "62.91px";
		tecla.style.width = "22%";
		tecla.style.margin = "0";
	
	},
	
	tecla2Down: function(e){
		
		var tecla = e.target;

		tecla.style.height = "60px";
		tecla.style.width = "27%";
		tecla.style.margin = "1px 1%";
		
		Calculadora.teclaDown(tecla);
	
	}, 
	
	tecla2Up: function(e){
		
		var tecla = e.target;
		
		tecla.style.height = "62.91px";
		tecla.style.width = "29%";
		tecla.style.margin = "0";
	
	}, 
	
	teclaMasDown: function(e){
		
		var tecla = e.target;

		tecla.style.height = "98%";
		tecla.style.width = "88%";
		tecla.style.margin = "1% 1%";
		tecla.style.marginLeft = "10px";
		
		Calculadora.teclaDown(tecla);
	
	}, 
	
	teclaMasUp: function(e){
		
		var tecla = e.target;
		
		tecla.style.height = "100%";
		tecla.style.width = "90%";
		tecla.style.margin = "0";
		tecla.style.marginLeft = "10px";
	
	}, 
	
	teclaDown: function(tecla){
		
		var teclaId = tecla.id;
		var display = document.getElementById("display");
		
		switch(teclaId){
		
			case "sign":
				
				if( Calculadora.numberDisp == "0"){
					break;
				}
				
				if( Calculadora.numberDisp.indexOf("-") == -1 ){
					
					Calculadora.numberDisp = "-" + Calculadora.numberDisp;
					display.innerHTML = Calculadora.numberDisp;
					
				}else{
					
					Calculadora.numberDisp = Calculadora.numberDisp.substring(1);
					display.innerHTML = Calculadora.numberDisp;
				}
				
				break;
			
			case "on":
				
				display.innerHTML = "0";
				Calculadora.numberDisp = "0";
				Calculadora.operandoSize = 0;
				Calculadora.operando1 = 0;
				Calculadora.operando2 = 0;
				Calculadora.resultado = 0;
				Calculadora.operacion = false;
				Calculadora.signo = false;
				
				break;
				
			case "mas":
			case "por":
			case "menos":
			case "dividido":
				
				Calculadora.operacion = teclaId;
				Calculadora.operando1 = new Number(Calculadora.numberDisp);
				
				Calculadora.numberDisp = "";
				display.innerHTML = Calculadora.numberDisp;
				Calculadora.operandoSize = 0;
				
				break;
				
				
			case "punto":
				
				if( Calculadora.numberDisp.indexOf(".") == -1 ){
					
					Calculadora.numberDisp = Calculadora.numberDisp + ".";
					display.innerHTML = Calculadora.numberDisp;
					
				}

				break;
				
			case "igual":
				
				if(Calculadora.numberDisp!="" && Calculadora.operacion!=""){
					
					Calculadora.operando2 = new Number(Calculadora.numberDisp);
					
					switch(Calculadora.operacion){
						case "mas":
							Calculadora.resultado = Calculadora.suma();
							break;
						case "menos":
							Calculadora.resultado = Calculadora.resta();
							break;
						case "por":
							Calculadora.resultado = Calculadora.multiplicacion();
							break;
						case "dividido":
							Calculadora.resultado = Calculadora.division();
							break;
					}
					
					Calculadora.numberDisp = Calculadora.resultado.toString();
					display.innerHTML = Calculadora.numberDisp;
					
					Calculadora.resDisplay = true;
					Calculadora.operandoSize = 0;
					Calculadora.operando1 = 0;
					Calculadora.operando2 = 0;
					Calculadora.resultado = 0;
					Calculadora.operacion = false;
					Calculadora.signo = false;
					
				}
				
				break;
				
			case "0":
				
				if(Calculadora.resDisplay){
					
					Calculadora.resDisplay = false;
					
					Calculadora.operandoSize++;
					if(Calculadora.operandoSize<9){
						Calculadora.numberDisp = teclaId;
					}
					
					display.innerHTML = Calculadora.numberDisp;
					
					break;
				}
				
				if(Calculadora.numberDisp != "0"){
					
					Calculadora.operandoSize++;
					if(Calculadora.operandoSize<9){
						Calculadora.numberDisp = Calculadora.numberDisp + teclaId;
					}	
					
					display.innerHTML = Calculadora.numberDisp;
					
					break;
					
				}
				
				break;
			
			default:
				
				if(Calculadora.resDisplay){
					
					Calculadora.resDisplay = false;
					
					Calculadora.operandoSize++;
					if(Calculadora.operandoSize<9){
						Calculadora.numberDisp = teclaId;
					}
					
					display.innerHTML = Calculadora.numberDisp;
					break;
					
				}
				
				if(Calculadora.numberDisp != "0"){
						
					Calculadora.operandoSize++;
					
					if(Calculadora.operandoSize<9){
						Calculadora.numberDisp = Calculadora.numberDisp + teclaId;
					}
					
					display.innerHTML = Calculadora.numberDisp;
					break;
					
				}else{
					
					Calculadora.operandoSize++;
					
					if(Calculadora.operandoSize<9){
							Calculadora.numberDisp = teclaId;
					}
					
					display.innerHTML = Calculadora.numberDisp;
					break;
				}
				
				break;
		}
		
	},
	
	suma: function(){
		
		var resultado = Calculadora.operando1 + Calculadora.operando2;
		
		if(resultado.toString().length > 8){
			var resultadoString = resultado.toString();
			resultadoString = resultadoString.substring(resultadoString.length - 8);
			resultado = new Number(resultadoString);
		}
		
		return resultado;
	}, 
	
	resta: function(){
		
		var resultado = Calculadora.operando1 - Calculadora.operando2;
		
		if(resultado.toString().length > 8){
			var resultadoString = resultado.toString().substring(resultadoString.length - 8);
			resultado = new Number(resultadoString);
		}
		
		return resultado;
		
	},

	multiplicacion: function(){
		
		var resultado = Calculadora.operando1 * Calculadora.operando2;
		
		if(resultado.toString().length > 8){
			var resultadoString = resultado.toString().substring(resultadoString.length - 8);
			resultado = new Number(resultadoString);
		}
		
		return resultado;
		
	},

	division: function(){
		
		var resultado = Calculadora.operando1/Calculadora.operando2;
		
		if(resultado.toString().length > 8){
			var resultadoString = resultado.toString().substring(resultadoString.length - 8);
			resultado = new Number(resultadoString);
		}
		
		return resultado;
		
	}
	
	
};

Calculadora.init();