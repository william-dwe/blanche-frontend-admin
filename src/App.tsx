import { ConfigProvider, Skeleton } from 'antd';
import React, { Suspense } from 'react';
import { router } from './helpers/route/routes';
import { RouterProvider } from 'react-router-dom';
import theme from './helpers/theme';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <ConfigProvider theme={theme}>
        <SEO title="Blanche Admin" description="Blanche Admin page" />
        <Suspense
          fallback={
            <div style={{ margin: '10rem' }}>
              <Skeleton
                style={{
                  margin: '1rem auto',
                  width: '100%',
                  textAlign: 'center',
                }}
                paragraph={{ rows: 4 }}
              />
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
