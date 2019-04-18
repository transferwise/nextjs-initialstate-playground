// import Helmet from 'react-helmet';
// import * as React from 'react';
// import { WithTranslations } from 'retranslate';
// import striptags from 'striptags';
//
// interface MetaDescriptionProps {
//   description: string;
//   needsTranslation?: boolean;
// }
//
// // By subtracting 3 from the description lengths I have made room for the manual ellipsis (...)
// // https://searchengineland.com/google-confirms-it-shortened-search-results-snippets-after-expanding-them-last-december-298196
// const RECOMMENDED_GOOGLE_MAX_DESCRIPTION_LENGTH = 117;
//
// // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
// const RECOMMENDED_OPEN_GRAPH_MAX_DESCRIPTION_LENGTH = 197;
//
// export const MetaDescription: React.SFC<MetaDescriptionProps> = (props: MetaDescriptionProps) => {
//   const { description, needsTranslation } = props;
//
//   let metaDescription = description;
//   let openGraphDescription = description;
//
//   if (!needsTranslation) {
//     metaDescription = sanitizeAndShortenDescription(description, RECOMMENDED_GOOGLE_MAX_DESCRIPTION_LENGTH);
//     openGraphDescription = sanitizeAndShortenDescription(description, RECOMMENDED_OPEN_GRAPH_MAX_DESCRIPTION_LENGTH);
//   }
//
//   return (
//     <WithTranslations>
//       {({ translate }: any) => (
//         <Helmet>
//           <meta name="description" content={needsTranslation ? translate(description) : metaDescription} />
//           {/* Twitter's twitter:description has a fallback to og:description */}
//           <meta property="og:description" content={needsTranslation ? translate(description) : openGraphDescription} />
//         </Helmet>
//       )}
//     </WithTranslations>
//   );
// };
//
// function sanitizeAndShortenDescription(description: string, maxLength: number): string {
//   const descriptionWithoutTags = striptags(description);
//   const descriptionWithoutNewLines = descriptionWithoutTags.replace(/[\n\r]/g, ' ');
//
//   if (descriptionWithoutNewLines.length >= maxLength) {
//     return descriptionWithoutNewLines.substr(0, maxLength) + '...';
//   }
//
//   return descriptionWithoutNewLines;
// }
