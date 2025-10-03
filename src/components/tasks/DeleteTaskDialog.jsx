// DeleteTaskDialog.jsx (minor polish: added Tailwind class for button, consistent styling)
"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box } from "@mui/material";

export default function DeleteTaskDialog({ task, setTask, tasks, setTasks }) {
  const handleClose = () => setTask(null);

  const handleDelete = () => {
    if (task) {
      setTasks(tasks.filter((t) => t.id !== task.id));
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

DeleteTaskDialog.propTypes = {
  task: PropTypes.object,
  setTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
};