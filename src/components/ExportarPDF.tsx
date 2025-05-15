'use client';

import React from 'react';
import jsPDF from 'jspdf';

interface ExportarPDFProps {
  texto: string;
}

export default function ExportarPDF({ texto }: ExportarPDFProps) {
  const generarPDF = () => {
    const doc = new jsPDF();

    const splitText = doc.splitTextToSize(texto, 180); 
    doc.text(splitText, 10, 10);

    doc.save('resumen.pdf');
  };

  return (
    <button
      onClick={generarPDF}
      className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
    >
      Exportar PDF
    </button>
  );
}
