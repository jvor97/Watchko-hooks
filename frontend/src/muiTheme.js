import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#847f12"
    },
    secondary: {
      main: "#696410"
    }
  },
  overrides: {
    MuiTypography: {
      h3: {
        textTransform: "uppercase"
      },
      h4: {
        textTransform: "uppercase"
      }
    }
  }
});
