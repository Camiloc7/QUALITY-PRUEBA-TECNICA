import { NextRequest, NextResponse } from 'next/server';
import { VertexAI } from '@google-cloud/vertexai';
import * as fs from 'fs';
import * as path from 'path';

const credPath = path.join(process.cwd(), 'google-credentials.json');

if (process.env.GOOGLE_CREDENTIALS_JSON) {
  fs.writeFileSync(credPath, process.env.GOOGLE_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
} 

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT_ID,
  location: process.env.GOOGLE_CLOUD_REGION,
});

const model = vertexAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

const contextoSistema = `
debes resumir el texto proporcionado
`;

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json();
    if (!texto) {
      return NextResponse.json({ error: 'No se proporcionó texto' }, { status: 400 });
    }
    const prompt = `
${contextoSistema}
Usuario: ${texto}
Asistente:
`;
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const response = await result.response;
    const respuestaBot = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No entendí tu solicitud.';
    return NextResponse.json({ respuesta: respuestaBot });
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
