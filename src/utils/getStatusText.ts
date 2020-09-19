import Game from "../interfaces/Game";

export default (game: Game): string => {
  if (game.status === "started" && game.btime === 0) {
    return "Time out • White is victorious";
  }
  if (game.status === "started" && game.wtime === 0) {
    return "Time out • Black is victorious";
  }

  return "Playing right now";
};
