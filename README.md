# Portal de Pagos Municipales - BSV X402 + Accesibilidad

🏆 Proyecto para Web3 Hackathon 2025 - BSV Association

## 📋 Descripción

Primera plataforma de pagos municipales con **protocolo X402** en **blockchain BSV** y **extensión de accesibilidad universal WCAG 2.2 AAA**.

### ✨ Características Principales

- ⚡ **Protocolo X402**: Pagos HTTP nativos (Request → 402 → Pay → Access)
- 🔗 **Blockchain BSV**: Transacciones rápidas y económicas
- ♿ **WCAG 2.2 AAA**: Máxima accesibilidad web
- 🌐 **Multilingüe**: Español e Inglés
- 📱 **Responsive**: Funciona en todos los dispositivos
- 🎨 **3 Temas**: Default, Alto Contraste, Simplificado

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ y npm
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base accesibles
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   ├── accessibility/  # Panel de accesibilidad
│   ├── layout/        # Header, Footer
│   ├── payment/       # Flujo de pago X402
│   └── services/      # Catálogo de servicios
├── contexts/          # React Contexts
│   ├── AccessibilityContext.tsx
│   └── WalletContext.tsx
├── data/              # Datos estáticos
│   └── services.ts    # Catálogo de servicios municipales
├── i18n/              # Internacionalización
│   ├── config.ts
│   └── locales/
│       ├── es.json
│       └── en.json
├── pages/             # Páginas principales
│   ├── Home.tsx
│   └── Services.tsx
├── services/          # Servicios externos
│   ├── x402-facilitator.ts  # API del facilitador
│   ├── mock-wallet.ts       # Mock de wallet BSV
│   └── mock-x402.ts         # Mock del facilitador
├── styles/            # Estilos
│   └── themes/        # Temas de accesibilidad
│       ├── default.css
│       ├── high-contrast.css
│       └── simplified.css
├── types/             # TypeScript types
│   ├── accessibility.ts
│   ├── payment.ts
│   └── services.ts
└── utils/             # Utilidades
```

## 🎯 Servicios Disponibles

### 💰 Tasas e Impuestos
- Impuesto de Bienes Inmuebles (IBI)
- Tasa de Basuras
- Plusvalía Municipal

### ⚠️ Multas y Sanciones
- Multas de Tráfico
- Infracciones Administrativas

### 📄 Servicios Administrativos
- Certificados Municipales
- Licencias de Actividad
- Padrón Municipal

### 🏛️ Servicios Públicos
- Factura de Agua
- Abono de Transporte
- Instalaciones Deportivas
- Actividades Culturales

## ♿ Accesibilidad WCAG 2.2 AAA

### Características de Accesibilidad

✅ **Contraste 7:1**: Todos los textos cumplen contraste AAA
✅ **Navegación por Teclado**: 100% accesible con teclado
✅ **Lectores de Pantalla**: Compatible con NVDA, JAWS, VoiceOver
✅ **Text-to-Speech**: Lectura en voz alta integrada
✅ **Tamaños de Texto**: 5 niveles ajustables
✅ **3 Temas Visuales**: Default, Alto Contraste, Simplificado
✅ **Reduced Motion**: Soporte para preferencias de movimiento
✅ **Mensajes de Error Claros**: Explicaciones en lenguaje natural

### Niveles de Detalle

- **Simple**: Información básica y clara
- **Estándar**: Equilibrio entre detalle y claridad
- **Técnico**: Información técnica completa

## 🔐 Flujo de Pago X402

### Protocolo X402

```
1. REQUEST    → Cliente solicita recurso protegido
2. 402        → Servidor responde "Payment Required"
3. PAY        → Cliente firma y envía transacción BSV
4. ACCESS     → Servidor valida y otorga acceso
```

### Ejemplo de Uso

```typescript
// 1. Request
const response = await x402Service.requestResource('/services/ibi-2024');

// 2. Si es 402, preparar pago
if (response.status === 402) {
  const signedTx = await wallet.signTransaction({
    outputs: [{
      satoshis: service.price,
      script: response.headers['X-PAYMENT-ADDRESS']
    }]
  });

  // 3. Submit payment
  const confirmation = await x402Service.submitPayment(paymentRequest, signedTx);

  // 4. Access resource
  const resource = await x402Service.accessResource('/services/ibi-2024', confirmation.txid);
}
```

## 🧪 Mocks y Simulación

Para facilitar el desarrollo y demo, incluimos mocks completos:

### Mock Wallet BSV
- Simula conexión de wallet
- Genera direcciones y balances aleatorios
- Firma transacciones simuladas
- Delays realistas para UX

### Mock Facilitador X402
- Simula flujo X402 completo
- Respuestas con metadata de accesibilidad
- Manejo de errores simulados
- Historial de pagos

## 🌍 Internacionalización

Idiomas soportados:
- 🇪🇸 Español (por defecto)
- 🇬🇧 English

## 🛠️ Stack Tecnológico

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Variables
- **Blockchain**: @bsv/sdk
- **i18n**: react-i18next
- **Linting**: ESLint + eslint-plugin-jsx-a11y
- **State**: React Context API

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Preview build de producción

# Calidad
npm run lint         # Analiza código con ESLint
```

## 🎨 Diseño e Inspiración

El diseño está inspirado en el portal de la **Comunidad de Madrid**, con:
- Paleta institucional (rojo #C10000, azul #003366)
- Layout limpio y profesional
- Breadcrumbs de navegación
- Footer completo con enlaces

## 🔗 URLs del Sistema

### Producción (Configurar en .env)
- **Facilitador**: `https://facilitador-bsv-x402-accesible.com`
- **Resource Server**: `https://x402-resource-server-accesible-prod.com`
- **WhatsOnChain**: `https://api.whatsonchain.com/v1/bsv/test`

### Desarrollo (Mocks)
En desarrollo se usan mocks locales que simulan todo el flujo.

## 👥 Equipo

- Andrés León
- Javier Sanchez
- Mariano De Arnijo
- F. Hipólito García
- Juan Carlos Moreno Farssac

## 📄 Licencia

MIT License - Código abierto para la comunidad

## 📞 Contacto

Para preguntas o soporte: soporte@ayuntamiento.es

## 🙏 Agradecimientos

- **BSV Association** - Por organizar el hackathon
- **MERGE** - Por el apoyo y recursos
- **Comunidad X402** - Por el protocolo innovador
- **Comunidad de accesibilidad** - Por los estándares WCAG

---

**🚀 Hecho con ❤️ para Web3 Hackathon 2025**

**♿ Accesible para tod@s | 🌐 Blockchain para el bien común**
