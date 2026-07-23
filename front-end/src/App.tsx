import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Classes } from './pages/Classes';
import { Games } from './pages/Games';
import { Attendance } from './pages/Attendance';
import { Calendar } from './pages/Calendar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="alunos" element={<Students />} /> 
          <Route path="turmas" element={<Classes />} /> 
          <Route path="jogos" element={<Games />} /> 
          <Route path="frequencia" element={<Attendance />} /> 
          <Route path="calendario" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}