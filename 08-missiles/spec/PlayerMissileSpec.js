/*

  Requisitos: 

  La nave del usuario disparar� 2 misiles si est� pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendr� un tiempo de recarga de 0,25s, no pudi�ndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores


  Especificaci�n:

  - Hay que a�adir a la variable sprites la especificaci�n del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se a�adir�n
    misiles al tablero de juego en la posici�n en la que est� la nave
    del usuario. En el c�digo de la clase PlayerSip es donde tienen
    que a�adirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creaci�n de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declarar�n los m�todos de
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


    it ("step missile", function (){
        
        // objeto singleton y mi mapa
        SpriteSheet = {
            map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }}
        };
       //  creo mis misiles
        var proyectil = new PlayerMissile (10, 10);

        // creo el objeto dummy 'proyectil.board' con la funcion remove
        var dummy = {
            remove: function (misil) {}
        };

        proyectil.board = dummy;
        // creo el espia para la funcion remove
        spyOn (dummy, "remove");

        // dt = 1 en la llamada a step
        proyectil.step(1.0);

        // compruebo si ha sido llamada la funcion 'remove'
        expect (dummy.remove).toHaveBeenCalled();
    });

    it ("draw missile", function (){
        // objeto singleton y mi mapa con funcion draw
        SpriteSheet = {
            map: {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
            draw: function (){}
        };

        // creo mi missil
        var proyectil = new PlayerMissile (10, 10);

        // espia a la funcion draw
        spyOn (SpriteSheet, "draw");

        // ejecutamos la funcion draw del missil
        proyectil.draw (ctx);
    
        // miramos si se ha realizado la llamada la funcion draw
        expect (SpriteSheet.draw).toHaveBeenCalled ();

    });
});

