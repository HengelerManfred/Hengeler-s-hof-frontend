"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--main-bg)",
          color: "var(--primary-text)",
          fontFamily: "var(--font-inter)",
        },
        icon: {
          color: "var(--primary-text)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "var(--section-bg)",
          color: "var(--primary-text)",
          borderRadius: "8px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-inter)",
          "&.Mui-selected": {
            backgroundColor: "var(--accent-2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-inter)",
          borderRadius: "8px",
        },
      },
      variants: [
        {
          props: { variant: "default" },
          style: {
            backgroundColor: "var(--accent)",
            color: "var(--main-bg)"
          },
        },
        {
          props: { variant: "headerNoImage" },
          style: {
            backgroundColor: "var(--main-bg)",
            color: "var(--primary-text)",
            border: "1px solid var(--section-border)"
          },
        }
      ]
    },
  },
});
