import { createTheme } from "@mui/material/styles";
import { TextField, InputBase, Avatar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MuiStack from "@mui/material/Stack";
import MuiAvatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export const DeleteCustomIcon = styled(DeleteIcon)({
  color: "#B71C1C",
});
export const CustomeEditIcon = styled(EditIcon)({
  color: "#0E369C",
});
export const AvatarStyled = styled(Avatar)({
  borderRadius: "5px",
});

export const InputTextfield = styled(TextField)({
  "& label": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#0000003B",
      borderRadius: "0",
    },
  },
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "#0e369c",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#0e369c",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderRadius: "3px",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  // ...(!open && {
  //     width: `calc(100% - 3.4%)`,
  // }),
  "& .MuiToolbar-root": {
    backgroundColor: "rgba(243, 245, 246, 1)",
  },
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#0e369c",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// export const avatar1 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#ffb300",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

// export const avatar2 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#fff",
//           border: "2px solid #9e9e9e",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

// export const avatar3 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#fff",
//           border: "2px solid #9e9e9e",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

// export const avatar4 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#fff",
//           border: "2px solid #9e9e9e",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

// export const avatar5 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#fff",
//           border: "2px solid #9e9e9e",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

// export const avatar6 = createTheme({
//   components: {
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           backgroundColor: "#ffb300",
//           color: "#000",
//           width: "72px",
//           height: "72px",
//           borderRadius: "55px",
//           position: "relative",
//           right: "10px",
//         },
//       },
//     },
//   },
// });

export const typography = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#0E369C",
        },
      },
    },
  },
});

export const typography1 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#5886FE",
        },
      },
    },
  },
});

export const typography2 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFB300",
        },
      },
    },
  },
});

export const typography3 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#D81B60",
          right: "10px",
          position: "relative",
        },
      },
    },
  },
});

export const typography4 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#0E369C",
        },
      },
    },
  },
});

export const typography5 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

export const resourceDash2 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});
export const card1 = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "url(/assets/images/Money.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          height: "100%",
          backgroundColor: "#8E24AA",
        },
      },
    },
  },
});

export const resourceDashCard = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "url(/assets/images/resourcedash.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          height: "100%",
          backgroundColor: "#8E24AA",
        },
      },
    },
  },
});

export const button = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "red",
          borderColor: "#F44336",
          textTransform: "none",
        },
      },
    },
  },
});

export const card2 = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#0E369C",
          backgroundImage: "url(/assets/images/resourceIcon-illustration.svg)",
          backgroundSize: "inherit",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          height: "100%",
        },
      },
    },
  },
});

export const typography6 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFFDE",
          position: "relative",
          top: "20px",
        },
      },
    },
  },
});

export const typography7 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          position: "relative",
          top: "90px",
          fontWeight: "600",
        },
      },
    },
  },
});

export const typography8 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          direction: "column",
          justifyContent: "flex-end",
          position: "relative",
          top: "90px",
          color: "#FFFFFF",
        },
      },
    },
  },
});

export const typography11 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#0e369c",
        },
      },
    },
  },
});

export const typography12 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#5886fe",
          marginLeft: "100px",
        },
      },
    },
  },
});

export const typography13 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffb300",
          marginLeft: "-34px",
        },
      },
    },
  },
});

export const typography14 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#d81b60",
        },
      },
    },
  },
});

export const avatar7 = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: "#5886FE",
          marginTop: "-125px",
          left: "5px",
        },
      },
    },
  },
});

export const typography9 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          bottom: "150px",
          marginRight: "190px",
        },
      },
    },
  },
});

export const typography10 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          position: "relative",
          top: "66px",
          marginLeft: "290px",
          marginBottom: "120px",
        },
      },
    },
  },
});

export const typo1 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

export const card3 = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#156CB8",
          height: "100%",
          padding: "16px,",
        },
      },
    },
  },
});

export const typograph1 = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});
export const button1 = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#F44336",
        },
      },
    },
  },
});
export const icon = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFB400",
        },
      },
    },
  },
});

export const icon1 = createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFECB3",
          color: "#FFB300",
        },
      },
    },
  },
});

export const StyledStack = styled(MuiStack)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "-webkit-fill-available",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
}));

export const StyledAvatar1 = styled(MuiAvatar)(({ theme }) => ({
  width: "72px",
  height: "72px",
  borderRadius: "55px",
  position: "relative",
  right: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "42px",
    height: "42px",
    marginTop: "0px",
  },
}));

export const Stepper = styled(MuiAvatar)(({ theme }) => ({
  width: "72px",
  height: "72px",
  borderRadius: "55px",
  position: "relative",
  right: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "42px",
    height: "42px",
    marginTop: "0px",
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    h1: {
      fontSize: 60,
      fontWeight: 300,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans- serif",
      color: "#000000DE",
      // ["@media (max-width:600px)"]: {
      //   // eslint-disable-line no-useless-computed-key
      //   fontSize: 24,
      //   fontWeight: 600,
      // },
    },
    h2: {
      fontSize: 50,
      fontWeight: 300,
      color: "#1D263F",
    },
    h3: {
      fontWeight: 400,
      fontSize: "48px",
      lineHeight: "56.02px",
    },
    h4: {
      fontSize: "34px",
      fontWeight: 600,
      color: "#000000",
      opacity: "0.8",
      lineHeight: "41.99px",
      letterSpacing: "0.25px",
    },
    h5: {
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "32.02px",
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
      color: "#000000",
      opacity: "0.8",
    },
    h7: {
      fontWeight: 600,
      fontSize: "16px",
      lineHeight: "28px",
      letterSpacing: "0.15px",
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      color: "#000000de",
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
      color: "#000000DE",
      opacity: "0.8",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      color: "rgba(0, 0, 0, 0.38)",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "20.02px",
      letterSpacing: "0.15px",
      color: "rgba(0, 0, 0, 0.5)",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0e369c",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#0e369c",
          color: "#ffffff",
          fontWeight: 600,
          textTransform: "none",
          lineHeight: "24px",
          letterSpacing: "0.4px",
        },
        outlined: {
          borderColor: "#0e369c",
          color: "#0e369c",
          textTransform: "none",
        },
        text: {
          color: "#0E369C",
          textTransform: "none",
          lineHeight: "24px",
          letterSpacing: "0.4px",
          fontSize: "15px",
          fontWeight: 600,
          "&:hover": {
            background: "none",
          },
          "&& .MuiTouchRipple-child": {
            background: "none",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#0e369c",
          textDecoration: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        Card: {
          backgroundColor: "#0E369C",
          backgroundImage: "url(/assets/images/resourceIcon-illustration.svg)",
          backgroundSize: "inherit",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          height: "100%",
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#e0e0e0",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
        },
      },
    },
  },
});

export default theme;
