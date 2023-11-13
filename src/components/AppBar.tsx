import {
  CommentContext,
  CommentDispatchContext,
  CommentType,
} from "@/context/CommentProvider";
import { PostDispatchContext, POST_INIT } from "@/context/PostProvider";
import { ColorModeContext } from "@/context/ThemeModeProvider";
import articleJson from "@/database/metapost/posts.json";
import { BRAND_BW_LOGO, BRAND_LOGO, BRAND_NAME, PROFILE } from "@/util/global";
import {
  compareWithOrigin,
  getComments,
  getVisitantHtml,
  resConvertData,
  uuidv4,
  validTime,
  visitCount,
} from "@/util/tool";
import MenuIcon from "@mui/icons-material/Menu";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Stack, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRouter as useNavigate } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import SearchBar from "./SearchBar";
import Visitants from "./Visitants";
import LaunchIcon from "@mui/icons-material/Launch";

const pages = [
  {
    name: "blog",
    path: "/blog/",
  },
  // {
  //   name: "category",
  //   path: "/categories/",
  // },
  // {
  //   name: "tag",
  //   path: "/tags/",
  // },
  {
    name: "about",
    path: "/about/",
  },
  {
    name: "games",
    path: "/games/",
  },
  {
    name: "portfolio",
    path: "https://kkn1125.github.io/portfolio-renew/",
    outlink: true,
  },
  {
    name: "wiki",
    path: "https://kkn1125.github.io/wiki/",
    outlink: true,
  },
];

