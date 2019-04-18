import * as React from 'react';
import { mount } from 'enzyme';
import Helmet from 'react-helmet';
import { MetaDescription } from './meta-description';

const aVeryLongDescription = `This is a very, very long
and indeed very long description, that goes on for ages, and people just want to go home and rest while they are
reading all this horribly long piece of factually incorrect text. Maybe yes, maybe no.`;

describe('Meta Description tag', () => {
  it('adds description meta tag and shortens and strips the content from HTML', () => {
    const maxLength = 120;

    createComponent(aVeryLongDescription);

    const helmetContent = Helmet.peek();
    const metaTag = (helmetContent as any).metaTags[0];

    expect(metaTag).toHaveProperty('name', 'description');
    expect(metaTag).toHaveProperty(
      'content',
      'This is a very, very long and indeed very long description, that goes on for ages, and people just want to go home an...'
    );
    expect(metaTag.content).toHaveLength(maxLength);
  });

  it('adds open graph description and shortens if it is too long', () => {
    const openGraphMaxLength = 200;

    createComponent(aVeryLongDescription);

    const helmetContent = Helmet.peek();
    const metaTag = (helmetContent as any).metaTags[1];

    expect(metaTag).toHaveProperty('property', 'og:description');
    expect(metaTag).toHaveProperty(
      'content',
      'This is a very, very long and indeed very long description, that goes on for ages, and people just want to go home and rest while they are reading all this horribly long piece of factually incorrec...'
    );
    expect(metaTag.content).toHaveLength(openGraphMaxLength);
  });

  it('strips HTML tags from text', () => {
    createComponent(
      `<script>const evilStuff = alert; evilStuff('lol');</script><strong>Hello! I'm content being content.</strong>`
    );

    const helmetContent = Helmet.peek();
    const metaTag = (helmetContent as any).metaTags[0];

    expect(metaTag.content).toEqual("const evilStuff = alert; evilStuff('lol');Hello! I'm content being content.");
  });

  it('does not shorten description if it is short enough', () => {
    const description = 'this is a well behaving little content';
    createComponent(description);

    const helmetContent = Helmet.peek();
    const metaTag = (helmetContent as any).metaTags[0];

    expect(metaTag.content).toHaveLength(description.length);
  });
});

function createComponent(description: string) {
  return mount(<MetaDescription description={description} />);
}
