'use client';
import { useState, useEffect } from 'react';
export default function ModalBienvenida() {
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    const yaMostrado = localStorage.getItem('bienvenidaVisto');
    if (!yaMostrado) {
      setMostrar(true);
    }
  }, []);
  const cerrarModal = () => {
    setMostrar(false);
    localStorage.setItem('bienvenidaVisto', 'true');
  };
  if (!mostrar) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#0A0A2A] text-white max-w-lg w-full rounded-lg shadow-lg p-6 border border-blue-800">
        <h2 className="text-2xl font-bold mb-4">¡Bienvenido al Asistente de Resumen!</h2>
        <p className="mb-4 text-sm text-gray-300">
          Esta aplicación te ayuda a resumir textos largos usando inteligencia artificial.
          <br /><br />
          ✏️ Escribe o pega un texto en el área correspondiente.<br />
          ⚡ Haz clic en "Resumir" para generar un resumen.<br />
          📄 Puedes guardar, exportar y revisar resúmenes anteriores desde el historial de la izquierda.
        </p>
        <div className="text-right">
          <button
            onClick={cerrarModal}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
