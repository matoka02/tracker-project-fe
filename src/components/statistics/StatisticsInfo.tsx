import { Box, List, ListItem, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// ----------------------------------------------------------------------

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.variable.bgStatistic,
  marginBottom: '40px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: 'auto',
    marginTop: '6px',
    width: 'auto',
  },
}));

const InfoList = styled(List)({
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

// const InfoItem = styled(ListItem)({
//   '&:not(:last-child)': {
//     marginRight: '20px',
//   },
// });

const InfoDay = styled(Typography)(({ theme }) => ({
  color: theme.variable?.titleAvatar,
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 400,
  margin: 0,
  '&::before': {
    // display: 'block',
    content: '" "',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#FFD2DD',
    display: 'inline-block',
    marginRight: '8px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
}));

const InfoMonth = styled(Typography)(({ theme }) => ({
  color: theme.variable?.titleAvatar,
  fontSize: '14px',
  lineHeight: '18px',
  fontWeight: 400,
  margin: 0,
  '&::before': {
    // display: 'block',
    content: '" "',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#3E85F3',
    display: 'inline-block',
    marginRight: '8px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
}));

// ----------------------------------------------------------------------

function StatisticsInfo(): React.ReactElement {
  const theme = useTheme();

  return (
    <InfoBox>
      <InfoList>
        <ListItem>
          <InfoDay variant="body1" theme={theme}>
            By Day
          </InfoDay>
        </ListItem>
        <ListItem>
          <InfoMonth variant="body1" theme={theme}>
            By Month
          </InfoMonth>
        </ListItem>
      </InfoList>
    </InfoBox>
  );
}

export default StatisticsInfo;
