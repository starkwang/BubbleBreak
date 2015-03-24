$(document).ready(function(){ 
	var color_amount = 4;
	window.game = new Game;
	window.score_count = new Score;
	game.initializer(color_amount);
})

function Game(){
	this.allcolor = [];
	this.route = [];
	this.allsquare = [];
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
			this.allcolor[i] = new Array();
			this.route[i] = new Array();
			this.allsquare[i] = new Array();
			for (var j = 0 ; j < 17 ; j ++){
				this.allcolor[i][j] = 0;
				this.route[i][j] = 0;
				this.allsquare[i][j] = 0;
			}
		}

		for(var x = 1 ; x < 16 ; x++){
			for(var y = 1 ; y < 16 ; y++){
				var colorstr = this.colorfactory(color_amount);
				var leftstr = (x*30).toString() + "px";
				var topstr = (y*30).toString() + "px";
				this.allcolor[x][y] = colorstr;
				var temp = $("<div/>").css("background-color",colorstr)
					.addClass("bubble")
					.attr("x",x)
					.attr("y",y)
					.css("left",leftstr)
					.css("top",topstr);
				temp.appendTo(".playground");
				this.allsquare[x][y] = temp;
				}
		}

		$(".bubble").click(function(){
			//fuck();
			game.check( $(this).attr("x") , $(this).attr("y") );
			game.delete();
			game.move();
			game.flash();
		});  
	}



	this.check = function(x,y){
		var a = parseInt(x);
		var b = parseInt(y);
		var pre_color = game.allcolor[a][b];
		
		this.route[a][b] = 1;

		if(game.allcolor[a-1][b] == pre_color && game.route[a-1][b] == 0){
			this.route[a-1][b] = 1;
			this.check(a-1,b);
		}
		if(game.allcolor[a+1][b] == pre_color && game.route[a+1][b] == 0){
			this.route[a+1][b] = 1;
			this.check(a+1,b);
		}
		if(game.allcolor[a][b-1] == pre_color && game.route[a][b-1] == 0){
			this.route[a][b-1] = 1;
			this.check(a,b-1);
		}
		if(game.allcolor[a][b+1] == pre_color && game.route[a][b+1] == 0){
			this.route[a][b+1] = 1;
			this.check(a,b+1);
		}
	}


	this.delete = function(){
		var score = 0;
		for(var i = 0 ; i < 17; i++){
			for(var j = 0 ; j < 17; j++){
				if(game.route[i][j] == 1){
					var search_str ="\[x=" + i.toString() +   "\]\[y="  + j.toString() +   "\]"; 
					//$(search_str).css("display","none");
					$(search_str).remove();
					score = score + 1;
				}
			}
		}
		score_count.set(score);
	}
	this.move = function() {
		var step_map = [];
		for (var i = 0 ; i < 17 ; i ++){
			step_map[i] = new Array();
			for (var j = 0 ; j < 17 ; j ++){
				step_map[i][j] = 0;
			}
		}

		for(var i = 1 ; i <=15 ; i++){
			for(var j = 1 ; j <=15 ; j++){
				step_map[i][j] = game.cal_step(i,j) || 0;
				var search_str ="\[x=" + i.toString() +   "\]\[y="  + j.toString() +   "\]"; 
					var topstr = ((j+step_map[i][j])*30).toString() + "px";
					//$(search_str).css("top", topstr );
					$(search_str).animate({top:topstr});
				
			}
		}

		for(var i = 15 ; i >=0 ; i--){
			for(var j = 15 ; j >=0 ; j--){
				if(step_map[i][j] != 0){
					this.allcolor[i][j+step_map[i][j]] = this.allcolor[i][j];
					this.allcolor[i][j] = 0;
				}
			}
		}
		/*
		for(var i = 1 ; i <=15 ; i++){
			for(var j = 1 ; j <=15 ; j++){
				var search_str ="\[x=" + i.toString() +   "\]\[y="  + j.toString() +   "\]";
				var new_y_str = $(search_str).css("top");
				var new_y = parseInt(new_y_str);
				$(search_str).attr("y", (new_y/30).toString() );
			}
		}
		*/
		

	}

	this.cal_step = function(x,y){
		var step = 0;
		for(var j = y+1;j<=15;j++){
			if(game.route[x][j] == 1){
				step = step + 1;
			}
		}
		return step;
	}

	this.flash = function(){
		for (var i = 1 ; i <= 15 ; i ++){
			for (var j = 1 ; j <=15 ; j ++){
				game.route[i][j] = 0;
			}
		}

	}


	this.fuck = function(){
	$(".bubble").each(function(){
			var new_y_str = $(this).css("top");
			var new_x_str = $(this).css("left");
			var new_x = parseInt(new_x_str);
			var new_y = parseInt(new_y_str);
			$(this).attr("y", (new_y/30).toString() );
			$(this).attr("x", (new_x/30).toString() );
		});

		var a = game.allcolor.length - 2;
		for (var i = 1 ; i <= a ; i ++){
			if(game.allcolor[i][15] == 0){
				game.allcolor.splice(i,1);
				a = game.allcolor.length - 2;
				for(var x = i+1;x<=15;x++){
					/*
					for(var y = 15;y>=1;y--){
						var search_str ="\[x=" + x.toString() +   "\]\[y="  + y.toString() +   "\]";
						var tempx = (parseInt($(search_str).attr("x"))-1).toString();
						alert(search_str);
						alert($(search_str).attr("x"));
						$(search_str).attr("x",tempx);
					}
					*/
					var search_str ="\[x=" + x.toString() +   "\]";
					$(search_str).each(function(){
						$(this).attr("x",(x-1).toString());
						$(this).animate({left:(((x-1)*30).toString())+"px"});
					});

				}
			}
		}
	
}

}


var wait=setInterval(function(){
                if(!$("div").is(":animated")){
                    //执行code
                   game.fuck();
                }
           },200);
