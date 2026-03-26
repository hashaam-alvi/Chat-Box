import { Box, TextField, InputAdornment, IconButton, Button, Stack, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import "./Login.css";

export default function SignUpForm({ formData, handleInputChange, handleSubmit, isError, isUserError, handleLogin }) {
  const [show, setShow] = useState(false);
  return (
    <div className="loginContainer">
      <h1 className="Loginheader">Sign-Up</h1>
      <div className="loginBody">
        <h1 className="chatHeader">Chat Box</h1>
        <Box
          className="boxBody"
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            label="User Name"
            required
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleInputChange}
            id="username"
            name="username"
            value={formData.username}
            error={isUserError}
            helperText={isUserError ? "Try a different User" : ""}
          />

          <TextField
            label="Password"
            type={show ? "text" : "password"}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow(!show)} edge="end">
                      {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleInputChange}
            id="password"
            name="password"
            value={formData.password}
            error={isError}
          />

          <TextField
            label="Confirm Password"
            type={show ? "text" : "password"}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow(!show)} edge="end">
                      {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleInputChange}
            id="confirmpassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            error={isError}
            helperText={isError ? "Password didn't Matched" : ""}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button size="large" variant="contained"   endIcon={<LoginIcon />}  onClick={handleLogin}>
              Already have an account
            </Button>
            <Button size="large"  variant="outlined" type="submit" startIcon={<PersonAddIcon />}>
              Sign-up
            </Button>
          </Stack>
        </Box>
      </div>
    </div>
  );
}
