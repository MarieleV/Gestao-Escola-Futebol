// src/pages/Students.tsx
import { useState, useMemo } from 'react';
import { 
  Search, Filter, LayoutGrid, List, Plus, Edit, 
  X, FileText, Activity 
} from 'lucide-react';
import { STUDENTS } from '../lib/mock-data';
import { Student, Category, Position } from '../types';
import { formatDate, getInitials } from '../utils/formatters';

// --- Helpers Visuais (Cores Suavizadas Neutras) ---
const getPositionColors = (pos: Position) => {
  const map: Record<string, string> = {
    'Goleiro': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Zagueiro': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Lateral D': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Lateral E': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Volante': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Meia': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Meia-atac.': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Atacante': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return map[pos] || 'bg-white/5 text-zinc-400 border-white/10';
};

const getCategoryColors = (cat: Category) => {
  const map: Record<string, string> = {
    'Sub-9': 'bg-fuchsia-500/10 text-fuchsia-400',
    'Sub-11': 'bg-sky-400/10 text-sky-400',
    'Sub-13': 'bg-emerald-500/10 text-emerald-400',
    'Sub-15': 'bg-amber-500/10 text-amber-400',
    'Sub-17': 'bg-orange-500/10 text-orange-400',
    'Sub-20': 'bg-rose-500/10 text-rose-400',
  };
  return map[cat] || 'bg-white/5 text-zinc-400';
};

export function Students() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<Category | 'Todas'>('Todas');
  const [posFilter, setPosFilter] = useState<Position | 'Todas'>('Todas');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const categories: (Category | 'Todas')[] = ['Todas', 'Sub-9', 'Sub-11', 'Sub-13', 'Sub-15', 'Sub-17', 'Sub-20'];
  const positions: (Position | 'Todas')[] = ['Todas', 'Goleiro', 'Zagueiro', 'Lateral D', 'Lateral E', 'Volante', 'Meia', 'Meia-atac.', 'Atacante'];

  const filtered = useMemo(() => STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'Todas' || s.category === catFilter;
    const matchPos = posFilter === 'Todas' || s.position === posFilter;
    return matchSearch && matchCat && matchPos;
  }), [search, catFilter, posFilter]);

  return (
    <div className="max-w-7xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* 1. Toolbar Superior */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
        
        <div className="flex flex-1 w-full md:w-auto gap-4 items-center flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nome..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-950/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm font-medium text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/10 hover:border-white/10 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-zinc-500" />
            <select 
              value={catFilter} 
              onChange={e => setCatFilter(e.target.value as Category | 'Todas')}
              className="bg-zinc-950/50 border border-white/5 rounded-xl py-2 px-3 text-sm font-medium text-zinc-300 focus:outline-none focus:border-white/10 hover:border-white/10 cursor-pointer appearance-none transition-colors"
            >
              {categories.map(c => <option key={c} value={c}>{c === 'Todas' ? 'Categorias' : c}</option>)}
            </select>
            
            <select 
              value={posFilter} 
              onChange={e => setPosFilter(e.target.value as Position | 'Todas')}
              className="bg-zinc-950/50 border border-white/5 rounded-xl py-2 px-3 text-sm font-medium text-zinc-300 focus:outline-none focus:border-white/10 hover:border-white/10 cursor-pointer appearance-none transition-colors"
            >
              {positions.map(p => <option key={p} value={p}>{p === 'Todas' ? 'Posições' : p}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center bg-zinc-950/50 border border-white/5 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm py-2 px-4 rounded-xl transition-colors">
            <Plus size={18} />
            <span>Novo Aluno</span>
          </button>
        </div>
      </div>

      <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
        {filtered.length} aluno{filtered.length !== 1 && 's'} encontrado{filtered.length !== 1 && 's'}
      </div>

      {/* 2. Área de Listagem (Tabela ou Grid) */}
      {viewMode === 'table' ? (
        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/30 border-b border-white/5 text-xs uppercase tracking-wider text-zinc-400 font-bold">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Nome</th>
                  <th className="px-6 py-4">Idade</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Posição</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(student => (
                  <tr 
                    key={student.id} 
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 text-zinc-500 font-bold text-lg">
                      {student.number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border ${getPositionColors(student.position)}`}>
                          {getInitials(student.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">{student.name}</p>
                          <p className="text-xs text-zinc-500">Resp: {student.guardian}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">{student.age} anos</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getCategoryColors(student.category)}`}>
                        {student.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPositionColors(student.position)}`}>
                        {student.position}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${student.active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-rose-500'}`}></div>
                        <span className="text-xs text-zinc-300">{student.active ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                        className="p-2 rounded-lg bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-20 text-center text-zinc-500 font-medium">Nenhum aluno encontrado com estes filtros.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(student => (
            <div 
              key={student.id} 
              onClick={() => setSelectedStudent(student)}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border ${getPositionColors(student.position)}`}>
                  {getInitials(student.name)}
                </div>
                <span className="text-3xl font-bold text-white/5 group-hover:text-white/10 transition-colors">#{student.number}</span>
              </div>
              <p className="text-base font-semibold text-zinc-200 mb-1 group-hover:text-emerald-400 transition-colors">{student.name}</p>
              <p className="text-xs text-zinc-500 mb-4 flex-1">{student.age} anos</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getPositionColors(student.position)}`}>
                  {student.position}
                </span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColors(student.category)}`}>
                  {student.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Modal de Perfil */}
      {selectedStudent && (
        <StudentModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
}

// --- Componente do Modal ---
function StudentModal({ student, onClose }: { student: Student, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      
      <div 
        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-lg font-bold text-zinc-100">Perfil do Aluno</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-5 mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 ${getPositionColors(student.position)}`}>
              {getInitials(student.name)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">{student.name}</h3>
              <div className="flex gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPositionColors(student.position)}`}>{student.position}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getCategoryColors(student.category)}`}>{student.category}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${student.active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {student.active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <InfoItem label="Número" value={`#${student.number}`} />
            <InfoItem label="Idade" value={`${student.age} anos`} />
            <InfoItem label="Responsável" value={student.guardian} />
            <InfoItem label="Telefone" value={student.phone} />
            <InfoItem label="Membro desde" value={formatDate(student.joinDate)} />
            
            <div className="col-span-2 mt-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Activity size={12} /> Informação Médica
              </p>
              <div className={`p-3 rounded-xl border text-sm font-medium transition-colors
                ${student.medical !== 'Sem restrições' 
                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-200' 
                  : 'bg-zinc-950/50 border-white/5 text-zinc-400'
                }
              `}>
                {student.medical}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-white/5">
            <button className="flex-1 flex justify-center items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm py-2.5 rounded-xl transition-colors">
              <Edit size={16} /> Editar
            </button>
            <button className="flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-bold text-sm py-2.5 rounded-xl transition-colors">
              <FileText size={16} /> Exportar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm text-zinc-200 font-medium">{value}</p>
    </div>
  );
}