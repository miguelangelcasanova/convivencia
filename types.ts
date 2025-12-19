export type Phase = 1 | 2 | 3;

export interface StudentData {
  name: string;
  course: string;
  tutor: string;
  parents: string;
}

export interface ExpedienteData {
  id: string;
  student: StudentData;
  dateStarted: string;
  facts: string; // Hechos sucintos (Fase 1)
  factsProven: string; // Hechos probados (Fase 2)
  instructor: string;
  secretary: string;
  sanction: string;
  currentPhase: Phase;
  status: 'Abierto' | 'Cerrado' | 'Pendiente';
  
  // Nuevos campos normativa 23/2014
  procedureType: 'Ordinario' | 'Abreviado'; 
  isAuthorityContext: boolean; // Art 25 bis: Presunción de veracidad
}

export interface DocumentModel {
  id: string; // e.g., "Modelo 1"
  title: string;
  phase: Phase;
  description: string;
  isUrgent?: boolean;
  requiredForPhase?: boolean;
  generateText: (data: ExpedienteData) => string;
  showInAbreviado?: boolean; // Para filtrar documentos en modo abreviado
}