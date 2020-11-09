// player factory function
const Player = (name, sym) => {

    const getName = () => name;
    const getSymbol = () => sym;

    // var and func that track number of wins

    return { getSymbol, getName };
};

// gameBoard module
const Game = (() => {

    let turn;

    //let winner = "";

    let gameBoard = ["","","","","","","","",""];
    
    const playerOne = Player('Alex', 'X');
    const playerTwo = Player('Jim', 'O');

    const getGameBoard = () => {
        return gameBoard;
    }

    const updateGameBoard = (i) => {
        if (gameBoard[i] === ""){
            if (turn % 2 === 0) {
                gameBoard[i] = playerOne.getSymbol();
                if(checkWin(playerOne.getSymbol())) {
                    setWinner(playerOne.getName());
                }
            }
            else {
                gameBoard[i] = playerTwo.getSymbol();
                if(checkWin(playerTwo.getSymbol())) {
                    setWinner(playerTwo.getName());
                }
                
            }
            turn++;
        }  
    }
    const checkWin = (sym) => {
        let gb = gameBoard;
        //horizontal checks
        if (gb[0] === sym && gb[1] === sym && gb[2] === sym) {
            return sym;
        }
        else if (gb[3] === sym && gb[4] === sym && gb[5] === sym) {
            return true;
        }
        else if (gb[6] === sym && gb[7] === sym && gb[8] === sym) {
            return true;
        }

        //vertical checks
        else if (gb[0] === sym && gb[3] === sym && gb[6] === sym) {
            return true;
        }
        else if (gb[1] === sym && gb[4] === sym && gb[7] === sym) {
            return true;
        }
        else if (gb[2] === sym && gb[5] === sym && gb[8] === sym) {
            return true;
        }

        //diagonal checks
        else if (gb[0] === sym && gb[4] === sym && gb[8] === sym) {
            return true;
        }
        else if (gb[2] === sym && gb[4] === sym && gb[6] === sym) {
            return true;
        }
        else {
            return false;
        }
    }   
    
    const setWinner = winner => {
        this.winner = winner;
    }

    const getWinner = () => {
        return this.winner;
    }
    const newGame = () => {
        gameBoard = ["","","","","","","","",""];
        turn = 0;
        this.winner = null;
    }

    return { updateGameBoard, getGameBoard, newGame, getWinner }
    
})();

// displayController module
const DisplayController = (() => {

    const createGameBoardListener = () => {
            document.querySelectorAll('.gamebutton').forEach((e) => {
                e.addEventListener('click', (but) => {
                    Game.updateGameBoard(but.target.id);
                    updateDisplay();
                })
            },
            document.getElementById('newGame').addEventListener('click', () => {
                Game.newGame();
                updateDisplay();
            }) 
        );
    }

    const updateDisplay = () => {
        const gb = Game.getGameBoard()
        for (let i = 0; i < gb.length; i++) {
            document.getElementById(`${i}`).innerHTML = gb[i];
        }
        if (Game.getWinner()) {
            setTimeout(function() {
                alert(`${Game.getWinner()} is the winner`)
                Game.newGame();
                updateDisplay();
            }, 0)
            
        }
    }
    return { createGameBoardListener };
})();


document.addEventListener('DOMContentLoaded', () => {
    DisplayController.createGameBoardListener();
    Game.newGame();
})
