import { RootState } from './store';
export const selectCurrentCharacterValue = (state: RootState) => {
  const currentCharacterKey = state.characters.currentCharacter;

  if (!currentCharacterKey) {
    return null;
  }

  const character = state.characters.characters[currentCharacterKey];

  if (!character) {
    return null;
  }

  return character.attributes || null;
};

export const getClassMatch = (state: RootState) => {
  const currentCharacterKey = state.characters.currentCharacter;

  if (!currentCharacterKey) {
    return null;
  }

  const character = state.characters.characters[currentCharacterKey];

  if (!character) {
    return null;
  }
  return character.classMatch;
};

export const getSkillsOFCurrentCharacter = (state: RootState) => {
  const currentCharacterKey = state.characters.currentCharacter;

  if (!currentCharacterKey) {
    return null;
  }

  const character = state.characters.characters[currentCharacterKey];

  if (!character) {
    return null;
  }

  return character.skills;
};
export const getToTalPoints = (state: RootState) => {
  const currentCharacterKey = state.characters.currentCharacter;

  if (!currentCharacterKey) {
    return null;
  }

  const character = state.characters.characters[currentCharacterKey];

  if (!character) {
    return null;
  }

  return character.totalPoints;
};
