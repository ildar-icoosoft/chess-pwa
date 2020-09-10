import React, { FC } from "react";
import { OngoingGamesContainer } from "../containers/OngoingGamesContainer";
import { Button } from "react-bootstrap";
import { challengeAi as apiChallengeAi } from "../services/api";

const HomePage: FC<unknown> = () => {
  const challengeAi = () => {
    apiChallengeAi({
      level: 3,
      color: "random",
      clockLimit: 400,
      clockIncrement: 4,
    })
      .then((res) => {
        debugger;
      })
      .catch((err) => {
        debugger;
      });
  };

  return (
    <>
      <Button variant="primary" onClick={challengeAi}>
        Challenge AI
      </Button>
      <OngoingGamesContainer />
    </>
  );
};

export default HomePage;
