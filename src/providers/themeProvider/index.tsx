import React from 'react';
import { ConfigProvider } from 'antd';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2c1d79',
          borderRadius: 2,
        },
        components: {
          Button: {
            controlHeight: 42,
            controlOutline: 'none',
          },
          Input: {
            controlHeight: 45,
            controlOutline: 'none',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
