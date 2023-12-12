import React, { useState } from 'react';
import { Container, Menu, Input, Checkbox } from 'semantic-ui-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faMountain,
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

  const darkModeIcon = darkMode ? faSun : faMoon;
  const iconColor = darkMode ? 'white' : 'black';

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toggleTheme()
  };

  const navbarStyle = {
    backgroundColor: theme === 'light' ? 'white' : '#1B1C1D',
  };

  return (
    <Menu id="nav" style={{ ...navbarStyle,  marginBottom: "0px", color:"green" }}>
      <Container>
        <Menu.Item style={{color:theme === "light" ? "" : "rgb(33,133,208"}} as={NavLink} to="/">
          <FontAwesomeIcon icon={faHome} style={iconStyle} /> Home
        </Menu.Item>
        <Menu.Item style={{color:theme === "light" ? "" : "rgb(33,133,208"}} as={NavLink} to="/allResorts">
          <FontAwesomeIcon icon={faMountain} style={iconStyle} /> Resorts
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item style={{color: theme === "light" ? "" : "rgb(33,133,208"}} as={NavLink} to="/bookmarks">
            <FontAwesomeIcon icon={faBookmark} style={iconStyle} /> Bookmarks
          </Menu.Item>
          <Menu.Item style={{color: theme === "light" ? "" : "rgb(33,133,208"}} as={NavLink} to="/myEvents">
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
              style={{color: "red"}}
              toggle
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <FontAwesomeIcon style={{marginLeft:"8px"}}icon={darkModeIcon} color={iconColor} />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
