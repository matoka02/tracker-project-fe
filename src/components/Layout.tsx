import { Box, styled } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { getAllTasks } from '@/stores/task/taskOperations';

// import { getAllTasks } from '@/stores/tasks/tasksOperations';
// import { fetchOwnReviews } from '@/stores/reviews/reviewsOperations';
// import Header from './Header';
// import SideBar from './SideBar';

const Container = styled(Box)({
  width: '100%',
  margin: '0 auto',
  '@media (min-width:375px)': {
    width: '375px',
  },
  '@media (min-width:768px)': {
    width: '768px',
  },
  '@media (min-width:1440px)': {
    width: '1440px',
  },
});

const MainLayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.variable.primaryBg,
}));

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  '@media (min-width:1440px)': {
    width: 'calc(100% - 289px)',
  },
});

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): React.ReactElement {
  const dispatch = useAppDispatch();
  // const token = useAppSelector((state) => state.auth.token);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getAllTasks());
  //     dispatch(fetchOwnReviews());
  //   }
  // }, [dispatch, token]);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  return (
    <Container>
      <MainLayoutContainer>
        {/* <SideBar /> */}
        <ContentWrapper>
          {/* <Header /> */}
          {children}
        </ContentWrapper>
      </MainLayoutContainer>
    </Container>
  );
}

export default Layout;
