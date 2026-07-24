// src/pages/Classes.tsx
import { useState } from 'react';
import { Plus, Target, Clock, Users, X } from 'lucide-react';
import { CLASSES, STUDENTS } from '../lib/mock-data';
import { ClassGroup, Category, Position } from '../types';
import { getInitials } from '../utils/formatters';

// --- Helpers Visuais (Cores Neutras e Suaves) ---
const getCategoryColors = (cat: Category) => {
  const map: Record<string, string> = {
    'Sub-9': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
    'Sub-11': 'bg-sky-400/10 text-sky-400 border-sky-400/20',
    'Sub-13': 'bg-[#29903B]/10 text-[#29903B] border-[#29903B]/20', 
    'Sub-15': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Sub-17': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    // Atualizado para o novo vermelho #F85149
    'Sub-20': 'bg-[#F85149]/10 text-[#F85149] border-[#F85149]/20',
  };
  return map[cat] || 'bg-white/5 text-zinc-400 border-white/10';
};

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

export function Classes() {
  const [selectedClass, setSelectedClass] = useState<ClassGroup | null>(null);

  return (
    <div className="max-w-7xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header / Ações */}
      <div className="flex justify-between items-center bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
        <div>
          <h1 className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Gestão de Turmas</h1>
          <p className="text-xs text-zinc-500 mt-1">{CLASSES.length} turmas ativas no momento</p>
        </div>
        <button className="flex items-center gap-2 bg-[#29903B] hover:bg-[#237A32] text-zinc-950 font-semibold text-sm py-2.5 px-4 rounded-xl transition-colors">
          <Plus size={18} />
          <span className="hidden sm:inline">Nova Turma</span>
        </button>
      </div>

      {/* Grid de Turmas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CLASSES.map(group => {
          const classStudents = STUDENTS.filter(s => group.students.includes(s.id));
          const catStyle = getCategoryColors(group.category);
          
          return (
            <div 
              key={group.id} 
              onClick={() => setSelectedClass(group)}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 cursor-pointer transition-all hover:bg-white/[0.04] hover:border-white/10 group flex flex-col"
            >
              {/* Topo do Card */}
              <div className="flex justify-between items-start mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${catStyle}`}>
                  <Target size={22} />
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${catStyle}`}>
                  {group.category}
                </span>
              </div>

              {/* Informações Principais */}
              <h3 className="text-lg font-semibold text-zinc-100 mb-1 group-hover:text-[#29903B] transition-colors">{group.name}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4 font-medium">
                <Users size={14} className="text-zinc-500" />
                <span>Prof. {group.coach}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-6 bg-transparent p-3 rounded-xl border border-white/10">
                <Clock size={14} className="text-zinc-500 flex-shrink-0" />
                <span className="truncate">{group.schedule}</span>
              </div>

              {/* Rodapé do Card: Alunos */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  {classStudents.length} aluno{classStudents.length !== 1 ? 's' : ''}
                </span>
                
                <div className="flex items-center -space-x-2">
                  {classStudents.slice(0, 4).map((student) => (
                    <div 
                      key={student.id} 
                      title={student.name}
                      className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300 relative z-10 hover:z-20 transition-transform hover:scale-110 cursor-help"
                    >
                      {getInitials(student.name)}
                    </div>
                  ))}
                  {classStudents.length > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-400 relative z-10">
                      +{classStudents.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de Detalhes da Turma */}
      {selectedClass && (
        <ClassModal group={selectedClass} onClose={() => setSelectedClass(null)} />
      )}
    </div>
  );
}

// --- Componente do Modal ---
function ClassModal({ group, onClose }: { group: ClassGroup, onClose: () => void }) {
  const classStudents = STUDENTS.filter(s => group.students.includes(s.id));
  const catStyle = getCategoryColors(group.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Fixo */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-start bg-zinc-900/50 flex-shrink-0 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold text-zinc-100">{group.name}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${catStyle}`}>
                {group.category}
              </span>
            </div>
            <p className="text-sm text-zinc-400 font-medium">Prof. {group.coach}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Cards de Resumo */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-xl p-4 text-center">
              <p className="text-3xl font-semibold text-zinc-100 mb-1">{classStudents.length}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Alunos</p>
            </div>
            <div className="flex-[2] bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Clock size={12} /> Horário Oficial
              </p>
              <p className="text-sm font-medium text-zinc-200">{group.schedule}</p>
            </div>
          </div>

          {/* Lista de Alunos */}
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
            Lista de Inscritos ({classStudents.length})
          </h3>
          <div className="flex flex-col gap-2">
            {classStudents.map(student => (
              <div key={student.id} className="flex justify-between items-center p-3 rounded-xl bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${getPositionColors(student.position)}`}>
                    {getInitials(student.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 group-hover:text-[#29903B] transition-colors">{student.name}</p>
                    <p className="text-[10px] text-zinc-500 font-medium">#{student.number}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPositionColors(student.position)}`}>
                  {student.position}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}