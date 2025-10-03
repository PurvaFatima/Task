// src/components/tasks/TasksTable.jsx (updated: "Create New" button routes to /addTask)
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Box, Paper, Button } from "@mui/material";
import DeleteTaskDialog from "./DeleteTaskDialog";
import TaskRow from "./TaskRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

export default function TasksTable() {  

  const [tasks, setTasks] = React.useState([
    {
      id: "1",
      name: "Create Mobile App",
      dueDate: "2026-01-20",
      assignee: "Saud Shaikh",
      priority: "Low",
      status: "Pending",
      description: "Develop a new mobile application for the client.",
    },
    // ... add other sample tasks
  ]);

  const [deleteTask, setDeleteTask] = React.useState(null);

  return (
    <Box sx={{ mt: 4 }}>
      {/* Button Container - Aligned Right */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 3, p: 0.75 }}>
         <Link href="/addTask" passHref>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#546FFF",
          "&:hover": { bgcolor: "#3f52c5" },
          textTransform: "none",
          borderRadius: 2,
          px: 3,
          py: 1,
          fontWeight: 600
        }}
      >
        Create New
      </Button>
    </Link>
      </Box>

      {/* Tasks Table */}
      <TableContainer 
        component={Paper} 
        sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }} 
        className="rounded-2xl shadow-lg bg-white"
      >
        <Table sx={{ minWidth: 650, '& .MuiTableCell-root': { py: 2, px: 3 } }}>
          <TableHead>
            <TableRow>
              {["Name", "Due Date", "Assignee", "Priority", "Status", "Action"].map((h) => (
                <TableCell 
                  key={h} 
                  sx={{ 
                    fontWeight: 600, 
                    color: "text.primary",
                    borderBottom: "2px solid",
                    borderColor: "grey.200"
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} tasks={tasks} setTasks={setTasks} setDeleteTask={setDeleteTask} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteTaskDialog task={deleteTask} setTask={setDeleteTask} tasks={tasks} setTasks={setTasks} />
    </Box>
  );
}