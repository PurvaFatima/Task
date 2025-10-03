// components/tasks/TaskDetailsDialog.jsx
"use client";

import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Grid, Chip, Menu, MenuItem } from "@mui/material";
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
  const updateTaskPriority = useTaskStore((state) => state.updateTaskPriority);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [priorityAnchorEl, setPriorityAnchorEl] = React.useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = React.useState(null);

  const handleClose = () => setDetailTask(null);

  const openPriorityMenu = (event) => setPriorityAnchorEl(event.currentTarget);
  const closePriorityMenu = () => setPriorityAnchorEl(null);
  const openStatusMenu = (event) => setStatusAnchorEl(event.currentTarget);
  const closeStatusMenu = () => setStatusAnchorEl(null);

  const handlePriorityChange = (newPriority) => {
    if (task) {
      updateTaskPriority(task.id, newPriority);
    }
    closePriorityMenu();
  };

  const handleStatusChange = (newStatus) => {
    if (task) {
      updateTaskStatus(task.id, newStatus);
    }
    closeStatusMenu();
  };

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
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 }
                  }}
                  onClick={openPriorityMenu}
                >
                  <Flag sx={{ color: priorityColorMap[task.priority], fontSize: 18 }} />
                  <Typography variant="body1" fontWeight={600}>{task.priority}</Typography>
                </Box>
                <Menu
                  anchorEl={priorityAnchorEl}
                  open={Boolean(priorityAnchorEl)}
                  onClose={closePriorityMenu}
                  sx={{ 
                    '& .MuiMenu-paper': { 
                      borderRadius: 2, 
                      minWidth: 120, 
                      bgcolor: '#F0F9FF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    } 
                  }}
                >
                  {Object.keys(priorityColorMap).map((p) => (
                    <MenuItem 
                      key={p} 
                      onClick={() => handlePriorityChange(p)}
                      sx={{ '&:hover': { bgcolor: 'rgba(84, 111, 255, 0.08)' } }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, width: '100%' }}>
                        <Flag sx={{ color: priorityColorMap[p], fontSize: 16 }} />
                        <span sx={{ fontWeight: 500 }}>{p}</span>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary">Status</Typography>
                <Chip 
                  label={task.status} 
                  color={statusColorMap[task.status]} 
                  size="small" 
                  clickable
                  onClick={openStatusMenu}
                  sx={{ 
                    mt: 0.5, 
                    color: 'common.white', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
                <Menu
                  anchorEl={statusAnchorEl}
                  open={Boolean(statusAnchorEl)}
                  onClose={closeStatusMenu}
                  sx={{ 
                    '& .MuiMenu-paper': { 
                      borderRadius: 2, 
                      minWidth: 100, 
                      bgcolor: '#F0F9FF',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    } 
                  }}
                >
                  {Object.keys(statusColorMap).map((s) => (
                    <MenuItem 
                      key={s} 
                      onClick={() => handleStatusChange(s)}
                      sx={{ '&:hover': { bgcolor: 'rgba(84, 111, 255, 0.08)' } }}
                    >
                      <Chip 
                        label={s} 
                        color={statusColorMap[s]} 
                        size="small" 
                        sx={{ 
                          height: 24,
                          fontSize: '0.75rem',
                          color: 'common.white'
                        }} 
                      />
                    </MenuItem>
                  ))}
                </Menu>
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


