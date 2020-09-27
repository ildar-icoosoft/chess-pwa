import React, { FC } from "react";
import OngoingGamesContainer from "../ongoing-games/OngoingGamesContainer";
import ChallengeButtonsContainer from "./ChallengeButtonsContainer";
import { ChallengeAiModalContainer } from "./ChallengeAiModalContainer";

const HomePage: FC<unknown> = () => {
  return (
    <>
      <ChallengeAiModalContainer />
      <ChallengeButtonsContainer />
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;
