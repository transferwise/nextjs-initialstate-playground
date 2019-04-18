import * as React from 'react';
import { ArticleLink } from './article-link';
import { MemoryRouter } from 'react-router';
import { mount } from 'enzyme';

describe('Article Link', () => {
  it('matches snapshot', () => {
    const component = createComponent();

    expect(component.getElement()).toMatchSnapshot();
  });

  it('shows StarIcon if property is set to true', () => {
    let component = createComponent({ showStarIcon: true });
    expect(component.find('.tw-icon').exists()).toBe(true);

    // component.setProps does not work since we needed to wrap the component in MemoryRouter
    component = createComponent({ showStarIcon: false });
    expect(component.find('.tw-icon').exists()).toBe(false);
  });

  it('encodes URI for non latin-characters in the list', () => {
    const component = createComponent({ articleSlug: '13/本当の', topicSlug: '1/ خبيتي' });
    component.update();

    const link = component.find('a').get(0);

    expect(link.props.href).toEqual('/1/%20%D8%AE%D8%A8%D9%8A%D8%AA%D9%8A/13/%E6%9C%AC%E5%BD%93%E3%81%AE');
  });
});

function createComponent({
  articleSlug = '123/article-link',
  topicSlug = '13/topic-slug',
  title = 'Article Link',
  parentTopic = '',
  showStarIcon = false,
} = {}) {
  return mount(
    <MemoryRouter>
      <ArticleLink articleSlug={articleSlug} topicSlug={topicSlug} title={title} showStarIcon={showStarIcon} />
    </MemoryRouter>
  );
}
