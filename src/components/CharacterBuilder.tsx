import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setCurrentCharacter } from '../store/characterSlice';
import AttributesList from './AttributesList';
import Classes from './Classes';
import SkillList from './SkillList';
type Props = {
  currentCharacter: string;
  setCurrentCharacter: (charcterName: string) => void;
};
const CharacterBuilder: React.FC<Props> = ({
  setCurrentCharacter,
  currentCharacter,
}) => {
  return (
    <div>
      <button
        disabled={currentCharacter !== null}
        onClick={() => setCurrentCharacter('character1')}
      >
        Start With Character One
      </button>

      {currentCharacter !== null && (
        <div style={{ display: 'flex', gap: 20 }}>
          <AttributesList />
          <Classes />
          <SkillList />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    currentCharacter: state.characters.currentCharacter,
  };
};
const mapDispatchToState = (dispatch: AppDispatch) => {
  return {
    setCurrentCharacter: (characterName: string) =>
      dispatch(setCurrentCharacter(characterName)),
  };
};
export default connect(mapStateToProps, mapDispatchToState)(CharacterBuilder);
