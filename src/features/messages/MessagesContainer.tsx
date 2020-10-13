import React, { FC } from "react";
import { Messages } from "./Messages";

const MessagesContainer: FC<unknown> = () => {
  return <Messages />;

  /*const dispatch = useDispatch();

  const handleChallengeAi = useCallback(() => {
    dispatch(showChallengeAiModal());
  }, [dispatch]);

  const handleCreateGame = useCallback(() => {
    dispatch(showSeekModal());
  }, [dispatch]);

  return (
    <ChallengeButtons
      onChallengeAi={handleChallengeAi}
      onCreateGame={handleCreateGame}
    />
  );*/
};

export default MessagesContainer;
