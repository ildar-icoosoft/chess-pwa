import React, { FC } from "react";
import OngoingGamesContainer from "../games-list/OngoingGamesContainer";
import ChallengeButtonsContainer from "./ChallengeButtonsContainer";
import ChallengeAiModalContainer from "./ChallengeAiModalContainer";
import CompletedGamesContainer from "../games-list/CompletedGamesContainer";

const HomePage: FC<unknown> = () => {
  return (
    <>
      <ChallengeAiModalContainer />
      <div className="d-flex justify-content-center">
        <ChallengeButtonsContainer />
      </div>

      <h3>Playing right now</h3>
      <OngoingGamesContainer />

      <h3>Finished</h3>
      <CompletedGamesContainer />
    </>
  );
};

export default HomePage;
