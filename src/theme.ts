import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    special: {
      background: "#7d7d95",
      button: "#62627c",
    },
    gray: {
      100: "#7e7983",
      200: "#5d5960",
      300: "#49464c",
    },
  },
});

export default theme;
