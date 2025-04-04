import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Chessboard1 from "../tools/chessboard-1";
import getCustomPieces from "../tools/pieces";
import { handleMoveSounds, playGameStartSound } from "../tools/sound";

export default function ChessGame1() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );
  const customPieces = getCustomPieces();

  useEffect(() => {
    setFen(game.fen());
    playGameStartSound();
  }, []);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: sourceSquare, to: targetSquare });

    if (move) {
      setGame(newGame);
      setFen(newGame.fen());
      setBoardOrientation((prev) => (prev === "white" ? "black" : "white")); // Rotate board
      handleMoveSounds(newGame, move);
      return true;
    }

    handleMoveSounds(newGame, null);
    return false;
  };

  return (
    <div>
      <Chessboard1
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={boardOrientation}
        customPieces={customPieces}
      />
    </div>
  );
}
