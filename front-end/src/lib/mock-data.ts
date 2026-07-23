import { Student, ClassGroup, Game, CalEvent } from '../types';

export const STUDENTS: Student[] = [
  { id: 's1', name: 'Gabriel Silva', age: 12, position: 'Goleiro', category: 'Sub-13', guardian: 'Carlos Silva', phone: '(47) 99876-5432', medical: 'Sem restrições', active: true, joinDate: '2024-02-10', number: 1 },
  { id: 's2', name: 'Lucas Oliveira', age: 13, position: 'Zagueiro', category: 'Sub-13', guardian: 'Maria Oliveira', phone: '(47) 98765-4321', medical: 'Alergia a dipirona', active: true, joinDate: '2024-01-15', number: 4 },
  { id: 's3', name: 'Pedro Santos', age: 12, position: 'Lateral D', category: 'Sub-13', guardian: 'João Santos', phone: '(47) 97654-3210', medical: 'Sem restrições', active: true, joinDate: '2024-03-01', number: 2 },
  { id: 's4', name: 'Matheus Costa', age: 11, position: 'Volante', category: 'Sub-11', guardian: 'Ana Costa', phone: '(47) 96543-2109', medical: 'Asma leve', active: true, joinDate: '2024-01-20', number: 8 },
  { id: 's5', name: 'Rafael Pereira', age: 13, position: 'Meia', category: 'Sub-13', guardian: 'Roberto Pereira', phone: '(47) 95432-1098', medical: 'Sem restrições', active: true, joinDate: '2023-11-05', number: 10 },
  { id: 's6', name: 'Felipe Almeida', age: 14, position: 'Atacante', category: 'Sub-15', guardian: 'Lucia Almeida', phone: '(47) 94321-0987', medical: 'Sem restrições', active: true, joinDate: '2024-02-28', number: 9 },
  { id: 's7', name: 'Gustavo Ferreira', age: 15, position: 'Meia-atac.', category: 'Sub-15', guardian: 'Paulo Ferreira', phone: '(47) 93210-9876', medical: 'Sem restrições', active: true, joinDate: '2023-10-12', number: 11 },
  { id: 's8', name: 'Henrique Lima', age: 9, position: 'Atacante', category: 'Sub-9', guardian: 'Sandra Lima', phone: '(47) 92109-8765', medical: 'Sem restrições', active: true, joinDate: '2024-04-01', number: 7 },
  { id: 's9', name: 'Diego Rocha', age: 16, position: 'Zagueiro', category: 'Sub-17', guardian: 'Marcos Rocha', phone: '(47) 91098-7654', medical: 'Cirurgia no joelho (2023)', active: true, joinDate: '2022-06-15', number: 3 },
  { id: 's10', name: 'Thiago Mendes', age: 17, position: 'Goleiro', category: 'Sub-17', guardian: 'Teresa Mendes', phone: '(47) 90987-6543', medical: 'Sem restrições', active: true, joinDate: '2021-08-20', number: 12 },
  { id: 's11', name: 'Bruno Cardoso', age: 11, position: 'Lateral E', category: 'Sub-11', guardian: 'Fernanda Cardoso', phone: '(47) 99876-1234', medical: 'Sem restrições', active: true, joinDate: '2024-02-05', number: 6 },
  { id: 's12', name: 'Vitor Nascimento', age: 10, position: 'Meia', category: 'Sub-11', guardian: 'Eduardo Nascimento', phone: '(47) 98765-2345', medical: 'Sem restrições', active: false, joinDate: '2023-09-10', number: 5 },
  { id: 's13', name: 'André Moraes', age: 13, position: 'Lateral E', category: 'Sub-13', guardian: 'Patrícia Moraes', phone: '(47) 97651-1111', medical: 'Sem restrições', active: true, joinDate: '2024-03-15', number: 6 },
  { id: 's14', name: 'Carlos Eduardo', age: 15, position: 'Goleiro', category: 'Sub-15', guardian: 'Sonia Eduardo', phone: '(47) 96540-2222', medical: 'Sem restrições', active: true, joinDate: '2023-08-10', number: 1 },
];

export const CLASSES: ClassGroup[] = [
  { id: 'c1', name: 'Turma Sub-9', category: 'Sub-9', coach: 'Marcos Andrade', schedule: 'Ter/Qui — 14h às 15h30', students: ['s8'] },
  { id: 'c2', name: 'Turma Sub-11', category: 'Sub-11', coach: 'André Souza', schedule: 'Seg/Qua/Sex — 15h às 16h30', students: ['s4', 's11', 's12'] },
  { id: 'c3', name: 'Turma Sub-13', category: 'Sub-13', coach: 'Carlos Mendonça', schedule: 'Seg/Qua/Sex — 16h30 às 18h', students: ['s1', 's2', 's3', 's5', 's13'] },
  { id: 'c4', name: 'Turma Sub-15', category: 'Sub-15', coach: 'Roberto Dias', schedule: 'Ter/Qui/Sáb — 16h às 17h30', students: ['s6', 's7', 's14'] },
  { id: 'c5', name: 'Turma Sub-17', category: 'Sub-17', coach: 'Paulo Henrique', schedule: 'Seg/Qua/Sex — 17h30 às 19h', students: ['s9', 's10'] },
];

export const GAMES: Game[] = [
  { id: 'g1', opponent: 'EC Joinville', date: '2025-07-26', time: '10:00', location: 'Estádio Municipal — Joinville', home: true, starters: ['s1', 's2', 's3', 's13', 's5', 's4', 's11', 's6', 's7', 's8', 's14'], reserves: ['s12', 's9'], status: 'upcoming' },
  { id: 'g2', opponent: 'São Bento FC', date: '2025-07-19', time: '09:00', location: 'Campo do São Bento', home: false, starters: ['s1', 's2', 's3', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's4'], reserves: ['s12', 's13'], score: { us: 3, them: 1 }, status: 'completed' },
  { id: 'g3', opponent: 'Athletico Jr.', date: '2025-08-02', time: '14:00', location: 'Estádio Municipal — Joinville', home: true, starters: [], reserves: [], status: 'upcoming' },
  { id: 'g4', opponent: 'Chapecoense Base', date: '2025-07-12', time: '10:00', location: 'Estádio Índio Condá — Chapecó', home: false, starters: ['s9', 's10', 's6', 's7', 's1', 's2', 's3', 's4', 's5', 's11', 's8'], reserves: ['s12'], score: { us: 2, them: 2 }, status: 'completed' },
];

export const EVENTS: CalEvent[] = [
  { id: 'e1', title: 'Jogo vs EC Joinville', date: '2025-07-26', type: 'game', description: 'Campeonato Regional Sub-13 — mando de campo' },
  { id: 'e2', title: 'Treino Sub-15', date: '2025-07-22', type: 'training' },
  { id: 'e3', title: 'Treino Sub-13', date: '2025-07-21', type: 'training' },
  { id: 'e4', title: 'Jogo vs Athletico Jr.', date: '2025-08-02', type: 'game' },
  { id: 'e5', title: 'Camp. Estadual — Início', date: '2025-08-15', type: 'championship', description: 'Início do Campeonato Estadual de Base' },
  { id: 'e6', title: 'Treino Sub-17', date: '2025-07-23', type: 'training' },
  { id: 'e7', title: 'Reunião de Responsáveis', date: '2025-07-28', type: 'other', description: 'Reunião com responsáveis — quadra coberta 19h' },
  { id: 'e8', title: 'Treino Sub-9 / Sub-11', date: '2025-07-24', type: 'training' },
  { id: 'e9', title: 'Treino Geral', date: '2025-07-25', type: 'training' },
];