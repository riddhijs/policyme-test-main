import React from 'react';
import { SKILL_LIST } from '../consts';
import { connect } from 'react-redux';

import SkillRow from './SkillRow';
import {
  getClassMatch,
  getSkillsOFCurrentCharacter,
  getToTalPoints,
  selectCurrentCharacterValue,
} from '../store/selectors';
import { AttributeList, Skill } from '../types';
import { RootState } from '../store/store';
type SkillProps = {
  skills: Skill[];
  classMatch: any;
  attributes: [];
  totalPoints: number;
};

const SkillList: React.FC<SkillProps> = ({
  skills,
  classMatch,
  attributes,
  totalPoints,
}) => {
  console.log(classMatch, 'class');
  if (classMatch.length === 0) {
    return <p>Please create a valid character to allocate skill points.</p>;
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <h1>TotalPointsToSpend: {totalPoints}</h1>;
      {skills.map((skillElement, i) => {
        return <SkillRow {...skillElement} key={i} />;
      })}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    skills: getSkillsOFCurrentCharacter(state),
    classMatch: getClassMatch(state),
    totalPoints: getToTalPoints(state),
    attributes: selectCurrentCharacterValue(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SkillList);
