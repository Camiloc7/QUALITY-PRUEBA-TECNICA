// 'use client';
// import jsPDF from 'jspdf';

// interface Props {
//   texto: string;
//   auto?: boolean;
//   onGenerado?: (url: string) => void;
// }

// export default function ExportarPDF({ texto, auto = false, onGenerado }: Props) {
//   const generarPDF = () => {
//     const doc = new jsPDF();
//     const lineas = doc.splitTextToSize(texto, 180);
//     doc.text(lineas, 10, 10);
//     if (onGenerado) {
//       const blob = doc.output('blob');
//       const url = URL.createObjectURL(blob);
//       onGenerado(url);
//     } else {
//       doc.save('resumen.pdf');
//     }
//   };

//   if (auto) {
//     generarPDF();
//     return null;
//   }

//   return (
//     <button
//       onClick={generarPDF}
//       className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 font-semibold"
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
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    doc.setFillColor(24, 68, 150);
    doc.rect(0, 0, pageWidth, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('QUALITY SOFT SERVICE', pageWidth / 2, 13, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumen Generado', pageWidth / 2, 35, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    const lineas = doc.splitTextToSize(texto, maxWidth);
    doc.text(lineas, margin, 50);

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);

    if (onGenerado) {
      onGenerado(url);
    }

    window.open(url, '_blank');
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
