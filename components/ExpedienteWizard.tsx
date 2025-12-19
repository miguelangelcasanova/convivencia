import React, { useState } from 'react';
import { ArrowRight, Clock, FileText, CheckCircle, AlertCircle, Printer, Download, Gavel, ShieldAlert } from 'lucide-react';
import { ExpedienteData, DocumentModel } from '../types';
import { DOCUMENT_MODELS } from '../constants';
import { generatePDF } from '../services/pdfService';

interface WizardProps {
  expediente: ExpedienteData;
  setExpediente: React.Dispatch<React.SetStateAction<ExpedienteData>>;
  onClose: () => void;
}

const ExpedienteWizard: React.FC<WizardProps> = ({ expediente, setExpediente, onClose }) => {
  const [showAllDocs, setShowAllDocs] = useState(false);

  const handleInputChange = (field: keyof ExpedienteData | keyof ExpedienteData['student'], value: string | boolean) => {
    if (field === 'name' || field === 'course' || field === 'tutor' || field === 'parents') {
      setExpediente(prev => ({
        ...prev,
        student: { ...prev.student, [field]: value }
      }));
    } else {
      setExpediente(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextPhase = () => {
    if (expediente.currentPhase < 3) {
      setExpediente(prev => ({ ...prev, currentPhase: (prev.currentPhase + 1) as 1 | 2 | 3 }));
    } else {
      alert("Expediente finalizado. Se moverá a Histórico.");
      onClose();
    }
  };

  // Filtrado de documentos según fase y si es procedimiento abreviado
  const availableDocs = showAllDocs 
    ? DOCUMENT_MODELS 
    : DOCUMENT_MODELS.filter(doc => {
        if (expediente.procedureType === 'Abreviado') {
           // En abreviado mostramos los específicos de abreviado y algunos generales
           return doc.showInAbreviado || doc.id === "Modelo Abreviado";
        }
        // En ordinario ocultamos los específicos de abreviado
        return doc.phase === expediente.currentPhase && doc.id !== "Modelo Abreviado";
    });

  const getPhaseTitle = (phase: number) => {
    if (expediente.procedureType === 'Abreviado') return "Procedimiento Abreviado (Gestión Única)";
    
    switch(phase) {
      case 1: return "Fase 1: Apertura e Incoación";
      case 2: return "Fase 2: Instrucción y Pliego de Cargos";
      case 3: return "Fase 3: Propuesta y Resolución";
      default: return "";
    }
  };

  const renderStepper = () => (
    <div className="mb-8">
      <div className="flex items-center w-full">
        {[1, 2, 3].map((step) => {
           const isActive = expediente.currentPhase === step;
           const isCompleted = expediente.currentPhase > step;
           return (
            <React.Fragment key={step}>
              <div className="flex items-center relative">
                <div className={`rounded-full transition-all duration-300 h-10 w-10 flex items-center justify-center font-bold z-10 border-2 
                  ${isActive ? 'border-red-700 text-red-700 bg-white scale-110 shadow-md' : 
                    isCompleted ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-gray-400 bg-white'}`}>
                  {isCompleted ? <CheckCircle size={20} /> : step}
                </div>
                <div className={`absolute top-0 -ml-12 text-center mt-12 w-32 text-xs font-bold uppercase tracking-wide
                  ${isActive ? 'text-red-800' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'Incoación' : step === 2 ? 'Instrucción' : 'Resolución'}
                </div>
              </div>
              {step < 3 && (
                <div className={`flex-auto border-t-2 transition-all duration-500 mx-2
                  ${isCompleted ? 'border-green-500' : 'border-gray-200'}`}></div>
              )}
            </React.Fragment>
           );
        })}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {renderStepper()}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          
          {/* Configuration Header for Phase 1 */}
          {expediente.currentPhase === 1 && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                <h4 className="font-bold text-slate-700 text-sm mb-3">Configuración del Procedimiento (Dec. 23/2014)</h4>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="procType"
                            checked={expediente.procedureType === 'Ordinario'}
                            onChange={() => handleInputChange('procedureType', 'Ordinario')}
                            className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium">Procedimiento Ordinario</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="radio" 
                            name="procType"
                            checked={expediente.procedureType === 'Abreviado'}
                            onChange={() => handleInputChange('procedureType', 'Abreviado')}
                            className="text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium">Acuerdo Abreviado (FAQ P.8)</span>
                    </label>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={expediente.isAuthorityContext}
                            onChange={(e) => handleInputChange('isAuthorityContext', e.target.checked)}
                            className="rounded text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                             <ShieldAlert size={16} />
                             Atentado a la Autoridad del Profesor (Art. 25 bis)
                        </span>
                    </label>
                    {expediente.isAuthorityContext && (
                        <p className="text-xs text-slate-500 mt-1 ml-6">
                            * Se aplicará presunción de veracidad a los hechos constatados por el profesorado (FAQ P.3 y P.5).
                        </p>
                    )}
                </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800">{getPhaseTitle(expediente.currentPhase)}</h3>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-xs font-medium">Art. 50-54 Decreto 51/2007</span>
          </div>

          <div className="space-y-6">
            {expediente.currentPhase === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Alumno</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400" 
                      placeholder="Ej: Juan Nadie" 
                      value={expediente.student.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Curso</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border-gray-300 shadow-sm border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400" 
                      placeholder="Ej: 3º ESO B"
                      value={expediente.student.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1">Padres / Tutores Legales (si el alumno/a es menor de edad)</label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border-gray-300 shadow-sm border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400" 
                      placeholder="Nombre de los padres"
                      value={expediente.student.parents}
                      onChange={(e) => handleInputChange('parents', e.target.value)}
                    />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Hechos (Resumen para Incoación)</label>
                  <textarea 
                    className="w-full rounded-md border-gray-300 shadow-sm border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400" 
                    rows={4} 
                    placeholder="Descripción sucinta de la conducta gravemente perjudicial..."
                    value={expediente.facts}
                    onChange={(e) => handleInputChange('facts', e.target.value)}
                  ></textarea>
                </div>
                
                {expediente.procedureType === 'Ordinario' && (
                    <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                    <h5 className="font-bold text-yellow-800 text-sm mb-2">Designación (Art. 50.3)</h5>
                    <div className="grid grid-cols-2 gap-4">
                        <input 
                        type="text" 
                        className="block w-full rounded-md border-gray-200 border p-2 text-sm bg-white text-gray-900 placeholder-gray-400" 
                        placeholder="Instructor (Profesor)"
                        value={expediente.instructor}
                        onChange={(e) => handleInputChange('instructor', e.target.value)}
                        />
                        <input 
                        type="text" 
                        className="block w-full rounded-md border-gray-200 border p-2 text-sm bg-white text-gray-900 placeholder-gray-400" 
                        placeholder="Secretario (Profesor)"
                        value={expediente.secretary}
                        onChange={(e) => handleInputChange('secretary', e.target.value)}
                        />
                    </div>
                    </div>
                )}
              </>
            )}

            {expediente.currentPhase === 2 && expediente.procedureType === 'Ordinario' && (
              <>
                 <div className="bg-blue-50 p-4 rounded border border-blue-200 flex gap-3">
                    <AlertCircle className="text-blue-500 shrink-0" size={20} />
                    <div>
                        <h5 className="font-bold text-blue-800 text-sm">Plazos de Instrucción</h5>
                        <p className="text-xs text-blue-700 mt-1">Máximo 3 días lectivos desde nombramiento. 2 días para alegaciones tras Pliego de Cargos.</p>
                    </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Hechos Probados (Para Pliego de Cargos)
                      {expediente.isAuthorityContext && <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Autoridad Pública</span>}
                  </label>
                  <textarea 
                    className="w-full rounded-md border-gray-300 shadow-sm border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400" 
                    rows={6} 
                    placeholder="Detalle de los hechos esclarecidos tras entrevistas..."
                    value={expediente.factsProven}
                    onChange={(e) => handleInputChange('factsProven', e.target.value)}
                  ></textarea>
                </div>
              </>
            )}

            {(expediente.currentPhase === 3 || expediente.procedureType === 'Abreviado') && (
               <>
                 <div className="bg-green-50 p-4 rounded border border-green-200">
                    <h5 className="font-bold text-green-800 text-sm">Resolución Final</h5>
                    <p className="text-xs text-green-700 mt-1">
                        {expediente.procedureType === 'Abreviado' 
                            ? "Acuerdo reeducativo y aceptación inmediata de sanciones (FAQ P.8)."
                            : "El Director tiene 2 días lectivos para resolver tras recibir la propuesta."}
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Sanción Propuesta (Art. 49)</label>
                     <select 
                        className="w-full rounded-md border-gray-300 shadow-sm border p-2.5 text-sm bg-white text-gray-900 placeholder-gray-400"
                        value={expediente.sanction}
                        onChange={(e) => handleInputChange('sanction', e.target.value)}
                      >
                        <option value="">Seleccione sanción...</option>
                        <option value="Suspensión derecho de asistencia (3 días - 2 semanas)">Suspensión derecho de asistencia (3 días - 2 semanas)</option>
                        <option value="Realización de tareas educadoras">Realización de tareas educadoras</option>
                        <option value="Cambio de grupo">Cambio de grupo</option>
                        <option value="Suspensión actividades extraescolares">Suspensión actividades extraescolares</option>
                        <option value="Cambio de centro">Cambio de centro</option>
                    </select>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex justify-between border-t pt-6">
            <button onClick={onClose} className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors">Cancelar</button>
            <button 
              onClick={nextPhase} 
              className="px-6 py-2.5 bg-[#A50034] text-white rounded-lg hover:bg-[#8a002b] transition-colors shadow-md flex items-center gap-2 font-medium"
            >
              {expediente.currentPhase === 3 ? 'Finalizar Expediente' : 'Siguiente Fase'} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Tools & Models Sidebar */}
        <div className="space-y-6">
          {/* Deadline Box */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Clock size={18} /> Control de Plazos
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200 shadow-sm">
                <span className="text-xs text-gray-600">Comunicar incoación:</span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Inmediato</span>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200 shadow-sm">
                <span className="text-xs text-gray-600">Recusación Instructor:</span>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">2 días lectivos</span>
              </div>
              <div className="bg-blue-50 p-2 rounded text-[10px] text-blue-800 leading-tight">
                  <strong>Nota FAQ P.11:</strong> Las medidas de corrección son inmediatamente ejecutivas (Art 29.2.b.1º), salvo en el procedimiento abreviado que requiere acuerdo.
              </div>
            </div>
          </div>

          {/* Documents Generator */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h4 className="font-bold text-slate-800">Generar Documentos</h4>
              <button 
                onClick={() => setShowAllDocs(!showAllDocs)}
                className="text-[10px] text-blue-600 hover:underline cursor-pointer"
              >
                {showAllDocs ? "Ver solo fase" : "Ver todos"}
              </button>
            </div>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {availableDocs.map((doc) => (
                <button 
                  key={doc.id}
                  onClick={() => generatePDF(doc, expediente)}
                  className="w-full flex items-start text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all group"
                >
                  <FileText className="text-red-600 shrink-0 mt-0.5" size={18} />
                  <div className="ml-3 w-full">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">{doc.id}</span>
                      {doc.requiredForPhase && <span className="text-[10px] bg-red-100 text-red-800 px-1.5 rounded font-bold">REQ</span>}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-tight mt-1">{doc.title}</p>
                    <div className="mt-2 flex items-center text-[10px] text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={10} className="mr-1" /> Descargar PDF
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpedienteWizard;