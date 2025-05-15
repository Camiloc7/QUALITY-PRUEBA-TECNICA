# 📄 Quality - Prueba Técnica

Este proyecto es una aplicación web que permite **resumir textos automáticamente** utilizando la API de Google Cloud Vertex AI (modelo Gemini). Al generar un resumen, este se puede guardar, visualizar y **exportar automáticamente como PDF** o de forma manual.

---

🔗 **Despliegue en producción:**  
👉 [https://quality-prueba-tecnica.vercel.app](https://quality-prueba-tecnica.vercel.app)

---

## 🚀 Funcionalidades

- ✅ Ingreso de texto largo para resumir.
- ✅ Generación del resumen usando Vertex AI (Gemini).
- ✅ Historial de resúmenes guardados en `localStorage`.
- ✅ Exportación a PDF del resumen:
  - Manual mediante botón.
  - Automática al generar el resumen.
- ✅ Interfaz moderna y responsiva con Tailwind CSS.

---

## 🧪 Tecnologías utilizadas

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Google Cloud Vertex AI (Gemini)**
- **jsPDF** (para exportar a PDF)

---

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Camiloc7/QUALITY-PRUEBA-TECNICA.git
cd QUALITY-PRUEBA-TECNICA
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo llamado `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
GOOGLE_CLOUD_PROJECT_ID=tu_project_id
GOOGLE_CLOUD_REGION=us-central1

# Pega aquí el JSON completo de la cuenta de servicio en una sola línea
GOOGLE_CREDENTIALS_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n", ...}
```

### 4. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

---

🧑‍💻 Desarrollado por: **Jhonatan Camilo Corredor Silva**