export const playStartGameSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/_Iu1lae/sound/standard/GenericNotify.ogg"
  );

  audio.play().catch(() => {});
};

export const playEndGameSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/_Iu1lae/sound/standard/GenericNotify.ogg"
  );
  audio.play();
};

export const playMoveSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/sound/standard/Move.ogg"
  );
  audio.play();
};
