import React from 'react';
import { connect } from 'react-redux';
import { getModifierValue } from '../utils';
import {
  getToTalPoints,
  selectCurrentCharacterValue,
} from '../store/selectors';
import { allocateSkillPoints } from '../store/characterSlice';

const SkillRow = ({
  name,
  pointsSpend,
  totalPoints,
  attributeModifier,
  totalValue,
  attributes,
  modifyPoints,
}) => {
  //Acrobatics -  points: 3 [+] [-] modifier (Dex): 2 total: 5`
  const attributeModifiers = attributes.reduce((acc, attr) => {
    acc[attr.name] = getModifierValue(attr.value);
    return acc;
  }, {});
  return (
    <div
      style={{
        border: '1px solid white',
        width: 500,
        //   justifyContent: 'center',
        //   display: 'flex',
        display: 'grid',
        gap: 10,
        padding: 10,
      }}
    >
      <span>
        {name} - points: :{pointsSpend}{' '}
        <button
          style={{ width: 20 }}
          disabled={totalPoints <= 0}
          onClick={() =>
            modifyPoints({
              skillName: name,
              points: pointsSpend + 1,
              type: 'increment',
            })
          }
        >
          +
        </button>{' '}
        <button
          disabled={pointsSpend <= 0}
          style={{ width: 20 }}
          onClick={() =>
            modifyPoints({
              skillName: name,
              points: pointsSpend - 1,
              type: 'decrement',
            })
          }
        >
          -
        </button>{' '}
        modifier({attributeModifier}):
        {attributeModifiers[attributeModifier]} total:{totalValue}
      </span>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    attributes: selectCurrentCharacterValue(state),
    totalPoints: getToTalPoints(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    modifyPoints: ({ skillName, points, type }) =>
      dispatch(allocateSkillPoints({ skillName, points, type })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SkillRow);
