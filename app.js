// player factory function
const Player = (name, sym) => {
    
    let wins = 0;

    const updateWins = () => {
        wins++;
    }

    const getName = () => {
    if(name != ''){
        return name;
    }    
        else {
            return sym;
        }
    };
    const getSymbol = () => sym;
    const getWins = () => wins;

    return { getWins, updateWins, getSymbol, getName };
};


// gameBoard module
const Game = (() => {

    let turn;

    //let winner = "";

    let gameBoard = ["","","","","","","","",""];
    
    const getGameBoard = () => {
        return gameBoard;
    }

    const updateGameBoard = (i) => {
        if (gameBoard[i] === ""){
            if (turn % 2 === 0) {
                gameBoard[i] = playerOne.getName();
                console.log(playerOne.getName());
                if(checkWin(playerOne.getSymbol())) {
                    setWinner(playerOne.getName());
                    playerOne.updateWins();
                }
            }
            else {
                gameBoard[i] = playerTwo.getSymbol();
                console.log(playerTwo.getName());

                if(checkWin(playerTwo.getSymbol())) {
                    setWinner(playerTwo.getName());
                    playerTwo.updateWins();
                }     
            }
            turn++;
        }  
    }
    const checkWin = (sym) => {
        let gb = gameBoard;
        //horizontal checks
        if (gb[0] === sym && gb[1] === sym && gb[2] === sym) {
            return true;
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
    const getTurn = () => {
        return turn;
    }

    const newGame = () => {
        gameBoard = ["","","","","","","","",""];
        turn = 0;
        this.winner = null;
    }

    return { updateGameBoard, getGameBoard, newGame, getWinner, getTurn }
    
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
                document.location.reload();
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
                updatePlayer();
            }, 0)
        }
        if(!Game.getWinner() && Game.getTurn() === 9) {
            setTimeout(function() {
                alert(`Draw`)
                Game.newGame();
                updateDisplay();
                updatePlayer();
            }, 0)
        }
    }
    const updatePlayer = () => {
        const p1 = document.querySelector('#p1');
        const p2 = document.querySelector('#p2');

        p1.innerHTML = `${playerOne.getName()} Wins: ${playerOne.getWins()}`
        p2.innerHTML = `${playerTwo.getName()} Wins: ${playerTwo.getWins()}`
    }
  

    return { createGameBoardListener, updatePlayer };
})();


document.addEventListener('DOMContentLoaded', () => {
    this.playerOne = Player(prompt('X Name'),'X');
    this.playerTwo = Player(prompt('O Name'), 'O');
    DisplayController.createGameBoardListener();
    DisplayController.updatePlayer();
    Game.newGame();
})
