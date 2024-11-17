import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { CLASS_LIST } from '../consts';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ClassModal from './ClassModal';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { getClassMatch } from '../store/selectors';

const ClassContainer = styled(Box)`
display:'flex'

`;
type ClassesProps = {
  classMatch: string[];
};
const Classes: React.FC<ClassesProps> = ({ classMatch }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const modalRef = useRef(null);

  const handleClassClick = (className: string) => {
    setSelectedClass(className);
    modalRef.current?.open();
  };
  return (
    <ClassContainer>
      <div style={{ display: 'grid', gap: 10 }}>
        {Object.keys(CLASS_LIST).map((className, i) => {
          const isMatched = classMatch.includes(className);
          return (
            <Card
              key={i}
              variant='outlined'
              style={{
                width: '200px',
                border: `5px solid ${isMatched ? 'blue' : 'white'}`,
              }}
            >
              <CardContent>
                <div style={{ display: 'grid' }}>
                  <Typography
                    variant='h6'
                    sx={{ padding: 2, textAlign: 'center' }}
                  >
                    {className}
                  </Typography>
                  <IconButton>
                    <RemoveRedEyeIcon
                      onClick={() => handleClassClick(className)}
                    />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <ClassModal
        ref={modalRef}
        requirement={CLASS_LIST[selectedClass]}
        className={selectedClass}
      ></ClassModal>
    </ClassContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return { classMatch: getClassMatch(state) };
};
export default connect(mapStateToProps)(Classes);
