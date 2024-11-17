import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AttributeList } from '../types';
import { RootState } from '../store/store';
import AttributeControl from './AttributeControl';
import { selectCurrentCharacterValue } from '../store/selectors';
type AttributesListProps = {
  attributes: AttributeList; // Attributes from Redux state
  currentCharacter: string | null;
};
const AttributesList: React.FC<AttributesListProps> = ({
  attributes,
  currentCharacter,
}) => {
  useEffect(() => {
    console.log(attributes);
  }, [attributes]);
  return (
    <div>
      {attributes.map((attr, i) => {
        return <AttributeControl key={i} {...attr} />;
      })}
    </div>
  );
};
const mapStateToProps = (state: RootState) => {
  return {
    attributes: selectCurrentCharacterValue(state) || null,
    currentCharacter: state.characters.currentCharacter,
  };
};
export default connect(mapStateToProps)(AttributesList);
