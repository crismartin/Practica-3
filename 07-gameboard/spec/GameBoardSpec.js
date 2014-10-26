/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/
describe("Clase GameBoard", function(){

	//comprobamos si existe canvas
    var canvas, ctx;

    beforeEach(function(){
		loadFixtures('index.html');

		canvas = $('#game')[0];
		expect(canvas).toExist();

		ctx = canvas.getContext('2d');
		expect(ctx).toBeDefined();

    });

    // Creamos un board
    var board_test = new GameBoard ();    

    // comprobamos si se agregan elementos al board
    it ("add_objetos a board", function (){

        // Creamos un player
        var jugador = new PlayerShip ();

        // Compruebo si lo a�ade, comparando lo agregado..
        expect (board_test.add (jugador)).toEqual (jugador);

        //.. y mirando cuantos objetos tiene ahora el board
        expect (board_test.objects.length).toEqual(1);

    });
    

    // comprobamos si se borran objetos del board
    it ("delete_objetos a board", function () {
        // Creamos un player
        var jugador2 = new PlayerShip ();

        // A�ado el jugador al board
        board_test.add (jugador2);

        // Comprobamos si se ha a�adido el objeto al board
        // como hab�amos a�adido uno, ahora habr�n 2
        expect (board_test.objects.length).toEqual(2);            

        // Inicializamos la lista de elementos a borrar
        board_test.resetRemoved ();            
    
        // Marcamos el elemento para borrar
        board_test.remove (jugador2);    

        // Realizamos el borrado
        board_test.finalizeRemoved();        

        // Comprobamos si se ha borrado
        expect (board_test.objects.length).toEqual(1);            
        
    });


    it ("spect() & draw()", function () {
        // Creo un objeto dummy
        var dummy = { step: function (){}, draw: function (){} };

        // comprobamos sus metodos
        spyOn (dummy, "step");
        spyOn (board_test, "resetRemoved");
        spyOn (board_test, "finalizeRemoved");
        spyOn (dummy, "draw");

        // agregamos el dummy al board
        board_test.add (dummy);

        // Hacemos la llamada a step y miramos si se llama a sus campos
        board_test.step (2.0);        
        expect (board_test.resetRemoved).toHaveBeenCalled();
        expect (dummy.step).toHaveBeenCalled ();      
        expect (board_test.finalizeRemoved).toHaveBeenCalled();

        // Hacemos la llamada a draw y miramos si se llama a sus campos
        board_test.draw(ctx);            
        expect (dummy.draw).toHaveBeenCalled ();
    });                


    // Colisiones
    it ("overlap() & collide()", function (){
        // Creamos elementos para el board
        var objeto1 = {x: 60, y: 200, h: 11 , w: 11 };
        var objeto2 = {x: 70, y: 210, h: 1 , w: 1};
        var objeto3 = {x:50 , y: 300 , h:1 , w: 12};

        // Miramos si hay interseccion o no
        // En este caso hay interseccion, por tanto debe ser true            
        expect ( board_test.overlap (objeto1, objeto2)).toBe (true);        
        // En este caso obj1 y obj3 no tienen interseccion, debe ser false
        expect (board_test.overlap (objeto1, objeto3)).toBe (false);
        
        board_test.add (objeto1);
        board_test.add (objeto2);
        board_test.add (objeto3);

        // probamos si colisiona el objeto 4 con algun objeto de tipo1 
        var objeto4 = {type: "1", x:50 , y: 300 , h:1 , w: 12};
        expect (board_test.collide(objeto4, "1")).toBe (false);
        
        board_test.add (objeto4);

        var objeto5 = {x:50 , y: 300 , h:1 , w: 12};
        expect (board_test.collide(objeto5, "1")).toBe (objeto4);
           
    });
});

