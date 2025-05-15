// 'use client';
// import React from 'react';
// import jsPDF from 'jspdf';
// interface ExportarPDFProps {
//   texto: string;
// }
// export default function ExportarPDF({ texto }: ExportarPDFProps) {
//   const generarPDF = () => {
//     const doc = new jsPDF();
//     const splitText = doc.splitTextToSize(texto, 180); 
//     doc.text(splitText, 10, 10);
//     doc.save('resumen.pdf');
//   };
//   return (
//     <button
//       onClick={generarPDF}
//       className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
//     >
//       Exportar PDF
//     </button>
//   );
// }


'use client';
import jsPDF from 'jspdf';

interface Props {
  texto: string;
  auto?: boolean;
  onGenerado?: (url: string) => void;
}

export default function ExportarPDF({ texto, auto = false, onGenerado }: Props) {
  const generarPDF = () => {
    const doc = new jsPDF();
    const lineas = doc.splitTextToSize(texto, 180);
    doc.text(lineas, 10, 10);
    if (onGenerado) {
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      onGenerado(url);
    } else {
      doc.save('resumen.pdf');
    }
  };

  if (auto) {
    generarPDF();
    return null;
  }

  return (
    <button
      onClick={generarPDF}
      className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold"
    >
      Exportar PDF
    </button>
  );
}
