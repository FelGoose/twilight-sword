import ChampionModel from "./champion.mjs";
import ChessModel from "./chess.mjs";
import GameTokenModel from "./game-token.mjs";

const config = {
  champion: ChampionModel,
  chess: ChessModel,
  token: GameTokenModel,
};

export { ChampionModel, ChessModel, GameTokenModel, config };
