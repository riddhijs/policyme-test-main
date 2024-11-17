import { CLASS_LIST } from './consts';
import { AttributeList } from './types';

export const getEligibleClasses = (
  attributes: { name: string; value: number }[]
) => {
  const characterAttributes = attributes.reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(CLASS_LIST)
    .filter(([className, requiredAttributes]) =>
      Object.entries(requiredAttributes).every(
        ([key, requiredValue]) => characterAttributes[key] >= requiredValue
      )
    )
    .map(([className]) => className);
};

export const getModifierValue = (value: number) => {
  return Math.floor((value - 10) / 2);
};

export const calculateTotalSkillPoints = (attributes): number => {
  const intelligence =
    attributes.find((attr) => attr.name === 'Intelligence')?.value || 0;
  const intelligenceModifier = getModifierValue(intelligence);
  return Math.max(0, 10 + 4 * intelligenceModifier); // Ensure total points are at least 0
};
