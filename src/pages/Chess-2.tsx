import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import Chessboard2 from "../tools/chessboard-2";
import getCustomPieces from "../tools/pieces";
import { handleMoveSounds, playGameStartSound } from "../tools/sound";

export default function ChessGame2() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
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
      handleMoveSounds(newGame, move);
      return true;
    }

    handleMoveSounds(newGame, null);
    return false;
  };

  return (
    <div>
      <Chessboard2
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation="white"
        customPieces={customPieces}
      />
    </div>
  );
}
