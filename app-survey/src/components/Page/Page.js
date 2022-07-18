import { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const PageHeader = ({
  position = "top",
  actions,
  forwardRef,
  children
}) => {
  // ResponsiveUI
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const borderSize = isBigScreen ? 2 : 1;
  const borderColor = isBigScreen ? "primary.light" : "#ddd";

  return (
    <Box
      ref={forwardRef}
      sx={{
        ...(position === "top"
          ? { borderBottom: `${borderSize}px solid black` }
          : { borderTop: `${borderSize}px solid black` }),
        borderColor,
        p: { xs: 1, sm: 2 }
      }}
    >
      <Grid container justifyContent={"space-between"}>
        {children && (
          <Grid item>
            {typeof children === "string" ? (
              <Typography variant="h5">{children}</Typography>
            ) : (
              children
            )}
          </Grid>
        )}

        {actions && (
          <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
            <Stack direction="row" spacing={2}>
              {actions}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export const Page = ({
  title,
  headerActions,
  footer,
  footerActions,
  withPadding,
  children,
  ...props
}) => {
  const loopRef = useRef();
  const containerRef = useRef();
  const headerRef = useRef();
  const footerRef = useRef();

  // ResponsiveUI
  const theme = useTheme();
  const maxWidth = theme.breakpoints.values.md;

  // Calculate Page's body's height:
  const [bodyHeight, setBodyHeight] = useState(null);
  useEffect(() => {
    const loop = () => {
      if (!containerRef.current.offsetHeight) {
        loopRef.current = setTimeout(loop);
        return;
      }

      setBodyHeight(
        containerRef.current.offsetHeight -
          (headerRef.current ? headerRef.current.offsetHeight : 0) -
          (footerRef.current ? footerRef.current.offsetHeight : 0)
      );
    };

    loop();

    return () => clearTimeout(loopRef.current);
  }, []);

  return (
    <Paper
      ref={containerRef}
      {...props}
      sx={{
        height: "100%",
        width: "100%",
        maxWidth,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {(title || headerActions) && (
        <PageHeader forwardRef={headerRef} actions={headerActions}>
          {title}
        </PageHeader>
      )}
      <Box
        sx={{
          height: bodyHeight,
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          pl: withPadding ? 2 : 0,
          pr: withPadding ? 2 : 0,
          pt: withPadding ? 2 : 0,
          pb: withPadding ? 2 : 0
        }}
      >
        {children}
      </Box>
      {(footer || footerActions) && (
        <PageHeader
          forwardRef={footerRef}
          actions={footerActions}
          position="bottom"
        >
          {footer}
        </PageHeader>
      )}
    </Paper>
  );
};
