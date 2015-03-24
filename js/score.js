function Score () {
	this.set = function(x){
		var t = document.getElementById("figure").innerHTML;
		v = parseInt(t);
		t = v + x*x*x;
		document.getElementById("figure").innerHTML = t.toString();
	}
}