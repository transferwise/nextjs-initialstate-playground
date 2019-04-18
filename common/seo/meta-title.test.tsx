import * as React from 'react';
import { mount } from 'enzyme';
import Helmet from 'react-helmet';
import { MetaTitle } from './meta-title';

describe('Meta Title', () => {
  const testTitle = 'This is a really good joke: nobody speaks, nobody gets choked';

  it('adds both HTML title and open graph title', () => {
    mount(<MetaTitle title={testTitle} />);

    const helmetContent = Helmet.peek();
    const titleTag = (helmetContent as any).title;
    const openGraphMeta = (helmetContent as any).metaTags[0];

    expect(titleTag).toContain(testTitle);
    expect(openGraphMeta).toHaveProperty('property', 'og:title');
    expect(openGraphMeta).toHaveProperty('content');
    expect(openGraphMeta.content).toContain(testTitle);
  });

  it('adds "| TransferWise Help Center" to the end of title', () => {
    const expectedTitle = `${testTitle} | page.title`;

    mount(<MetaTitle title={testTitle} />);

    const helmetContent = Helmet.peek();
    const titleTag = (helmetContent as any).title;
    const openGraphMeta = (helmetContent as any).metaTags[0];

    // HTML title and open graph title should receive the same value
    expect(titleTag).toEqual(expectedTitle);
    expect(openGraphMeta.content).toEqual(expectedTitle);
  });
});
