// gameBoard module
const Game = (() => {

    let turn = 0;

    let gameBoard = ["","","","","","","","",""];
    //let curGameBoard = [];

    const setGameBoard = (gb) => {
        curGameBoard = [...gb];
    }

    const getGameBoard = () => {
        return gameBoard;
    }

    const updateGameBoard = (i) => {
        if (gameBoard[i] === ""){
            if (turn % 2 === 0) {
                gameBoard[i] = 'X';
            }
            else {
                gameBoard[i] = 'O';
            }
            turn++;
            checkWin();
        }  
    }
    // find an elegant solution to check for a winner
    const checkWin = () => {
        let gb = gameBoard;
        if (gb[0] === 'X' && gb[1] === 'X' && gb[2] === 'X') {
            return 'X';
        }
    }
    

    const newGame = () => {
        gameBoard = ["","","","","","","","",""];
        turn = 0;
    }

    return { updateGameBoard, getGameBoard, newGame }
    
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
    }
    return { createGameBoardListener };
})();

// player factory function
const Player = (player) => {

    this.player = player;

    const makeMove = player => {
        
    }
};
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.createGameBoardListener();
})


/*const X = Player('X');
const O = Player('O');*/