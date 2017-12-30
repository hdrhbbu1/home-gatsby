import React from "react";
import { connect } from "react-redux";
import { 
  Menu, 
  Icon, 
  Sidebar 
} from "semantic-ui-react";

const SidebarMenu = ({ Link, pathname, items, visible }) => {
  const isActive = (item) => (item.exact) ? pathname === item.path : pathname.startsWith(item.path);
  const activeItem = items.find((item) => isActive(item)) || {};
  return (
    <Sidebar 
      as={Menu} 
      animation="slide along" 
      width="thin"
      visible={visible} 
      icon="labeled" 
      vertical 
      inverted={activeItem.inverted}
    >
      {items.map((item) => {
        return (
          <Menu.Item 
            as={Link} 
            to={item.path}
            key={item.path}
            active={isActive(item)} 
          >
            <Icon name={item.icon} />
            {item.name}
          </Menu.Item>
        );
      })}
    </Sidebar>
  );
};

const mapStateToProps = (state) => ({
  visible: state.isSidebarVisible,
});

export default connect(mapStateToProps)(SidebarMenu);
