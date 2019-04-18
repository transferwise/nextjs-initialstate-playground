// import Helmet from 'react-helmet';
// import * as React from 'react';
// import { WithTranslations } from 'retranslate';
//
// interface MetaTitleProps {
//   title: string;
// }
//
// // Here we shouldn't set any restriction on the length of title: they should be concise content as they show up
// // on the UI as well. In case of articles MetaDescription has to make the article content shorter.
// export const MetaTitle: React.SFC<MetaTitleProps> = (props: MetaTitleProps) => {
//   const { title } = props;
//
//   return (
//     <WithTranslations>
//       {({ translate }: any) => (
//         <Helmet>
//           <title>{`${translate(title)} | ${translate('page.title')}`}</title>
//           {/* Twitter's twitter:title has a fallback to og:title */}
//           <meta property="og:title" content={`${translate(title)} | ${translate('page.title')}`} />
//         </Helmet>
//       )}
//     </WithTranslations>
//   );
// };
