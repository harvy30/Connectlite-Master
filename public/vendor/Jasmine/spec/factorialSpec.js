describe('#factorial', function (){

    it('should return 0 when given -1', function() {
        expect(factorial(-1)).toEqual(0);
    });

    it('should return 1 when given 0', function (){
        expect(factorial(0)).toEqual(1);
    });

    it('should return 1 when given 1', function (){
        expect(factorial(1)).toEqual(1);
    });

    it('should return 2 when given 2', function (){
        expect(factorial(2)).toEqual(2);
    });

    it('should return 6 when given 3', function (){
        expect(factorial(3)).toEqual(6);
    });
	
	it('should return 24 when given 4', function (){
        expect(factorial(4)).toEqual(24);
    });
});

describe('#validate',function(){
	it('should return 1 on 1',function(){
		expect(validate(1)).toEqual('1');
	})
})
