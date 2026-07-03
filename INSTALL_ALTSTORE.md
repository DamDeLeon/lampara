# Instalar Lámpara en tu iPhone con AltStore

Guía para compilar la app en la nube (sin Mac) e instalarla en tu iPhone 7 vía AltStore, usando tu Apple ID gratuita.

---

## Antes de empezar: una incertidumbre honesta

EAS Build necesita generar un certificado de firma "Development" con tu Apple ID para poder compilar un `.ipa` instalable en un iPhone real. Este tipo de certificado (distinto al de distribución en App Store, que sí requiere pagar 99 USD/año) **normalmente está disponible con una cuenta gratuita** — es el mismo mecanismo que usa Xcode con una "Personal Team" gratuita. Sin embargo, no puedo confirmar al 100% que el proceso automático de EAS lo acepte sin intentarlo en vivo.

**Qué significa esto para ti:** cuando lleguemos al paso de `eas build`, si EAS rechaza tu Apple ID gratuita pidiendo una cuenta de pago, te aviso de inmediato y buscamos una alternativa (por ejemplo, usar la Mac de alguien una sola vez solo para generar el certificado, que luego se reutiliza desde Windows). No lo sabremos con certeza hasta ese paso.

---

## Paso 1 — Instalar software en tu PC Windows

1. **Apple Mobile Device Support / iTunes**: AltServer necesita los drivers de Apple para comunicarse con tu iPhone.
   - Descarga iTunes desde https://www.apple.com/itunes/ (la versión de Microsoft Store **no** sirve — debe ser el instalador directo de Apple) o instala solo "Apple Devices" desde Microsoft Store como alternativa más ligera.
2. **AltServer para Windows**: descarga desde https://faq.altstore.io o https://altstore.io (versión "AltStore Classic", ya que "AltStore PAL" solo está disponible en UE/Japón/Brasil).
3. Verifica que tu cuenta de Expo esté conectada (`eas login`, ya lo hicimos).

## Paso 2 — Compilar el `.ipa` con EAS

Desde la carpeta del proyecto:

```
eas build --platform ios --profile altstore
```

- Te pedirá iniciar sesión con tu Apple ID (la misma gratuita) para registrar tu iPhone y generar el certificado.
- Te pedirá el UDID de tu iPhone — EAS puede generarte un link para obtenerlo fácilmente desde el propio teléfono, sin Mac.
- Al terminar, descarga el archivo `.ipa` generado (EAS te da un link).

## Paso 3 — Instalar AltStore en tu iPhone (primera vez, con USB)

1. Conecta tu iPhone a la PC con cable y ábrelo (confía en la computadora si te lo pide).
2. Abre AltServer en Windows (queda en la bandeja del sistema, junto al reloj).
3. Clic derecho en el ícono de AltServer → **Install AltStore** → selecciona tu iPhone.
4. Te pedirá tu Apple ID y contraseña (se usan localmente para firmar; Apple no ve nada distinto a un inicio de sesión normal de desarrollo).
5. En tu iPhone: **Ajustes → General → VPN y administración de dispositivos** → confía en tu Apple ID como desarrollador.
6. Abre la app **AltStore** que ya debería aparecer en tu pantalla de inicio.

## Paso 4 — Instalar (sideload) el `.ipa` de Lámpara

1. Con el iPhone conectado (USB o en la misma red WiFi que la PC con AltServer corriendo):
2. Clic derecho en el ícono de AltServer → **Install** → selecciona el archivo `lampara.ipa` que descargaste de EAS → elige tu iPhone.
3. Espera la instalación (puede tardar 1-2 minutos). Aparecerá el ícono de Lámpara en tu pantalla de inicio.

## Paso 5 — El ciclo de renovación cada 7 días

- Con cuenta gratuita, la firma expira cada 7 días.
- **AltServer debe estar corriendo en tu PC Windows** (aunque sea en segundo plano) y tu iPhone conectado a la **misma red WiFi** al menos una vez por semana — AltServer renueva la firma automáticamente en ese momento, sin que hagas nada más.
- Si pasan más de 7 días sin coincidir en la misma red, la app dejará de abrir y tendrás que repetir el Paso 4 (reinstalar) — **por eso la función de exportar historial es obligatoria**: expórtalo antes de que eso pase, o al menos periódicamente.

## Actualizaciones futuras

Cuando hagamos cambios a la app, repites solo el Paso 2 (nuevo build) y el Paso 4 (reinstalar ese nuevo `.ipa`) — no hace falta repetir el Paso 3.
