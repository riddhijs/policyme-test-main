import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../consts';
import { RootState } from './store';
import { Attributes, CharactersState } from '../types';
import {
  calculateTotalSkillPoints,
  getEligibleClasses,
  getModifierValue,
} from '../utils';
const defaultAttributes = ATTRIBUTE_LIST.map((attribute) => ({
  name: attribute,
  value: 10, // assigning defualt value to 10
}));

const initialState: CharactersState = {
  characters: {},
  currentCharacter: null,
};
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentCharacter: (state, action: PayloadAction<string>) => {
      const newCharacter = action.payload;

      if (!state.characters[newCharacter]) {
        state.characters[newCharacter] = {
          attributes: defaultAttributes,
          classMatch: [],
          skills: SKILL_LIST.map((skill) => ({
            name: skill.name,
            pointsSpend: 0,
            totalValue: 0,
            attributeModifier: skill.attributeModifier,
          })),
          totalPoints: calculateTotalSkillPoints(defaultAttributes),
        };
      }

      state.currentCharacter = newCharacter;
    },
    attributeValueIncrement: (state, action) => {
      const currentCharacterKey = state.currentCharacter;
      if (!currentCharacterKey) return;
      const character = state.characters[currentCharacterKey];
      if (!character) return;

      const attribute = character.attributes.find(
        (attr) => attr.name === action.payload
      );
      attribute.value++;
      character.classMatch = getEligibleClasses(character.attributes || []);
      character.totalPoints = calculateTotalSkillPoints(character.attributes);
    },
    attributeValueDecrement: (state, action) => {
      const currentCharacterKey = state.currentCharacter;
      if (!currentCharacterKey) return;
      const character = state.characters[currentCharacterKey];
      if (!character) return;

      const attribute = character.attributes.find(
        (attr) => attr.name === action.payload
      );
      attribute.value--;
      character.classMatch = getEligibleClasses(character.attributes || []);
      character.totalPoints = calculateTotalSkillPoints(character.attributes);
    },
    allocateSkillPoints: (state, action) => {
      const { skillName, points, type } = action.payload;
      console.log(action.payload);
      const currentCharacterKey = state.currentCharacter;
      if (!currentCharacterKey) return;
      const character = state.characters[currentCharacterKey];
      if (!character) return;
      const skill = character.skills.find((s) => s.name === skillName);
      if (!skill) return;
      //   state.totalPoints -= points;
      if (type === 'increment') {
        character.totalPoints--;
      }
      if (type === 'decrement') {
        character.totalPoints++;
      }

      skill.pointsSpend = points;
      const value =
        character.attributes.find((att) => att.name === skill.attributeModifier)
          ?.value || 0;
      console.log(value);
      skill.totalValue = skill.pointsSpend + getModifierValue(value);
    },
  },
});

export default characterSlice.reducer;

export const {
  setCurrentCharacter,
  attributeValueIncrement,
  attributeValueDecrement,
  allocateSkillPoints,
} = characterSlice.actions;
