// src/components/tasks/AddTaskPage.jsx
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const priorityOptions = ["Low", "Normal", "High"];
const statusOptions = ["Pending", "Active", "Closed"];
const assigneeOptions = [
  "Select",
  "Saud Shaikh",
  "Muhammad Zubair",
  "Muhammad Mubashir",
  "Sahir Shah",
  "Syed Muqarrab",
  "Muhammad Saeed",
];

export default function AddTaskPage() {
  const router = useRouter();
  const today = React.useMemo(() => dayjs(), []);

  const [form, setForm] = useState({
    title: "",
    dueDate: null,
    assignee: "Select",
    priority: "",
    status: "Pending",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.dueDate) newErrors.dueDate = "Due date is required";
    if (form.assignee === "Select") newErrors.assignee = "Assignee is required";
    if (form.dueDate && form.dueDate.isBefore(today, "day"))
      newErrors.dueDate = "Due date must be today or future";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("New task:", {
      ...form,
      dueDate: form.dueDate.format("YYYY-MM-DD"),
    });
    router.push("/dashboard");
  };

  // Shared styles for fields to match Figma
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px", // Rounded corners
      fontSize: "12px",
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#9CA3AF" },
      "&.Mui-focused fieldset": { borderColor: "#546FFF" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "12px",
      fontWeight: 500,
      color: "#374151",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: 3,
          bgcolor: "#FAFAFA",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 900,
            width: "100%",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            borderRadius: "16px",
            border: "1px solid #E5E7EB",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{
                mb: 4,
                color: "#111827",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "20px",
              }}
            >
              Create Task
            </Typography>

            {/* Form Grid */}
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Title"
                    placeholder="Creating Awesome Mobile Apps"
                    value={form.title}
                    onChange={(e) => handleChange("title")(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
                    fullWidth
                    size="large"
                    InputLabelProps={{ shrink: true }}
                    sx={fieldStyle}
                  />

                  <Box mt={3}>
                    <DatePicker
                      label="Due Date"
                      value={form.dueDate}
                      onChange={handleChange("dueDate")}
                      minDate={today}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "large",
                          error: !!errors.dueDate,
                          helperText: errors.dueDate,
                          InputLabelProps: { shrink: true },
                          placeholder: "Select date",
                          sx: fieldStyle,
                        },
                      }}
                    />
                  </Box>

                  <Box mt={3}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!errors.assignee}
                      sx={fieldStyle}
                    >
                      <InputLabel shrink>Assignee</InputLabel>
                      <Select
                        value={form.assignee}
                        onChange={(e) =>
                          handleChange("assignee")(e.target.value)
                        }
                      >
                        {assigneeOptions.map((a) => (
                          <MenuItem key={a} value={a}>
                            {a}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!errors.priority}
                    sx={fieldStyle}
                  >
                    <InputLabel shrink>Priority</InputLabel>
                    <Select
                      value={form.priority}
                      onChange={(e) => handleChange("priority")(e.target.value)}
                    >
                      {priorityOptions.map((p) => (
                        <MenuItem key={p} value={p}>
                          {p}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box mt={3}>
                    <FormControl fullWidth size="small" sx={fieldStyle}>
                      <InputLabel shrink>Status</InputLabel>
                      <Select
                        value={form.status}
                        onChange={(e) => handleChange("status")(e.target.value)}
                      >
                        {statusOptions.map((s) => (
                          <MenuItem key={s} value={s}>
                            {s}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box mt={3}>
                    <TextField
                      label="Description"
                      placeholder="Lorem ipsum dolor sit amet..."
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description")(e.target.value)
                      }
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      sx={fieldStyle}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Box mt={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#546FFF",
                    "&:hover": { bgcolor: "#3f52c5" },
                    textTransform: "none",
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "16px",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "#FFFFFF",
                    minWidth: "140px",
                    height: "48px",
                  }}
                >
                  Create Task
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
}
