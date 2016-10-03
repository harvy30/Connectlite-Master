function factorial(n) {
    if (n < 0) return 0;
    if (n === 0) return 1;

    return n * factorial(n - 1);
};

function validate(n){
	switch(n){
			case 1:
		return '1';
			case 2:
		return '2';
			case 3:
		return '3';
	}
}