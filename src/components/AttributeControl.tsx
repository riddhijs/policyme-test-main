import { Typography } from '@mui/material';
import { connect } from 'react-redux';
import { AppDispatch } from '../store/store';
import {
  attributeValueDecrement,
  attributeValueIncrement,
} from '../store/characterSlice';
import { getModifierValue } from '../utils';

type AttributeProps = {
  name: string;
  value: number;
  increment: (name: string) => void;
  decrement: (name: string) => void;
};

const AttributeControl: React.FC<AttributeProps> = ({
  name,
  value,
  increment,
  decrement,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
        gap: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        maxWidth: 300,
        marginBottom: 2,
        textAlign: 'left',
      }}
    >
      <h3 style={{ minWidth: 140, textAlign: 'left' }}>
        {name}:{value}
      </h3>

      <Typography variant='body2'>
        {name} Modifier {getModifierValue(value)}
      </Typography>
      <button
        onClick={() => {
          increment(name);
        }}
      >
        +
      </button>
      <button
        disabled={value <= 0}
        onClick={() => {
          decrement(name);
        }}
      >
        -
      </button>
    </div>
  );
};
const mapDispatchToState = (dispatch: AppDispatch) => {
  return {
    increment: (name) => dispatch(attributeValueIncrement(name)),
    decrement: (name) => dispatch(attributeValueDecrement(name)),
  };
};
export default connect(null, mapDispatchToState)(AttributeControl);
