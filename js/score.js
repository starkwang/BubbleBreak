function Score () {
	this.set = function(x){
		var t = $(".score > #figure").html();
		v = parseInt(t);

		if(x == 1){
			t = v -1000;
		}

		if(x<=14 && x>1){
			t = v + x*x*x;
		}
		if(x>14){
			t = v + 2500 + Math.floor(2000*Math.log(x-12));
		}
		if(t < 0 ){
			t = 0;
		}
		$(".score > #figure").html(t.toString());
	}
}