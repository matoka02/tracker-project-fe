declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
  export default content;
}

declare module '*.png';

declare module '@emotion/styled' {
  import { Theme } from '@mui/material';

  export interface MyTheme extends Theme {
    customStyles?: {
      [key: string]: any;
    };
  }
}
