// components/tasks/DeleteTaskDialog.jsx
"use client";

import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from "@mui/material";
import useTaskStore from "@/store/taskstore";

export default function DeleteTaskDialog() {
  // Zustand store
  const task = useTaskStore((state) => state.deleteTask);
  const setDeleteTask = useTaskStore((state) => state.setDeleteTask);
  const removeTask = useTaskStore((state) => state.removeTask);

  const handleClose = () => setDeleteTask(null);

  const handleDelete = () => {
    if (task) {
      removeTask(task.id);
    }
    handleClose();
  };

  return (
    <Dialog open={!!task} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this task?
        </DialogContentText>
        {task && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body1" fontWeight={600} gutterBottom>
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Due: {new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              {task.assignee ? ` • ${task.assignee}` : ""}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button 
          color="error" 
          variant="contained" 
          onClick={handleDelete}
          sx={{ borderRadius: 1 }}
          className="rounded-lg"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}