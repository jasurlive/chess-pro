import { useState } from "react";
import { Chess } from "chess.js";
import Chessboard from "./chessboard";

export default function ClickToMove() {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [moveTo, setMoveTo] = useState<string | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [optionSquares, setOptionSquares] = useState<Record<string, any>>({});
  const [rightClickedSquares, setRightClickedSquares] = useState<
    Record<string, any>
  >({});

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function getMoveOptions(square: string) {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, any> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: string) {
    setRightClickedSquares({});

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    if (!moveTo) {
      const moves = game.moves({ moveFrom, verbose: true });
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );

      if (!foundMove) {
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : null);
        return;
      }

      setMoveTo(square);

      if (
        (foundMove.color === "w" &&
          foundMove.piece === "p" &&
          square[1] === "8") ||
        (foundMove.color === "b" &&
          foundMove.piece === "p" &&
          square[1] === "1")
      ) {
        setShowPromotionDialog(true);
        return;
      }

      safeGameMutate((game) =>
        game.move({ from: moveFrom, to: square, promotion: "q" })
      );
      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});
    }
  }

  function onSquareRightClick(square: string) {
    const color = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares((prev) => ({
      ...prev,
      [square]:
        prev[square]?.backgroundColor === color
          ? undefined
          : { backgroundColor: color },
    }));
  }

  function onPromotionPieceSelect(piece: string) {
    if (piece) {
      safeGameMutate((game) =>
        game.move({
          from: moveFrom!,
          to: moveTo!,
          promotion: piece[1].toLowerCase() ?? "q",
        })
      );
    }
    setMoveFrom(null);
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
  }

  return (
    <div>
      <Chessboard
        position={game.fen()}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPromotionPieceSelect={onPromotionPieceSelect}
        arePiecesDraggable={false}
        customSquareStyles={{ ...optionSquares, ...rightClickedSquares }}
        promotionToSquare={moveTo}
        showPromotionDialog={showPromotionDialog}
      />
    </div>
  );
}
