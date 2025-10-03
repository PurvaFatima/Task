"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [role, setRole] = React.useState("Member"); // single role only
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F7F8FA",
        backgroundImage: "url(/bg.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: { xs: "center bottom", md: "left bottom" },
        backgroundSize: { xs: "120% auto", md: "70% auto" },
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          height: 560,
          borderRadius: "10px",
          boxShadow: "0px 2px 10px 0px #4C4E6438",
        }}
      >
        <CardContent sx={{ p: 4, height: "100%" }}>
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <img src="/Logo.png" alt="Taska" width={36} height={36} style={{ borderRadius: 8 }} />
            <Typography variant="h5" fontWeight={700} color="#111827">Taska</Typography>
          </Box>

          <Typography variant="h6" sx={{ color: "#6B7280", mb: 4 }}>
            Welcome to Taska! 👋🏻
          </Typography>

          <Box component="form" sx={{ display: "grid", gap: 2.5 }}>
            <TextField label="Full Name" fullWidth size="small" />
            <FormControl size="small" fullWidth>
              <Select value={role} onChange={(e) => setRole(e.target.value)} displayEmpty>
                <MenuItem value={"Member"}>Member</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Email" type="email" fullWidth size="small" />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                bgcolor: "#6B6CFF",
                "&:hover": { bgcolor: "#5a5cff" },
                height: 44,
                borderRadius: 1.5,
                fontWeight: 700,
              }}
              onClick={() => router.push("/dashboard")}
            >
              SIGN UP
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 1, color: "#6B7280" }}>
              Already have an Account? {" "}
              <Link href="/login" style={{ color: "#6B6CFF", fontWeight: 600, textDecoration: "none" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


