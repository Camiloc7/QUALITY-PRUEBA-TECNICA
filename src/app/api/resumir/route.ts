import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';
import axios from 'axios';

const contextoSistema = `
debes resumir el texto proporcionado
`;

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json();

    if (!texto) {
      return NextResponse.json({ error: 'No se proporcionó texto' }, { status: 400 });
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!);

    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    const token = tokenResponse.token;

    if (!token) {
      throw new Error('No se pudo obtener el token de acceso.');
    }

    const prompt = `
${contextoSistema}
Usuario: ${texto}
Asistente:
`;

    const response = await axios.post(
      `https://${process.env.GOOGLE_CLOUD_REGION}-aiplatform.googleapis.com/v1/projects/${process.env.GOOGLE_CLOUD_PROJECT_ID}/locations/${process.env.GOOGLE_CLOUD_REGION}/publishers/google/models/gemini-2.0-flash-001:generateContent`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const respuestaBot =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No entendí tu solicitud.';

    return NextResponse.json({ respuesta: respuestaBot });
  } catch (error) {
    console.error('❌ Error al generar contenido:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
