// This is temporarily common until we get rid of all old FAQ calls
export interface ArticleSlug {
  id: string;
  slug: string;
  title: string;
}

export interface ArticleLinkProps {
  articleSlug: string;
  topicSlug: string;
  title: string;
}

export interface Article extends ArticleLinkProps {
  content: string;
}
