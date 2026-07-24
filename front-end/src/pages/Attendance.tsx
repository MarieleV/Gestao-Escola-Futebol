// src/pages/Attendance.tsx
import { useState } from 'react';
import { 
  CheckCircle2, XCircle, Save, Calendar as CalendarIcon, 
  Users, CheckSquare, ListChecks, HelpCircle
} from 'lucide-react';
import { CLASSES, STUDENTS } from '../lib/mock-data';
import { Position } from '../types';
import { getInitials } from '../utils/formatters';

// --- Helper Visual para Avatares (com cores suavizadas e neutras) ---
const getPositionColors = (pos: Position) => {
  const map: Record<string, string> = {
    'Goleiro': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Zagueiro': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Lateral D': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Lateral E': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Volante': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Meia': 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20', 
    'Meia-atac.': 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20', 
    // Atualizado para o novo vermelho #F85149
    'Atacante': 'bg-[#F85149]/10 text-[#F85149] border-[#F85149]/20',
  };
  return map[pos] || 'bg-white/5 text-zinc-400 border-white/10';
};

export function Attendance() {
  const [selectedClassId, setSelectedClassId] = useState(CLASSES[0]?.id);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  
  const [attendance, setAttendance] = useState<Record<string, boolean | null>>({});

  const currentClass = CLASSES.find(c => c.id === selectedClassId)!;
  const classStudents = STUDENTS.filter(s => currentClass.students.includes(s.id));

  const mark = (id: string, value: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === value ? null : value
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    classStudents.forEach(s => { allPresent[s.id] = true; });
    setAttendance(allPresent);
  };

  const presentCount = Object.values(attendance).filter(v => v === true).length;
  const absentCount = Object.values(attendance).filter(v => v === false).length;
  const pendingCount = classStudents.length - presentCount - absentCount;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* 1. Barra de Controles */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
        
        <div className="flex flex-1 w-full gap-4">
          <div className="relative flex-1">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <select 
              value={selectedClassId} 
              onChange={e => {
                setSelectedClassId(e.target.value);
                setAttendance({});
              }}
              className="w-full bg-transparent border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-zinc-200 focus:outline-none focus:border-white/20 hover:border-white/20 transition-colors appearance-none cursor-pointer [&>option]:bg-zinc-900"
            >
              {CLASSES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="date" 
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{ colorScheme: 'dark' }}
              className="w-full bg-transparent border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium text-zinc-200 focus:outline-none focus:border-white/20 hover:border-white/20 transition-colors cursor-pointer"
            />
          </div>
        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#29903B] hover:bg-[#237A32] text-zinc-950 font-semibold text-sm py-2.5 px-6 rounded-xl transition-colors">
          <Save size={18} />
          <span>Salvar Lista</span>
        </button>
      </div>

      {/* 2. Cards de Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox label="Alunos" value={classStudents.length} color="text-zinc-200" icon={Users} />
        <StatBox label="Presentes" value={presentCount} color="text-[#29903B]" icon={CheckSquare} />
        {/* Atualizado para text-[#F85149] */}
        <StatBox label="Ausentes" value={absentCount} color="text-[#F85149]" icon={XCircle} />
        <StatBox label="Pendentes" value={pendingCount} color="text-zinc-500" icon={HelpCircle} />
      </div>

      {/* 3. Lista Interativa */}
      <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
        
        {/* Cabeçalho da Lista */}
        <div className="px-5 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <ListChecks className="text-zinc-400" size={18} />
            <h2 className="text-sm font-semibold text-zinc-200 uppercase tracking-widest">{currentClass.name}</h2>
          </div>
          <button 
            onClick={markAllPresent}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[#29903B] hover:bg-[#29903B]/10 text-xs font-semibold transition-colors"
          >
            <CheckCircle2 size={16} /> Marcar Todos Presentes
          </button>
        </div>

        {/* Linhas dos Alunos */}
        <div className="flex flex-col">
          {classStudents.map(student => {
            const status = attendance[student.id];
            const isPresent = status === true;
            const isAbsent = status === false;

            return (
              <div 
                key={student.id} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:px-6 border-b border-white/5 transition-all
                  ${isPresent ? 'bg-[#29903B]/[0.03] border-l-[3px] border-l-[#29903B]' : 
                    isAbsent ? 'bg-[#F85149]/[0.03] border-l-[3px] border-l-[#F85149]' : 
                    'hover:bg-white/[0.02] border-l-[3px] border-l-transparent'}
                `}
              >
                
                {/* Info do Aluno */}
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border ${getPositionColors(student.position)}`}>
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200">{student.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-zinc-500 font-medium">#{student.number}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getPositionColors(student.position)}`}>
                        {student.position}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ações (Presente / Ausente) */}
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline-block w-20 text-right mr-2 text-[10px] font-bold uppercase tracking-widest">
                    {isPresent ? <span className="text-[#29903B]">Presente</span> : 
                     isAbsent ? <span className="text-[#F85149]">Ausente</span> : 
                     <span className="text-zinc-500">Pendente</span>}
                  </span>
                  
                  <button 
                    onClick={() => mark(student.id, true)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 sm:w-12 h-10 sm:h-12 rounded-xl transition-all ${
                      isPresent 
                        ? 'bg-[#29903B] text-zinc-950 shadow-lg shadow-[#29903B]/10' 
                        : 'bg-zinc-950/50 border border-white/5 text-zinc-500 hover:text-[#29903B] hover:border-[#29903B]/30 hover:bg-[#29903B]/5'
                    }`}
                  >
                    <CheckCircle2 size={20} />
                    <span className="sm:hidden text-sm font-semibold">Presente</span>
                  </button>

                  <button 
                    onClick={() => mark(student.id, false)}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 sm:w-12 h-10 sm:h-12 rounded-xl transition-all ${
                      isAbsent 
                        ? 'bg-[#F85149] text-zinc-950 shadow-lg shadow-[#F85149]/10' 
                        : 'bg-zinc-950/50 border border-white/5 text-zinc-500 hover:text-[#F85149] hover:border-[#F85149]/30 hover:bg-[#F85149]/5'
                    }`}
                  >
                    <XCircle size={20} />
                    <span className="sm:hidden text-sm font-semibold">Ausente</span>
                  </button>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color, icon: Icon }: { label: string, value: number, color: string, icon: any }) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] transition-colors">
      <Icon size={20} className={`${color} mb-3 opacity-80`} />
      <p className={`text-3xl font-semibold ${color} leading-none mb-2`}>{value}</p>
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}