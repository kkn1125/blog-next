import { convertIdString } from "@/util/tool";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface CodeBlockProps {
  children: string;
  className: string;
}

const CodeBlock = (props: CodeBlockProps | any) => {
  const { filename, children, className } = props;
  const [fileName, setFileName] = useState("");
  const language = className?.split(" ").shift();

  useEffect(() => {
    if (props) {
      setFileName(filename);
    }
  }, []);

  return className ? (
    <Stack
      sx={{
        my: 3,
        position: "relative",
        [`&::before`]: {
          content: '""',
          width: "100%",
          height: "2rem",
          backgroundColor: "#555",
          display: "block",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: "hidden",
      }}>
      <Typography
        sx={{
          position: "absolute",
          top: 16 * 1,
          left: 20,
          transform: "translateY(-50%)",
          textTransform: !!filename ? "inherit" : "uppercase",
          fontWeight: 700,
          color: "#ffffff",
        }}>
        {!!filename ? fileName : language.split("-").pop()}
      </Typography>
      <Box
        sx={{
          width: 15,
          height: 15,
          backgroundColor: "#f56767",
          borderRadius: "50%",
          position: "absolute",
          top: 16 * 1,
          right: 80,
          transform: "translateY(-50%)",
          transition: "150ms ease",
          [`&:hover`]: {
            transform: "translateY(-50%) scale(1.1)",
          },
        }}
      />
      <Box
        sx={{
          width: 15,
          height: 15,
          backgroundColor: "#e9ce63",
          borderRadius: "50%",
          position: "absolute",
          top: 16 * 1,
          right: 50,
          transform: "translateY(-50%)",
          transition: "150ms ease",
          [`&:hover`]: {
            transform: "translateY(-50%) scale(1.1)",
          },
        }}
      />
      <Box
        sx={{
          width: 15,
          height: 15,
          backgroundColor: "#68ee85",
          borderRadius: "50%",
          position: "absolute",
          top: 16 * 1,
          right: 20,
          transform: "translateY(-50%)",
          transition: "150ms ease",
          [`&:hover`]: {
            transform: "translateY(-50%) scale(1.1)",
          },
        }}
      />
      <Box
        sx={{
          display: "inline-block",
          background: "#2b2b2b",
        }}>
        <Box
          component='pre'
          className={className}
          sx={{
            overflow: "auto",
            p: "0 !important",
          }}>
          <Box
            component='code'
            className={className}
            sx={{
              ".code-line": {
                px: 2,
              },
            }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Stack>
  ) : (
    <Box
      component='code'
      sx={(theme) => ({
        borderRadius: "0.3rem",
        color: "#ffffff !important",
        fontSize: theme.typography.pxToRem(14),
        backgroundColor: theme.palette.secondary.main,
        px: 1.2,
        py: 0.5,
        mx: 0.5,
      })}>
      {children}
    </Box>
  );
};

const Pre = (props: any) => {
  const { children, ...rest } = props;
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...rest });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
};

const Paragraph = ({ children }: any) => (
  <Box
    sx={{
      lineHeight: `calc(1em * 1.65)`,
    }}>
    {children}
  </Box>
);

const Figure = ({ children }: any) => <>{children}</>;

const BlockQuote = ({ children }: any) => (
  <Box
    component='blockquote'
    sx={{
      borderLeft: (theme) => `5px solid ${theme.palette.text.primary}`,
      mx: 0,
      my: 5,
      py: 0,
      pl: 3,
      backgroundColor: (theme) => theme.palette.background.paper,
      color: (theme) => theme.palette.text.primary,
      "& a": {
        color: "inherit",
      },
    }}>
    {children}
  </Box>
);

const Hr = ({ children }: any) => (
  <Divider sx={{ my: 3, width: "100%" }} flexItem />
);

const HeaderText =
  (order: 1 | 2 | 3 | 4 | 5 | 6 = 1) =>
  ({ children }: any) =>
    (
      <Box
        component={`h${order}`}
        id={convertIdString((children as string)[1] || "")}
        sx={{
          position: "relative",
          scrollMarginTop: 65,
          "& a": {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          "&::before": {
            content: '"📑 "',
          },
        }}>
        {children}
      </Box>
    );

const ALink = ({ children, ...rest }: any) => (
  <Box
    component={Link}
    {...rest}
    sx={{
      textDecoration: "none",
      color: (theme) => theme.palette.primary.main,
      fontWeight: 400,
      display: "inline-block",
    }}>
    {children}
  </Box>
);

const Table = ({ children }: any) => (
  <Box
    component='table'
    sx={{
      my: 2,
      borderCollapse: "collapse",
      "& :is(thead,tbody)": {
        "tr :is(th,td)": {
          borderWidth: 1,
          borderColor: "#cccccc",
          borderStyle: "solid",
          textAlign: "center",
        },
      },
      "& thead": {
        "tr th": {
          borderTop: "none",
          py: 1,
        },
        "th:nth-of-type(1)": {
          borderLeft: "none !important",
        },
        "th,th:last-child": {
          borderRight: "none !important",
        },
        tr: {
          borderBottom: "3px solid #cccccc",
          textTransform: "uppercase",
        },
      },
      "& tbody": {
        "tr:last-child td": {
          borderBottom: "none !important",
        },
        tr: {
          "td:nth-of-type(1)": {
            borderLeft: "none !important",
          },
          "td,td:last-child": {
            borderRight: "none !important",
          },
        },
      },
    }}>
    {children}
  </Box>
);

export default {
  CodeBlock,
  Pre,
  Paragraph,
  Figure,
  BlockQuote,
  Hr,
  HeaderText,
  ALink,
  Table,
};
