import React from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import {
  Button,
  Segment,
  Container,
  Header,
} from "semantic-ui-react";

import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { menuItems } from "../layouts";

const HomePage = (props) => {
  const postEdges = props.data.allMarkdownRemark.edges;
  return (
    <div className="index-container">
      <Helmet title={config.siteTitle} />
      <SEO postEdges={postEdges} />

      <Segment vertical inverted textAlign="center" className="masthead">
        <HeaderMenu
          Link={Link} 
          pathname={props.location.pathname} 
          items={menuItems} 
          inverted
        />
        <Container text>
          <Header inverted as="h1">AquaBuBu</Header>
          <Header inverted as="h2">Be Hypnotic and Paranoid</Header>
          <Button primary size="huge">Enjoy more!</Button>
        </Container>
      </Segment>
      
      <PostListing postEdges={postEdges} />
    </div>
  );
}

export default HomePage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query HomeQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
