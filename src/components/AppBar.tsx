import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AUTHOR, BRAND_NAME } from "@/util/global";
import { useRouter } from "next/navigation";
import { useRouter as useNavigate } from "next/router";
import Link from "next/link";
import { ColorModeContext } from "@/context/ThemeModeProvider";

const pages = [
  {
    name: "blog",
    path: "/blog/",
  },
  {
    name: "about",
    path: "/about/",
  },
];

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const colorMode = useContext(ColorModeContext) as any;
  const router = useRouter();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const settings = [
    {
      name: "theme",
      feature: () => {
        colorMode.toggleColorMode();
      },
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    handleCloseNavMenu();
    handleCloseUserMenu();
  }, [navigate.pathname]);

  return (
    <AppBar
      component={"nav"}
      position='fixed'
      sx={{
        color: "inherit",
        backgroundColor: "#ffffff56",
        backdropFilter: "blur(1rem)",
      }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            href='/'
            fontWeight={700}
            letterSpacing={"0.3rem"}
            fontFamily={`"IBM Plex Sans KR", sans-serif`}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
            }}>
            {BRAND_NAME.toUpperCase()}
          </Typography>

          <Box
            sx={{
              flex: 0,
              display: { xs: "flex", md: "none" },
            }}>
            {/* mobile hamberg */}
            <IconButton
              className='exclude'
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            {/* mobile menu */}
            <Menu
              id='menu-appbar'
              className='exclude'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                handleCloseNavMenu();
                handleCloseUserMenu();
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map(({ name, path }) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(path);
                  }}>
                  <Typography textAlign='center'>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* mobile middle */}
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flex: 1,
              justifyContent: "center",
            }}>
            <Typography
              variant='h5'
              noWrap
              component={Link}
              href='/'
              fontWeight={700}
              letterSpacing={"0.3rem"}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}>
              {BRAND_NAME.toUpperCase()}
            </Typography>
          </Box>

          {/* desktop menu */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                onClick={() => {
                  handleCloseNavMenu();
                  router.push(path);
                }}
                sx={{
                  my: 2,
                  color: (theme) => theme.palette.text.primary,
                  display: "block",
                }}>
                {name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flex: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => {
                handleCloseNavMenu();
                handleCloseUserMenu();
              }}>
              {settings.map(({ name, feature }) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    handleCloseUserMenu();
                    feature();
                  }}>
                  <Typography textAlign='center'>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
