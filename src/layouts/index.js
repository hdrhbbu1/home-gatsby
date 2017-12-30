import React, { Component } from "react";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import { Segment, Icon, Container, Sidebar } from "semantic-ui-react";

import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";
import config from "../../data/SiteConfig";

import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";

export const menuItems = [
  { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
  { name: "About", path: "/about/", exact: true, icon: "info circle" },
  { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" },
];

class MainLayout extends Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "tags/") {
      title = "Tags";
    } else if (currentPath === "categories/") {
      title = "Categories";
    } else if (currentPath === "about/") {
      title = "About";
    } else if (currentPath.includes("posts")) {
      title = "Article";
    } else if (currentPath.includes("tags/")) {
      const tag = currentPath
        .replace("tags/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `Tagged in ${capitalize(tag)}`;
    } else if (currentPath.includes("categories/")) {
      const category = currentPath
        .replace("categories/", "")
        .replace("/", "")
        .replace("-", " ");
      title = `${capitalize(category)}`;
    }
    return title;
  }

  render() {
    const { pathname } = this.props.location;
    const isHome = pathname === "/";

    return (
      <div>
        <Helmet>
          <title>{`${config.siteTitle} | ${this.getLocalTitle()}`}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>

        <Sidebar.Pushable as={Segment}>
          <SidebarMenu Link={Link} pathname={pathname} items={menuItems} visible={false} />
          <Sidebar.Pusher style={{ minHeight: "100vh" }}>
            {/* Header */}
            {isHome ? null : <HeaderMenu
              Link={Link}
              pathname={pathname}
              items={menuItems}
            />}

            {/* Render children pages */}
            <div style={{ paddingBottom: 60 }}>
              {this.props.children()}
            </div>

            {/* Footer */}
            <Segment inverted vertical style={{ position: "absolute", bottom: 0, width: "100%" }}>
              <Container textAlign="center">
                <p>Powered with <Icon name="heart" /> by AquaBuBu</p>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default MainLayout;
