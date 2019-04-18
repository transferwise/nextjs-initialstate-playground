/* eslint-disable */

import * as React from 'react';
import { Fragment } from 'react';

module.exports = {
  Message: ({ children }: any) => <Fragment>{children}</Fragment>,
  WithTranslations: ({ children }: any) => children({ translate: (key: any) => key }),
  Provider: ({ children }: any) => children,
};
