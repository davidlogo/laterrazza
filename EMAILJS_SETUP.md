# Configuración de EmailJS para el Formulario de Reservas

## ¿Qué es EmailJS?
EmailJS es un servicio que permite enviar emails directamente desde el frontend de tu aplicación web sin necesidad de un backend.

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Haz clic en "Sign Up" y crea una cuenta gratuita

### 2. Crear un servicio de email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, etc.)
- Sigue las instrucciones para conectar tu cuenta de email
- **Guarda el Service ID** que se te proporciona

### 3. Crear una plantilla de email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa esta plantilla como base:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Nueva Reserva - La Terraza Italiana</title>
</head>
<body>
    <h2>Nueva Reserva Recibida</h2>
    
    <h3>Información del Cliente:</h3>
    <p><strong>Nombre:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Teléfono:</strong> {{from_phone}}</p>
    
    <h3>Detalles de la Reserva:</h3>
    <p><strong>Número de Comensales:</strong> {{guests}}</p>
    <p><strong>Fecha:</strong> {{date}}</p>
    <p><strong>Hora:</strong> {{time}}</p>
    
    <h3>Mensaje Adicional:</h3>
    <p>{{message}}</p>
    
    <hr>
    <p><em>Este email fue enviado desde el formulario de reservas de La Terraza Italiana</em></p>
</body>
</html>
```

- **Guarda el Template ID** que se te proporciona

### 4. Obtener tu Public Key
- En el dashboard, ve a "Account" → "API Keys"
- **Copia tu Public Key**

### 5. Actualizar la configuración
- Abre el archivo `src/config/emailjs.ts`
- Reemplaza los valores con tus credenciales reales:

```typescript
export const emailjsConfig = {
  serviceId: 'TU_SERVICE_ID_AQUI',
  templateId: 'TU_TEMPLATE_ID_AQUI', 
  publicKey: 'TU_PUBLIC_KEY_AQUI'
};
```

### 6. Probar el formulario
- Una vez configurado, el formulario enviará las reservas al correo `rrhh.terrazaitaliana@gmail.com`
- Cada reserva incluirá toda la información del formulario
- El cliente recibirá una confirmación automática

## Notas importantes:
- **Plan gratuito**: EmailJS permite 200 emails por mes en el plan gratuito
- **Seguridad**: Las claves públicas son seguras para usar en el frontend
- **Plantilla personalizable**: Puedes modificar la plantilla de email según tus necesidades
- **Respuestas automáticas**: Puedes configurar respuestas automáticas a los clientes

## Solución de problemas:
- Si no recibes emails, verifica que las credenciales sean correctas
- Revisa la consola del navegador para errores
- Verifica que tu proveedor de email permita el envío desde servicios externos
