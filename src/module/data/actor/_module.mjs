import ChessModel from "./chess.mjs";
import GameTokenModel from "./game-token.mjs";
import ChampionModel from "./champion.mjs";

const config = {
  chess: ChessModel,
  token: GameTokenModel,
  champion: ChampionModel,
};

export { ChessModel, GameTokenModel, config };
