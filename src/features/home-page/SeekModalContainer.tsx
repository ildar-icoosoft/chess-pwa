import React, { FC } from "react";
import { SeekModal } from "./SeekModal";
import { RootState } from "../../app/rootReducer";
import { useSelector } from "react-redux";

const SeekModalContainer: FC<unknown> = () => {
  const { isSeekModalVisible } = useSelector(
    (state: RootState) => state.seekModal
  );

  return <SeekModal show={isSeekModalVisible} />;

  /*

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideChallengeAiModal());
  }, [dispatch]);

  return (
    <ChallengeAiModal show={isChallengeAiModalVisible} onHide={handleHide} />
  );*/
};

export default SeekModalContainer;
