import Ship from "./ship";
import Gameboard from "./gameboard";

test('Check ship isSunk Method', () => {
    const ship = new Ship(2);
    expect(ship.isSunk()).toEqual(false);
  });

test('can\'t place ship when length of ship is outside the board', () => {
    const gameboard = new Gameboard(3);
    gameboard.placeShip([0,0], 4);
    expect(gameboard.placeShip([0,0], 4, false)).toBe(false)
})

test('can place a ship vertically', ()=> {
    const gameboard = new  Gameboard(10);
    expect(gameboard.placeShip([0,0], 2, true)).toBe(true)
    console.log(gameboard);
})

test('can\'t place a ship when the x coordinate is outside of the gameboard ', () => {
    const gameboard = new Gameboard(3);
    expect(gameboard.placeShip([-10,2], 4, false)).toBe(false)
})

test('can\'t place a ship when the y coordinate is outside of the gameboard ', () => {
    const gameboard = new Gameboard(3);
    gameboard.placeShip([0,0], 4);
    expect(gameboard.placeShip([2,-3], 4, false)).toBe(false)
})

test('can\'t place a ship when the x and y coordinate is outside of the gameboard ', () => {
    const gameboard = new Gameboard(3);
    gameboard.placeShip([0,0], 4);
    expect(gameboard.placeShip([-3,-3], 4, false)).toBe(false)
})

test('can place a ship until the end of the board', () => {
    const gameboard = new Gameboard(3);
    expect(gameboard.placeShip([0,0], 2, false)).toBe(true)
})

test('can\'t where a ship already is ', () => {
    const gameboard = new Gameboard(4);
    gameboard.placeShip([0,0],2, false);
    expect(gameboard.placeShip([0,0], 2, false)).toBe(false)
})

test('can place a ship next to another ship ', () => {
    const gameboard = new Gameboard(4);
    gameboard.placeShip([0,0],2, false);
    expect(gameboard.placeShip([0,2], 2, false)).toBe(true)
})

test('can recieve an attack ', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([8,4],2, false);
    expect(gameboard.recieveAttack([8,4])).toBe(true)

})

test('check if ship is sunk that isn\'t hit ', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([8,4],2, false);
    expect(gameboard.isSunk([8,4])).toBe(false)
})

test('check if ship is sunk that is hit but still standing', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([8,4],2, false);
    gameboard.recieveAttack([8,4]);
    expect(gameboard.isSunk([8,4])).toBe(false);
})

test('check if ship is sunk when hits attack all ship', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([8,4],2, false);
    gameboard.recieveAttack([8,4]);
    gameboard.recieveAttack([9,4]); 
    expect(gameboard.isSunk([8,4])).toBe(true);
})

test('check if all ships are sunk when one ship is hit', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([0,1], 4, false);
    gameboard.recieveAttack([1,1]);
    expect(gameboard.isAllSunk()).toBe(false);
})

test('check if all ships are sunk when one ship is hit fully', () => {
        const gameboard = new Gameboard(10);
        gameboard.placeShip([4,4], 4, false);
        gameboard.recieveAttack([4,4]);
        gameboard.recieveAttack([5,4]);
        gameboard.recieveAttack([6,4]);
        gameboard.recieveAttack([7,4]);
        expect(gameboard.isAllSunk()).toBe(true);
})

test('check if all ships are sunk when one ship is hit fully but there is another ship not hit', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([4,4], 4, false);
    gameboard.placeShip([4,5], 4, false);
    gameboard.recieveAttack([4,4]);
    gameboard.recieveAttack([5,4]);
    gameboard.recieveAttack([6,4]);
    gameboard.recieveAttack([7,4]);
    expect(gameboard.isAllSunk()).toBe(false);
})

test('check if all ships are sunk when all ships are hit fully', () => {
    const gameboard = new Gameboard(10);
    gameboard.placeShip([4,4], 4, false);
    gameboard.placeShip([2,8], 4, false);
    gameboard.recieveAttack([4,4]);
    gameboard.recieveAttack([5,4]);
    gameboard.recieveAttack([6,4]);
    gameboard.recieveAttack([7,4]);
    gameboard.recieveAttack([2,8]);
    gameboard.recieveAttack([3,8]);
    gameboard.recieveAttack([4,8]);
    gameboard.recieveAttack([5,8]);
    expect(gameboard.isAllSunk()).toBe(true);
})

test('check if ship sunk when place a ship vertically', ()=> {
    const gameboard = new  Gameboard(10);
    gameboard.placeShip([0,0], 2, true);
    gameboard.recieveAttack([0,0]);
    gameboard.recieveAttack([0,1]);

    expect(gameboard.isAllSunk()).toBe(true)
})

test('check if ship sunk when attack is in the same spot', ()=> {
    const gameboard = new  Gameboard(10);
    gameboard.placeShip([0,0], 2, true);
    gameboard.recieveAttack([0,0]);
    gameboard.recieveAttack([0,0]);
    console.log(gameboard);

    expect(gameboard.isAllSunk()).toBe(false);
})