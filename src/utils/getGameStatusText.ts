import Game from "../interfaces/Game";

export default (game: Game): string => {
  if (game.status === "started") {
    if (game.btime === 0) {
      return "Time out • White is victorious";
    }
    if (game.wtime === 0) {
      return "Time out • Black is victorious";
    }
  }

  if (game.status === "resign") {
    if (game.winner === "black") {
      return "White resigned • Black is victorious";
    }
    if (game.winner === "white") {
      return "Black resigned • White is victorious";
    }
  }

  return "Playing right now";
};
