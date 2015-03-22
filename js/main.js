$(document).ready(function(){ 
	var color_amount = 4;
	window.game = new Game;
	game.initializer(color_amount);
})

function Game(){
	this.allsquare = [];
	this.route = [];

	this.colorfactory = function (color_amount){
		var colorbox = ["#C00000","#C08000","#E0E038","#009A00","#0C2F81","#550680"];
		var step = 1/color_amount;
		var rand = Math.random();
		for( var x =1 ; x <= 6 ; x++ ){
			if(rand > (x-1)/color_amount && rand < x/color_amount){
				return colorbox[x];
			}
		}
	}

	this.initializer = function(color_amount){
		for (var i = 0 ; i < 17 ; i ++){
			this.allsquare[i] = new Array();
			this.route[i] = new Array();
			for (var j = 0 ; j < 17 ; j ++){
				this.allsquare[i][j] = 0;
				this.route[i][j] = 0;
			}
		}

		for(var x = 1 ; x < 16 ; x++){
			for(var y = 1 ; y < 16 ; y++){
				var colorstr = this.colorfactory(color_amount);
				var leftstr = (x*30).toString() + "px";
				var topstr = (y*30).toString() + "px";
				this.allsquare[x][y] = colorstr;
				$("<div/>").css("background-color",colorstr)
					.addClass("bubble")
					.attr("x",x)
					.attr("y",y)
					.css("left",leftstr)
					.css("top",topstr)
					.appendTo(".playground");
				}
		}

		$(".bubble").click(function(){
			game.check( $(this).attr("x") , $(this).attr("y") );
			game.delete();
		});  
	}



	this.check = function(x,y){
		var a = parseInt(x);
		var b = parseInt(y);
		var pre_color = game.allsquare[a][b];
		
		this.route[a][b] = 1;

		if(game.allsquare[a-1][b] == pre_color && game.route[a-1][b] == 0){
			this.route[a-1][b] = 1;
			this.check(a-1,b);
		}
		if(game.allsquare[a+1][b] == pre_color && game.route[a+1][b] == 0){
			this.route[a+1][b] = 1;
			this.check(a+1,b);
		}
		if(game.allsquare[a][b-1] == pre_color && game.route[a][b-1] == 0){
			this.route[a][b-1] = 1;
			this.check(a,b-1);
		}
		if(game.allsquare[a][b+1] == pre_color && game.route[a][b+1] == 0){
			this.route[a][b+1] = 1;
			this.check(a,b+1);
		}
	}


	this.delete = function(){
		for(var i = 0 ; i < 17; i++){
			for(var j = 0 ; j < 17; j++){
				if(game.route[i][j] == 1)
					var search_str ="\[x=" + i.toString() +   "\]\[y="  + j.toString() +   "\]"; 
					$(search_str).css("display","none");
			}
		}
	}
}

