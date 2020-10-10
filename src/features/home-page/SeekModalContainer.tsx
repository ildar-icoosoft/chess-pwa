import React, { FC } from "react";
import { SeekModal } from "./SeekModal";

const SeekModalContainer: FC<unknown> = () => {
  return <SeekModal />;

  /*const { isSeekModalVisible } = useSelector(
    (state: RootState) => state.seekModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideChallengeAiModal());
  }, [dispatch]);

  return (
    <ChallengeAiModal show={isChallengeAiModalVisible} onHide={handleHide} />
  );*/
};

export default SeekModalContainer;
