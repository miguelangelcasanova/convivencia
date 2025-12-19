import { jsPDF } from "jspdf";
import { DocumentModel, ExpedienteData } from "../types";
import { DECREE_COLOR } from "../constants";

export const generatePDF = (model: DocumentModel, data: ExpedienteData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxLineWidth = pageWidth - margin * 2;

  // Header
  doc.setFillColor(DECREE_COLOR); 
  doc.rect(0, 0, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Junta de Castilla y León", margin, 13);
  
  doc.setFontSize(10);
  doc.text("Consejería de Educación", pageWidth - margin - 50, 13);

  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(model.id.toUpperCase(), margin, 40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(model.title.toUpperCase(), margin, 48);

  // Content Body
  const textContent = model.generateText(data);
  const lines = doc.splitTextToSize(textContent, maxLineWidth);
  
  doc.setFontSize(11);
  doc.text(lines, margin, 65);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Documento generado automáticamente por Gestor CIFP Río Tormes", margin, doc.internal.pageSize.getHeight() - 10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, pageWidth - margin - 30, doc.internal.pageSize.getHeight() - 10);

  // Save
  doc.save(`${model.id}_${data.student.name.replace(/\s+/g, '_')}.pdf`);
};