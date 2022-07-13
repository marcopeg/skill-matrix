import { useRef, useState, useEffect } from "react";
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
}) => (
  <Box
    ref={forwardRef}
    sx={{
      ...(position === "top"
        ? { borderBottom: "2px solid black" }
        : { borderTop: "2px solid black" }),
      borderColor: "primary.light",
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

export const Page = ({
  title,
  headerActions,
  footer,
  footerActions,
  withPadding,
  children,
  ...props
}) => {
  const containerRef = useRef();
  const headerRef = useRef();
  const footerRef = useRef();

  // Calculate body's height:
  const [bodyHeight, setBodyHeight] = useState(null);
  useEffect(() => {
    setBodyHeight(
      containerRef.current.offsetHeight -
        (headerRef.current ? headerRef.current.offsetHeight : 0) -
        (footerRef.current ? footerRef.current.offsetHeight : 0)
    );
  }, []);

  return (
    <Paper
      ref={containerRef}
      {...props}
      sx={{
        height: "100%",
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
