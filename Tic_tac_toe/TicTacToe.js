import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    checkWinner();
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        style={styles.square}
        onPress={() => handlePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer("X");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      {winner && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {winner === "Draw" ? "It's a Draw!" : `Player ${winner} wins!`}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  board: {
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    fontSize: 40,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    marginBottom: 10,
  },
  resetButton: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 18,
  },
});

export default TicTacToe;
