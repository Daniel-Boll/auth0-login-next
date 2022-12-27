import { Box, Button } from "@pankod/refine-mui";

export const Login: React.FC = () => {
  return (
    <Box
      sx={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <img src="./refine.svg" alt="Refine" />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.assign("/api/auth/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </Box>
  );
};
