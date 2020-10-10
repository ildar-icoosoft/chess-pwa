import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeekModal } from "./SeekModal";
import { RootState } from "../../app/rootReducer";
import { hideSeekModal } from "../seek-modal/seekModalSlice";

const SeekModalContainer: FC<unknown> = () => {
  const { isSeekModalVisible } = useSelector(
    (state: RootState) => state.seekModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideSeekModal());
  }, [dispatch]);

  return <SeekModal show={isSeekModalVisible} onHide={handleHide} />;
};

export default SeekModalContainer;
