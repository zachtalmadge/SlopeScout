import React, { useState } from 'react';
import { Container, Menu, Input, Checkbox } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMountain,
  faCalendarAlt,
  faBookmark,
  faCalendarCheck,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../contexts/ThemeProvider';

const iconStyle = {
  marginRight: '5px', // Adjust the spacing as needed
};

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const { theme, toggleTheme } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleTheme()
  };

  const navbarStyle = {
    backgroundColor: theme === 'light' ? 'white' : 'black',
  };

  return (
    <Menu id="nav" style={{ ...navbarStyle,  marginBottom: "0px", color:"green" }}>
      <Container>
        <Menu.Item color={theme === "light" ? "" : "blue"} as={Link} active to="/">
          <FontAwesomeIcon icon={faHome} style={iconStyle} /> Home
        </Menu.Item>
        <Menu.Item color={theme === "light" ? "" : "blue"} as={Link} active to="/allResorts">
          <FontAwesomeIcon icon={faMountain} style={iconStyle} /> Resorts
        </Menu.Item>
        <Menu.Item color={theme === "light" ? "" : "blue"} as={Link} active to="/events">
          <FontAwesomeIcon icon={faCalendarAlt} style={iconStyle} /> Events
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item color={theme === "light" ? "" : "blue"} as={Link} active to="/bookmarks">
            <FontAwesomeIcon icon={faBookmark} style={iconStyle} /> Bookmarks
          </Menu.Item>
          <Menu.Item color={theme === "light" ? "" : "blue"} as={Link} active to="/myEvents">
            <FontAwesomeIcon icon={faCalendarCheck} style={iconStyle} /> My Events
          </Menu.Item>
          <Menu.Item>
            <Input
            color={theme === "light" ? "" : "blue"}
              icon='search'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Menu.Item>
          <Menu.Item>
            <Checkbox
            color={theme === "light" ? "" : "blue"}
              toggle
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
