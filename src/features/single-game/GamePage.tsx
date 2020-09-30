import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { SingleGameContainer } from "./SingleGameContainer";
import { SingleGameMetaContainer } from "./SingleGameMetaContainer";
import { SingleGameControlPanelContainer } from "./SingleGameControlPanelContainer";
import { SingleGameBoardContainer } from "./SingleGameBoardContainer";

interface GamePageParams {
  id: string;
}

const GamePage: FC<unknown> = () => {
  const { id } = useParams<GamePageParams>();

  const idAsNumber = Number(id);

  return (
    <>
      <SingleGameMetaContainer id={idAsNumber} />
      <SingleGameControlPanelContainer id={idAsNumber} />
      <SingleGameBoardContainer id={idAsNumber} />
    </>
  );
};

export default GamePage;
