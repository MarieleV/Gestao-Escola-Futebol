// src/pages/Games.tsx
import { useState } from 'react';
import { 
  Plus, Calendar as CalendarIcon, MapPin, Clock, 
  Shield, X, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { GAMES, STUDENTS } from '../lib/mock-data';
import { Game, Student } from '../types';
import { formatDate, getInitials } from '../utils/formatters';

export function Games() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = GAMES.filter(g => g.status === tab);

  return (
    <div className="max-w-7xl flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Header e Abas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
        <div className="flex items-center bg-zinc-950/50 border border-white/5 rounded-lg p-1">
          <button 
            onClick={() => setTab('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              tab === 'upcoming' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🗓️ Próximos
          </button>
          <button 
            onClick={() => setTab('completed')}
            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
              tab === 'completed' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🏁 Realizados
          </button>
        </div>

        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm py-2.5 px-4 rounded-xl transition-colors w-full sm:w-auto justify-center">
          <Plus size={18} />
          <span>Novo Jogo</span>
        </button>
      </div>

      {/* Lista de Jogos */}
      <div className="flex flex-col gap-4">
        {filteredGames.map(game => {
          const won = game.score && game.score.us > game.score.them;
          const drew = game.score && game.score.us === game.score.them;
          const lost = game.score && game.score.us < game.score.them;

          return (
            <div 
              key={game.id} 
              onClick={() => setSelectedGame(game)}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-0 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden group flex flex-col md:flex-row"
            >
              {/* Lado Esquerdo: Data e Local */}
              <div className="bg-zinc-950/50 p-5 md:w-64 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
                <div className="flex items-center gap-2 text-zinc-300 font-bold mb-2">
                  <CalendarIcon size={16} className="text-emerald-500" />
                  {formatDate(game.date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400 mb-1">
                  <Clock size={14} /> {game.time}
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-400">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2 leading-tight">{game.location}</span>
                </div>
              </div>

              {/* Centro: O Placar / Confronto */}
              <div className="flex-1 p-5 md:p-8 flex items-center justify-center relative">
                <div className="flex items-center justify-center gap-6 md:gap-12 w-full max-w-lg">
                  
                  {/* Nosso Time */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl md:text-3xl shadow-lg shadow-emerald-500/10">
                      ⚽
                    </div>
                    <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">Nós</span>
                  </div>

                  {/* Placar ou VS */}
                  <div className="flex flex-col items-center justify-center px-4">
                    {game.score ? (
                      <div className="flex items-center gap-3 md:gap-4">
                        <span className={`text-4xl md:text-5xl font-black ${won ? 'text-emerald-500' : drew ? 'text-amber-500' : 'text-zinc-400'}`}>
                          {game.score.us}
                        </span>
                        <span className="text-zinc-600 font-black text-2xl">-</span>
                        <span className={`text-4xl md:text-5xl font-black ${lost ? 'text-rose-500' : drew ? 'text-amber-500' : 'text-zinc-400'}`}>
                          {game.score.them}
                        </span>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 font-black text-sm italic">
                        VS
                      </div>
                    )}
                  </div>

                  {/* Adversário */}
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl md:text-3xl shadow-lg">
                      🛡️
                    </div>
                    <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase text-center line-clamp-1">
                      {game.opponent}
                    </span>
                  </div>

                </div>
              </div>

              {/* Lado Direito: Status / Badges */}
              <div className="p-5 md:w-48 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 bg-zinc-950/20 border-t md:border-t-0 md:border-l border-white/5">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider w-full text-center md:text-right
                  ${game.home ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-white/5 text-zinc-400 border border-white/10'}
                `}>
                  {game.home ? '🏠 Em Casa' : '✈️ Fora'}
                </span>

                {game.score ? (
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider w-full text-center md:text-right border
                    ${won ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : drew ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}
                  `}>
                    {won ? 'Vitória' : drew ? 'Empate' : 'Derrota'}
                  </span>
                ) : (
                  <span className={`flex items-center justify-center md:justify-end gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider w-full border
                    ${game.starters.length > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}
                  `}>
                    {game.starters.length > 0 ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                    {game.starters.length > 0 ? 'Escalado' : 'Pendente'}
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {filteredGames.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <Shield size={48} className="text-zinc-700 mb-4" />
            <p className="text-zinc-400 text-lg">Nenhum jogo {tab === 'upcoming' ? 'agendado' : 'realizado'}.</p>
          </div>
        )}
      </div>

      {/* Modal de Escalação */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
}

// --- Componente do Modal ---
function GameModal({ game, onClose }: { game: Game, onClose: () => void }) {
  const [starters, setStarters] = useState<string[]>(game.starters);
  const [reserves, setReserves] = useState<string[]>(game.reserves);
  
  // Pegamos apenas os alunos ativos
  const activeStudents = STUDENTS.filter(s => s.active);

  // Lógica melhorada de seleção
  const togglePlayer = (id: string, role: 'starter' | 'reserve') => {
    if (role === 'starter') {
      if (starters.includes(id)) {
        setStarters(prev => prev.filter(x => x !== id)); // Remove se já for titular
      } else {
        setStarters(prev => [...prev, id]); // Adiciona aos titulares
        setReserves(prev => prev.filter(x => x !== id)); // Remove dos reservas se estiver lá
      }
    } else {
      if (reserves.includes(id)) {
        setReserves(prev => prev.filter(x => x !== id)); // Remove se já for reserva
      } else {
        setReserves(prev => [...prev, id]); // Adiciona aos reservas
        setStarters(prev => prev.filter(x => x !== id)); // Remove dos titulares se estiver lá
      }
    }
  };

  const won = game.score && game.score.us > game.score.them;
  const drew = game.score && game.score.us === game.score.them;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Fixo */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02] flex-shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-zinc-200">vs {game.opponent}</h2>
              {game.score && (
                <span className={`px-2 py-0.5 rounded text-xs font-black border ${won ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : drew ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                  {game.score.us} - {game.score.them}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <CalendarIcon size={12} /> Data e Hora
              </p>
              <p className="text-sm font-bold text-zinc-200">{formatDate(game.date)} às {game.time}</p>
            </div>
            <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <MapPin size={12} /> Local
              </p>
              <p className="text-sm font-bold text-zinc-200 line-clamp-1" title={game.location}>{game.location}</p>
            </div>
          </div>

          {/* Gerenciador de Escalação */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-widest">
              Escalação Oficial
            </h3>
            <div className="flex gap-4 text-xs font-bold">
              <span className="text-emerald-400">{starters.length} Titulares</span>
              <span className="text-amber-400">{reserves.length} Reservas</span>
            </div>
          </div>

          <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeStudents.map(student => {
              const isStarter = starters.includes(student.id);
              const isReserve = reserves.includes(student.id);

              return (
                <div 
                  key={student.id} 
                  className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                    isStarter ? 'bg-emerald-500/10 border-emerald-500/30' : 
                    isReserve ? 'bg-amber-500/10 border-amber-500/30' : 
                    'bg-white/[0.02] border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0">
                      {student.number}
                    </div>
                    <div className="truncate">
                      <p className={`text-sm font-bold truncate ${isStarter ? 'text-emerald-400' : isReserve ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {student.name.split(' ')[0]} {student.name.split(' ').pop()}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-medium uppercase">{student.position}</p>
                    </div>
                  </div>
                  
                  {/* Botões de Ação da Escalação */}
                  <div className="flex gap-1">
                    <button 
                      onClick={() => togglePlayer(student.id, 'starter')}
                      className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-black transition-colors ${
                        isStarter ? 'bg-emerald-500 text-zinc-950' : 'bg-white/5 text-zinc-500 hover:bg-emerald-500/20 hover:text-emerald-400'
                      }`}
                      title="Marcar como Titular"
                    >
                      TIT
                    </button>
                    <button 
                      onClick={() => togglePlayer(student.id, 'reserve')}
                      className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-black transition-colors ${
                        isReserve ? 'bg-amber-500 text-zinc-950' : 'bg-white/5 text-zinc-500 hover:bg-amber-500/20 hover:text-amber-400'
                      }`}
                      title="Marcar como Reserva"
                    >
                      RES
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex gap-3 flex-shrink-0">
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-sm py-2.5 rounded-xl transition-colors">
            Salvar Escalação
          </button>
          {game.status === 'upcoming' && (
            <button className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 font-bold text-sm py-2.5 rounded-xl transition-colors">
              Registrar Resultado Final
            </button>
          )}
        </div>
      </div>
    </div>
  );
}