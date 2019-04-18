import * as React from 'react';

import { mount } from 'enzyme';

import { Footer } from './footer';
import { Locale } from '../common/locale';

describe('Footer', () => {
  it('matches snapshot', () => {
    const component = createComponent();

    expect(component.getElement()).toMatchSnapshot();
  });

  it('has lang param on contact us link', () => {
    const component = createComponent(Locale.FR);

    const link = component.find('a').get(0);

    expect(link.props.href).toContain(`?lang=fr`);
  });
});

function createComponent(locale: Locale = Locale.EN) {
  return mount(<Footer locale={locale} />);
}
