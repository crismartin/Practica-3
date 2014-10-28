/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores


  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/

describe ("Clase PlayerMissile", function (){
    	//comprobamos si existe canvas
    var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

    });


    it ("constructor missile", function (){
        // objeto singleton y mi mapa
        SpriteSheet = {
            map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }}
        };
       //  creo mis misiles
        var proyectil = new PlayerMissile (10, 10);
        
        // compruebo si se crea bien el missil
        expect (proyectil.w).toBe (2);
        expect (proyectil.h).toBe (10);
        expect (proyectil.x).toBe (9);
        expect (proyectil.y).toBe (0);
        expect (proyectil.vy).toBe (-700);
                              
    });

});





