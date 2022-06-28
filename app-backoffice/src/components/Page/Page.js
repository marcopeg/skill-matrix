import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const PageTitle = ({ actions, children }) => (
  <Box
    sx={{
      display: "flex",
      borderBottom: "2px solid black",
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

export const Page = ({ title, actions, withPadding, children, ...props }) => (
  <Paper
    {...props}
    sx={{
      width: "95vw",
      minHeight: "100%"
    }}
  >
    {(title || actions) && <PageTitle actions={actions}>{title}</PageTitle>}
    <Box
      sx={{
        pl: withPadding ? 2 : 0,
        pr: withPadding ? 2 : 0,
        pt: withPadding ? 2 : 0,
        pb: withPadding ? 2 : 0
      }}
    >
      {children}
    </Box>
  </Paper>
);
