"use client";

import { useState, useEffect } from 'react';
import ExportarPDF from './ExportarPDF';

const STORAGE_KEY = 'historialResúmenes';

export default function ChatResumen() {
  const [nota, setNota] = useState('');
  const [resumen, setResumen] = useState('');
  const [cargando, setCargando] = useState(false);
  const [historial, setHistorial] = useState<string[]>([]);
  const [pdfAuto, setPdfAuto] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setHistorial(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historial));
  }, [historial]);

  const manejarResumen = async () => {
    if (!nota.trim()) return;
    setCargando(true);
    try {
      const res = await fetch('/api/resumir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: nota }),
      });
      const data = await res.json();
      const nuevoResumen = data.respuesta || 'No se pudo generar el resumen.';
      setResumen(nuevoResumen);
      setHistorial((prev) => [nuevoResumen, ...prev]);
      setPdfAuto(true);
    } catch {
      setResumen('Ocurrió un error al generar el resumen.');
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setNota('');
    setResumen('');
  };

  const manejarSeleccionResumen = (index: number) => {
    setResumen(historial[index]);
    setNota('');
  };

  const eliminarResumen = (index: number) => {
    const nuevoHistorial = historial.filter((_, i) => i !== index);
    setHistorial(nuevoHistorial);
    if (historial[index] === resumen) {
      setResumen('');
    }
  };

  const abrirPDFEnNuevaPestaña = (url: string) => {
    window.open(url, '_blank');
    setPdfAuto(false);
  };

  return (
    <div className="flex min-h-screen text-white font-sans bg-[#0A0A2A]">
      <aside className="w-1/5 bg-[#0D0D3A] border-r border-blue-900 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Resúmenes guardados</h2>
        {historial.length === 0 ? (
          <p className="text-gray-400">Aún no hay resúmenes.</p>
        ) : (
          <ul className="space-y-2">
            {historial.map((item, index) => (
              <li
                key={index}
                className="bg-[#1A1A4A] p-3 rounded text-sm whitespace-pre-wrap cursor-pointer hover:bg-[#2C2C6A] relative group"
              >
                <button
                  className="absolute top-1 right-2 text-red-400 hover:text-red-600 text-sm hidden group-hover:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarResumen(index);
                  }}
                >
                  ✕
                </button>
                <div onClick={() => manejarSeleccionResumen(index)}>
                  {item.slice(0, 150)}...
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <h1 className="text-3xl font-bold">Generar nuevo resumen</h1>
        <textarea
          className="w-full h-150 mt-6 p-4 rounded text-white text-base resize-none"
          placeholder="Escribe o pega el texto que deseas resumir..."
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          disabled={cargando}
        />
        <div className="flex flex-wrap gap-4">
          <button
            onClick={manejarResumen}
            disabled={!nota.trim() || cargando}
            className={`px-6 py-2 rounded font-semibold ${cargando
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {cargando ? 'Resumiendo...' : 'Resumir'}
          </button>

          <button
            onClick={limpiarFormulario}
            className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            Nuevo Resumen
          </button>

          {resumen && !cargando && (
            <ExportarPDF texto={resumen} />
          )}
        </div>

        {resumen && (
          <>
            <div className="bg-[#1C1C50] rounded p-4 shadow whitespace-pre-wrap text-lg mt-4">
              <h2 className="text-xl font-semibold mb-2">Resumen generado:</h2>
              <p>{resumen}</p>
            </div>

            {pdfAuto && (
              <ExportarPDF texto={resumen} auto onGenerado={abrirPDFEnNuevaPestaña} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
