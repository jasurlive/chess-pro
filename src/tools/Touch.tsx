import { useState } from "react";
import { Chess, Move } from "chess.js";
import Chessboard from "react-chessboard";

type TouchProps = {
  fen: string;
  onMove: (from: string, to: string, promotion?: string) => Move | null;
  boardOrientation?: "white" | "black";
  arePiecesDraggable?: boolean;
  animationDuration?: number;
  customPieces?: any;
};

export default function Touch({
  fen,
  onMove,
  boardOrientation = "white",
  arePiecesDraggable = true,
  animationDuration = 300,
  customPieces,
}: TouchProps) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const handlePieceDrop = (source: string, target: string) => {
    const move = onMove(source, target, "q");
    setSelectedSquare(null);
    return !!move;
  };

  const handleSquareClick = (square: string) => {
    if (!selectedSquare) {
      setSelectedSquare(square);
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    const move = onMove(selectedSquare, square, "q");

    if (move) {
      setSelectedSquare(null);
    } else {
      setSelectedSquare(null);
    }
  };

  const highlightSquare = selectedSquare
    ? { [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
    : {};

  return (
    <Chessboard
      position={fen}
      onPieceDrop={handlePieceDrop}
      onSquareClick={handleSquareClick}
      boardOrientation={boardOrientation}
      arePiecesDraggable={arePiecesDraggable}
      animationDuration={animationDuration}
      customSquareStyles={highlightSquare}
      customDarkSquareStyle={{ backgroundColor: "#779952" }}
      customLightSquareStyle={{ backgroundColor: "#edeed1" }}
      customPieces={customPieces}
    />
  );
}
