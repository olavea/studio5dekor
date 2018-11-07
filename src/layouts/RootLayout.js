import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import "../assets/index.scss";

const Layout = ({ title, description, children }) => (
  <StaticQuery
    query={graphql`
      query RootLayoutMetaQuery {
        site {
          siteMetadata {
            lang
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={title}
          meta={[
            {
              name: "description",
              content: description
            }
          ]}
        >
          <html lang={data.site.siteMetadata.lang} />
        </Helmet>
        {children}
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
