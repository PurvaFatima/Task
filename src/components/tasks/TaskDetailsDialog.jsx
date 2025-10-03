// components/tasks/TaskDetailsDialog.jsx
"use client";

import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid, Chip } from "@mui/material";
import Flag from "@mui/icons-material/Flag";
import useTaskStore from "@/store/taskstore";

const priorityColorMap = {
  Low: "#FBBF24",
  Normal: "#10B981",
  High: "#EF4444",
};

const statusColorMap = {
  Pending: "warning",
  Active: "success",
  Closed: "error",
};

export default function TaskDetailsDialog() {
  const task = useTaskStore((state) => state.detailTask);
  const setDetailTask = useTaskStore((state) => state.setDetailTask);

  const handleClose = () => setDetailTask(null);

  const formattedDueDate = task?.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  return (
    <Dialog open={!!task} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 700 }}>Task Details</DialogTitle>
      <DialogContent>
        {task && (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              {task.name}
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary">Due Date</Typography>
                <Typography variant="body1" fontWeight={600}>{formattedDueDate}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary">Assignee</Typography>
                <Typography variant="body1" fontWeight={600}>{task.assignee}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary">Priority</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Flag sx={{ color: priorityColorMap[task.priority], fontSize: 18 }} />
                  <Typography variant="body1" fontWeight={600}>{task.priority}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                <Chip 
                  label={task.status} 
                  color={statusColorMap[task.status]} 
                  size="small" 
                  sx={{ mt: 0.5, color: 'common.white', fontWeight: 600 }}
                />
              </Grid>
            </Grid>

            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="body2" color="text.primary">
                {task.description || "No description provided."}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}


