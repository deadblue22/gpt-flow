import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: 'PingFang SC, Helvetica Neue, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  heading:
    'PingFang SC, Helvetica Neue, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
};

const textStyles = {
  link: {
    color: "#0c4fa2",
    _hover: {
      color: "#1665d0",
      cursor: "pointer",
      textDecoration: "underline #1665d0",
    },
  },
};

const layerStyles = {
  primarybutton: {
    color: "white",
    backgroundColor: "primary.600",
    _hover: {
      backgroundColor: "primary.500",
    },
    _active: {
      backgroundColor: "primary.700",
    },
    _disable: {
      color: "gray.300",
      backgroundColor: "N.100",
    },
  },
  textbutton: {
    color: "gray.500",
    backgroundColor: "gray.800",
    _hover: {
      color: "gray.600",
      backgroundColor: "Z.200",
    },
    _active: {
      color: "primary.600",
      backgroundColor: "primary.200",
    },
    _disable: {
      color: "gray.300",
      backgroundColor: "gray.50",
    },
  },
};

const styles = {
  global: {
    body: {
      bgColor: "gray.50",
      bgImage: "radial-gradient(circle, #cccccc 1px, transparent 1px);",
      bgSize: "20px 20px",
    },
    "::-webkit-scrollbar": {
      backgroundColor: "#transparent",
      w: "7px",
      h: "7px",
      paddingX: "4px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "::-webkit-scrollbar-track:hover": {
      backgroundColor: "gray.50",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "gray.400",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "gray.500",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  },
};

const mdx = {
  h1: {
    mt: { base: "2rem", md: "4rem" },
    mb: ".25rem",
    lineHeight: 1.2,
    fontWeight: "bold",
    fontSize: "1.875rem",
    letterSpacing: "-.025em",
  },
  h2: {
    mt: "3rem",
    mb: "0.5rem",
    lineHeight: 1.3,
    fontWeight: "semibold",
    fontSize: "1.5rem",
    letterSpacing: "-.025em",
    "& + h3": {
      mt: "1.5rem",
    },
  },
  h3: {
    mt: "2rem",
    lineHeight: 1.25,
    fontWeight: "semibold",
    fontSize: "1.25rem",
    letterSpacing: "-.025em",
  },
  h4: {
    mt: "2rem",
    lineHeight: 1.375,
    fontWeight: "semibold",
    fontSize: "1.125rem",
  },
  a: {
    color: "brand.300",
    fontWeight: "bold",
    _hover: {
      color: "brand.400",
      cursor: "pointer",
    },
  },
  p: {
    mt: "1.25rem",
    lineHeight: 1.7,
    "blockquote &": {
      mt: 0,
    },
  },
  hr: {
    my: "4rem",
  },
  blockquote: {
    bg: "orange.100",
    borderWidth: "1px",
    borderColor: "orange.200",
    rounded: "lg",
    px: "1.25rem",
    py: "1rem",
    my: "1.5rem",
  },
  ul: {
    my: "1rem",
    ml: "1.25rem",
    "blockquote &": { my: 0 },
    "& > * + *": {
      mt: "0.25rem",
    },
  },
  code: {
    rounded: "sm",
    px: "1",
    fontSize: "0.875em",
    py: "2px",
    whiteSpace: "nowrap",
    lineHeight: "normal",
  },
};

const theme = extendTheme({
  fonts,
  textStyles,
  layerStyles,
  styles,
  mdx,
});

export default theme;
