import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
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
      display: "flex",
      ...(position === "top"
        ? { borderBottom: "2px solid black" }
        : { borderTop: "2px solid black" }),
      borderColor: "primary.light",
      p: 2
    }}
  >
    {children && (
      <Box
        sx={{
          flex: 1
        }}
      >
        {typeof children === "string" ? (
          <Typography variant="h5">{children}</Typography>
        ) : (
          children
        )}
      </Box>
    )}

    {actions && <Box sx={{ ml: 4 }}>{actions}</Box>}
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
        display: "flex",
        flexDirection: "column",
        width: "95vw",
        minHeight: "100%"
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
