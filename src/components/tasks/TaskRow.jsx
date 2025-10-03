// TaskRow.jsx (updated with actual MUI Flag icon import, keeping Menu popups and no outlines)
"use client";

import * as React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { TableRow, TableCell, IconButton, Menu, MenuItem, Box, Chip } from "@mui/material";
import Flag from "@mui/icons-material/Flag";  // Default import for Flag icon
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

const priorityColorMap = {
  Low: "#FBBF24", // yellow
  Normal: "#10B981", // green
  High: "#EF4444", // red
};

const statusColorMap = {
  Pending: "warning",
  Active: "success",
  Closed: "error",
};

const priorityOptions = Object.keys(priorityColorMap);
const statusOptions = Object.keys(statusColorMap);

export default function TaskRow({ task, tasks, setTasks, setDeleteTask }) {
  const [priorityAnchorEl, setPriorityAnchorEl] = useState(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState(null);

  const openPriorityMenu = (event) => setPriorityAnchorEl(event.currentTarget);
  const closePriorityMenu = () => setPriorityAnchorEl(null);
  const openStatusMenu = (event) => setStatusAnchorEl(event.currentTarget);
  const closeStatusMenu = () => setStatusAnchorEl(null);

  const handlePriorityChange = (newPriority) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, priority: newPriority } : t)));
    closePriorityMenu();
  };

  const handleStatusChange = (newStatus) => {
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));
    closeStatusMenu();
  };

  const formattedDueDate = task.dueDate 
    ? new Date(task.dueDate).toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }) 
    : '';

  return (
    <TableRow hover sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
      <TableCell>
        <Link 
          href={`/tasks/${task.id}`} 
          className="text-blue-600 hover:underline font-medium"
        >
          {task.name}
        </Link>
      </TableCell>
      <TableCell sx={{ color: "text.secondary" }}>{formattedDueDate}</TableCell>
      <TableCell sx={{ color: "text.primary" }}>{task.assignee}</TableCell>
      <TableCell>
        {/* Priority Trigger */}
        <Box
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 0.5, 
            cursor: "pointer",
            '&:focus': { outline: 'none' }
          }}
          onClick={openPriorityMenu}
        >
          <Flag 
            sx={{ 
              color: priorityColorMap[task.priority], 
              fontSize: 16, 
              transform: "translateX(-4px)", 
              flexShrink: 0 
            }} 
          />
          <span sx={{ fontWeight: 500 }}>{task.priority}</span>
        </Box>
        {/* Priority Menu */}
        <Menu
          anchorEl={priorityAnchorEl}
          open={Boolean(priorityAnchorEl)}
          onClose={closePriorityMenu}
          sx={{ 
            '& .MuiMenu-paper': { 
              borderRadius: 2, 
              minWidth: 120, 
              bgcolor: '#F0F9FF', // Light blue background to match image
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            } 
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {priorityOptions.map((p) => (
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
      </TableCell>
      <TableCell>
        {/* Status Trigger */}
        <Chip 
          label={task.status} 
          color={statusColorMap[task.status]} 
          size="small" 
          clickable
          onClick={openStatusMenu}
          sx={{ 
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'common.white',
            cursor: 'pointer',
            '&:focus': { outline: 'none' },
            '&:hover': { transform: 'scale(1.05)' }
          }} 
        />
        {/* Status Menu */}
        <Menu
          anchorEl={statusAnchorEl}
          open={Boolean(statusAnchorEl)}
          onClose={closeStatusMenu}
          sx={{ 
            '& .MuiMenu-paper': { 
              borderRadius: 2, 
              minWidth: 100, 
              bgcolor: '#F0F9FF', // Light blue background to match image
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            } 
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {statusOptions.map((s) => (
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
      </TableCell>
      <TableCell>
        <IconButton 
          color="error" 
          size="small"
          sx={{ 
            '&:hover': { bgcolor: 'error.light' } 
          }}
          onClick={() => setDeleteTask(task)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

TaskRow.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setDeleteTask: PropTypes.func.isRequired,
};