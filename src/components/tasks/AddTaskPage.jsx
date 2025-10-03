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
import Link from "next/link";
import useTaskStore from "@/store/taskstore";

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
  
  // Zustand store
  const addTask = useTaskStore((state) => state.addTask);

  const [form, setForm] = useState({
    title: "",
    dueDate: null,
    assignee: "Select",
    priority: "Select",
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

    // Add task to Zustand store
    const newTask = {
      name: form.title,
      dueDate: form.dueDate.format("YYYY-MM-DD"),
      assignee: form.assignee,
      priority: form.priority,
      status: form.status,
      description: form.description,
    };
    
    addTask(newTask);
    
    console.log("New task:", newTask);
    router.push("/");
  };

  // Shared styles for fields to match Figma
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": { borderColor: "#E5E7EB" },
      "&:hover fieldset": { borderColor: "#C7CDD3" },
      "&.Mui-focused fieldset": { borderColor: "#546FFF" },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Card sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, boxShadow: 1 }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 4 }}>
              Create New Task
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
                    size="small"
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
                          size: "small",
                          error: !!errors.dueDate,
                          helperText: errors.dueDate,
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
                      <InputLabel>Assignee</InputLabel>
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
                    <InputLabel>Priority</InputLabel>
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
                      <InputLabel>Status</InputLabel>
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
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "16px",
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