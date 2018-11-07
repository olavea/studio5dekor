import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../layouts/RootLayout";
import Hero from "../components/Hero";

const NotFoundPage = ({
  data: {
    site: {
      siteMetadata: { labels }
    }
  }
}) => (
  <Layout>
    <Hero
      size="fullheight"
      title={labels.notFoundTitle}
      subtitle={labels.notFoundContent}
    >
      <Link to="/">{labels.notFoundLink}</Link>
    </Hero>
  </Layout>
);

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPageQuery {
    site {
      siteMetadata {
        labels {
          notFoundTitle
          notFoundContent
          notFoundLink
        }
      }
    }
  }
`;
