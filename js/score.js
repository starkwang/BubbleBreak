function Score () {
	this.set = function(x){
		var t = document.getElementById("score").innerHTML;
		v = parseInt(t);
		t = v + x*x*x;
		document.getElementById("score").innerHTML = t.toString();
	}
}