function ResponsiveAppBar() {
  const theme = useTheme();

  const commentList = useContext(CommentContext);
  const commentDispatch = useContext(CommentDispatchContext);
  const postDispatch = useContext(PostDispatchContext);
  const colorMode = useContext(ColorModeContext) as any;

  const router = useRouter();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);

  const settings = [
    {
      name:
        theme.palette.mode === "dark" ? <WbSunnyIcon /> : <NightsStayIcon />,
      feature: () => {
        colorMode.toggleColorMode();
      },
    },
    {
      name: "portfolio",
      feature: () => {
        router.push("https://kkn1125.github.io/portfolio/#home");
      },
    },
    {
      name: "resume",
      feature: () => {
        router.push("https://kkn1125.github.io/portfolio/#resume");
      },
    },
    {
      name: "wiki",
      feature: () => {
        router.push("https://kkn1125.github.io/wiki/");
      },
    },
  ];

  const [visitor, setVisitor] = useState({
    today: 0,
    stack: 0,
  });

  useEffect(() => {
    postDispatch({
      type: POST_INIT.INIT,
      posts: articleJson,
    });
  }, []);

  useEffect(() => {
    // visite check
    const userInfo = getUserIdentity();

    function isVisitedUser() {
      if (Object.keys(userInfo).length > 0) return true;
      else return false;
    }

    const userCheck = isVisitedUser();

    if (!userCheck) {
      checkVisite(); // update visitor count!
      setUserIdentity({
        sid: navigator.userAgent.replace(/[\s]*/gm, "") + uuidv4(),
        maxTime: new Date().getTime() + validTime,
      });
    } else {
      if (
        userInfo["sid"].startsWith(navigator.userAgent.replace(/[\s]*/gm, ""))
      ) {
        if (new Date().getTime() > new Date(userInfo["maxTime"]).getTime()) {
          checkVisite(); // update visitor count!
          userInfo["maxTime"] = new Date().getTime() + validTime;
          setUserIdentity({
            sid: userInfo["sid"],
            maxTime: userInfo["maxTime"],
          });
        } else {
        }
      }
    }

    function checkVisite() {
      visitCount()
        .then((res) => {
          // console.log("visit!");
        })
        .catch((e) => {
          // dev.log(e);
        });
    }

    function getUserIdentity() {
      if (window.localStorage) {
        if (!localStorage["userInfo"]) {
          localStorage["userInfo"] = "{}";
        } else {
          const validUserMaxTimeInfo =
            (JSON.parse(localStorage["userInfo"]) &&
              JSON.parse(localStorage["userInfo"])["maxTime"]) ||
            "";
          if (isNaN(validUserMaxTimeInfo)) {
            if (validUserMaxTimeInfo.match(/[^0-9]/gm)) {
              console.info(
                "버그 수정된 버전으로 데이터 변경이 완료되었습니다."
              );
              localStorage["userInfo"] = "{}";
            }
          } else {
            // console.warn("[Matches] data is valid.");
          }
        }
        return JSON.parse(localStorage["userInfo"]);
      }
    }

    function setUserIdentity(userData: { sid: any; maxTime: any }) {
      window.localStorage &&
        (localStorage["userInfo"] = JSON.stringify(userData));
    }

    localStorage["userInfo"] = JSON.stringify({
      sid: navigator.userAgent.replace(/[\s]*/gm, "") + uuidv4(),
      maxTime: Date.now() + 1000 * 60 * 60 * 24,
    });

    setTimeout(() => {
      getVisitantHtml()
        .then((res) => {
          const tableObj = resConvertData(res);

          const getData = {
            today: tableObj["오늘 방문자수"].split(" ").shift(),
            stack: tableObj["누적 방문자수"],
          };

          if (compareWithOrigin(getData, visitor)) {
            setVisitor({
              ...visitor,
              ...getData,
            });
          }
        })
        .catch((e) => {
          // dev.log(e);
        });
    }, 100);

    let refreshVisitant = setInterval(() => {
      getVisitantHtml()
        .then((res) => {
          const tableObj = resConvertData(res);

          const getData = {
            today: tableObj["오늘 방문자수"].split(" ").shift(),
            stack: tableObj["누적 방문자수"],
          };

          if (compareWithOrigin(getData, visitor)) {
            setVisitor(() => ({
              ...visitor,
              ...getData,
            }));
          }
        })
        .catch((e) => {
          // dev.log(e);
        });

      // 댓글 갱신
      // getComments().then((comments) => {
      //   commentDispatch({
      //     type: CommentType.LOAD,
      //     comments,
      //   });
      // });
    }, 1000 * 60 * 5);

    // 댓글 초기화
    getComments().then((comments) => {
      commentDispatch({
        type: CommentType.LOAD,
        comments,
      });
    });

    return () => clearInterval(refreshVisitant);
  }, []);

  // console.log(commentList);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleOpenSearch = (event: React.MouseEvent<HTMLElement>) => {
    setSearchOpen(!searchOpen);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  useEffect(() => {
    handleCloseNavMenu();
    // handleCloseUserMenu();
  }, [navigate.pathname]);

  return (
    <AppBar
      component={"nav"}
      position='fixed'
      sx={{
        color: "inherit",
        backgroundColor: (theme) =>
          "#" + theme.palette.background.paper.slice(1).repeat(2) + "26",
        backdropFilter: "blur(0.5rem)",
      }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Stack
            component={Link}
            href='/'
            direction='row'
            alignItems='center'
            gap={1}
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}>
            <Box component='picture'>
              {theme.palette.mode === "dark" && (
                <source srcSet={BRAND_BW_LOGO} />
              )}
              <LazyImage
                src={BRAND_LOGO}
                width={40}
                height={40}
                alt='logo'
                sx={{ display: { xs: "none", md: "flex" } }}
              />
            </Box>
            <Typography
              variant='h6'
              noWrap
              fontWeight={700}
              letterSpacing={"0.3rem"}
              fontFamily={`"IBM Plex Sans KR", sans-serif`}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
              }}>
              {BRAND_NAME.toUpperCase()}
            </Typography>
          </Stack>

          <Box
            sx={{
              flex: 0,
              display: { xs: "flex", md: "none" },
            }}>
            {/* mobile hamberg */}
            <IconButton
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
                // handleCloseUserMenu();
              }}
              sx={{
                display: { xs: "block", md: "none" },
                alignItems: "center",
              }}>
              {pages.map(({ name, path, outlink }) => (
                <Tooltip title={name} key={name}>
                  <MenuItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (outlink) {
                        window.open(path, "_blank");
                        // location.href = path;
                      } else {
                        router.push(path);
                      }
                    }}>
                    <Typography
                      textAlign='center'
                      sx={{
                        width: "100%",
                      }}>
                      {name.toUpperCase()}
                    </Typography>
                    {outlink && <LaunchIcon fontSize='small' />}
                  </MenuItem>
                </Tooltip>
              ))}
              <Visitants visitor={visitor} />
            </Menu>
          </Box>

          {/* mobile middle */}

          <Box
            component={Link}
            href='/'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}>
            <LazyImage src={BRAND_LOGO} width={40} height={40} alt='logo' />
          </Box>

          {/* desktop menu */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}>
            {pages.map(({ name, path, outlink }) => (
              <Tooltip title={name} key={name}>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    if (outlink) {
                      window.open(path, "_blank");
                      // location.href = path;
                    } else {
                      router.push(path);
                    }
                  }}
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    display: outlink ? "flex" : "block",
                    textAlign: "center",
                    alignItems: "center",
                  }}>
                  {name}
                  {outlink && <LaunchIcon fontSize='small' />}
                </Button>
              </Tooltip>
            ))}
            <Visitants visitor={visitor} />
          </Box>

          <Stack direction='row' gap={1} sx={{ flex: 0 }}>
            <Box
              sx={{
                flex: 0,
              }}>
              <Tooltip title='Search'>
                <IconButton
                  id='search-open'
                  onClick={handleOpenSearch}
                  sx={{ p: 0 }}>
                  <Avatar
                    alt={"search"}
                    sx={{
                      backgroundColor: "#a6a6a626",
                    }}>
                    🔍
                  </Avatar>
                </IconButton>
              </Tooltip>
              <SearchBar open={searchOpen} setOpen={setSearchOpen} />
            </Box>
            {/* <Box sx={{ flex: 0 }}>
              <Tooltip title="Owner's Profile" sx={{zIndex:1}}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={"devkimson"} src={PROFILE} />
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
                {settings.map(({ name, feature }, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => {
                      handleCloseUserMenu();
                      feature();
                    }}
                    sx={{
                      justifyContent: "center",
                    }}>
                    <Typography textAlign='center'>
                      {typeof name === "string" ? name.toUpperCase() : name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
