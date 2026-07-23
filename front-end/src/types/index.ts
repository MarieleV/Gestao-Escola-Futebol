export type Position = 'Goleiro' | 'Zagueiro' | 'Lateral D' | 'Lateral E' | 'Volante' | 'Meia' | 'Meia-atac.' | 'Atacante';
export type Category = 'Sub-9' | 'Sub-11' | 'Sub-13' | 'Sub-15' | 'Sub-17' | 'Sub-20';

export interface Student {
  id: string;
  name: string;
  age: number;
  position: Position;
  category: Category;
  guardian: string;
  phone: string;
  medical: string;
  active: boolean;
  joinDate: string;
  number: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  category: Category;
  coach: string;
  schedule: string;
  students: string[];
}

export interface Game {
  id: string;
  opponent: string;
  date: string;
  time: string;
  location: string;
  home: boolean;
  starters: string[];
  reserves: string[];
  score?: { us: number; them: number };
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface CalEvent {
  id: string;
  title: string;
  date: string;
  type: 'game' | 'training' | 'championship' | 'other';
  description?: string;
}