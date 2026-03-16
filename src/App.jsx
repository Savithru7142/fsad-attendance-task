import './App.css'
import { TextField, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, IconButton, Button, Box } from '@mui/material'
import { CheckCircle, Cancel } from '@mui/icons-material'
import { useState, useEffect } from 'react'

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('attendance');
    if (saved) {
      return JSON.parse(saved);
    } else {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        roll: `R${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`,
        status: true 
      }));
    }
  });
  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(students));
  }, [students]);

  const toggleStatus = (id) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, status: !student.status } : student
    ));
  };

  const setAllPresent = () => {
    setStudents(students.map(student => ({ ...student, status: true })));
  };

  const setAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, status: false })));
  };

  const reset = () => {
    setStudents(students.map(student => ({ ...student, status: true })));
  };

  const presentCount = students.filter(s => s.status).length;
  const absentCount = students.length - presentCount;
  const attendancePercent = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Attendance Task</h2>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField type="date" />
        <Button variant="contained" onClick={setAllPresent}>All Present</Button>
        <Button variant="contained" onClick={setAllAbsent}>All Absent</Button>
        <Button variant="outlined" onClick={reset}>Reset</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Paper sx={{ p: 2, minWidth: 120 }}>
          <h3>Present Count</h3>
          <p>{presentCount}</p>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 120 }}>
          <h3>Absent Count</h3>
          <p>{absentCount}</p>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 120 }}>
          <h3>Attendance %</h3>
          <p>{attendancePercent}%</p>
        </Paper>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.no</TableCell>
              <TableCell>Roll No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Toggle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.roll}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Chip
                    label={student.status ? 'Present' : 'Absent'}
                    color={student.status ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => toggleStatus(student.id)}>
                    {student.status ? <Cancel /> : <CheckCircle />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default App
