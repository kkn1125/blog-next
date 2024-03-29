import { green, grey, red } from "@mui/material/colors";

const darkTheme = {
  primary: {
    main: "#65ecdb",
  },
  secondary: {
    main: "#537871",
    dark: "#344c47",
  },
  info: {
    main: "#ffa653",
  },
  success: {
    main: green[500],
    dark: green[900],
  },
  danger: {
    main: red[500],
  },
  error: {
    main: red[500],
  },
  warning: {
    main: "#FFFADE",
  },
  white: {
    main: "#fff",
  },
  text: {
    primary: "#fff",
    secondary: grey[500],
  },
  GrayText: "#b1b1b1",
  divider: "#537871",
  contrastThreshold: 3,
  tonalOffset: 0.2,
  background: {
    // default: grey[900],
    default: "#1c1917",
  },
};

export default darkTheme;
