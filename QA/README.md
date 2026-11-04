# Estrategia de QA - Ecommerceapp

## 1. Propósito

Esta carpeta contiene la estrategia, los casos de prueba, la automatización y
las evidencias de calidad de Ecommerceapp. El objetivo es demostrar un proceso
de QA reproducible, con cobertura funcional positiva y negativa, trazabilidad
de defectos y validación en diferentes niveles.

El alcance actual se concentra en:

- Autenticación: registro e inicio de sesión.
- Catálogo: navegación y acceso al detalle de productos.
- Favoritos: control de acceso para usuarios autenticados y anónimos.
- Carrito: adición, cantidades, eliminación y persistencia en `localStorage`.
- Smoke testing: disponibilidad básica de la aplicación.

El checkout de Stripe no forma parte de la primera iteración automatizada para
evitar pagos y redirecciones externas durante las pruebas.

## 2. Alcance y niveles de prueba

| Nivel | Herramienta | Propósito | Ubicación |
|---|---|---|---|
| Unitario | Vitest | Validar la lógica aislada del carrito | `QA/unit` |
| Componentes | React Testing Library | Validar componentes y acciones del usuario | `QA/unit` |
| Smoke | Playwright | Confirmar que la aplicación responde y renderiza | `QA/smoke` |
| E2E funcional | Playwright | Validar flujos completos en Chromium | `QA/e2e` |
| Manual | Ejecución documentada | Cubrir escenarios funcionales, límites y regresión | `QA/manual` |

La estrategia combina pruebas rápidas y aisladas con pruebas de navegador. Las
pruebas E2E no reemplazan las unitarias: cada nivel valida un riesgo diferente.


## 3. Cobertura actual

### 3.1 Autenticación

Los flujos E2E cubren:

- Registro con un correo generado para cada ejecución.
- Inicio de sesión con las mismas credenciales del registro.
- Ejecución serial, porque el login depende de que el registro termine.
- Validación de redirección al catálogo.

Los casos manuales agregan escenarios negativos:

- Campos obligatorios vacíos.
- Correo inválido.
- Contraseña incorrecta.

### 3.2 Catálogo y favoritos

Se valida que:

- El catálogo muestre al menos un producto.
- El usuario pueda abrir el detalle.
- El detalle muestre nombre, título y botón para agregar al carrito.
- Un usuario anónimo no pueda agregar favoritos.
- La API responda `401`.
- La interfaz muestre un mensaje de autorización y conserve el estado no
  favorito.

### 3.3 Carrito

Las pruebas unitarias cubren:

- Agregar productos nuevos.
- Consolidar el mismo producto con la misma talla.
- Mantener separadas tallas diferentes.
- Persistir y leer datos desde `localStorage`.
- Manejar JSON inválido.
- Formatear precios.

Las pruebas de componentes cubren:

- Seleccionar talla.
- Aumentar cantidad.
- Impedir cantidades menores que uno.
- Agregar el producto desde la interfaz.

Las pruebas E2E cubren:

- Agregar un producto desde catálogo y detalle.
- Verificar que aparece en `/ShoppingCart`.
- Actualizar la cantidad.
- Eliminar el producto.
- Mostrar el estado de carrito vacío.

## 4. Smoke testing

Valida que:

1. La página principal responda con HTTP `200`.
2. El documento renderice un contenedor visible.

Ejecutar:

```bash
npm run test:smoke
```

Este conjunto debe ejecutarse primero después de levantar una versión nueva.
Si falla, se debe detener la regresión funcional hasta investigar el motivo.

## 6. Pruebas E2E
.

Actualmente incluyen:

| Flujo | Tipo | Resultado esperado |
|---|---|---|
| Registrar cuenta | Positivo | Cuenta creada y redirección válida |
| Iniciar sesión con la cuenta registrada | Positivo | Acceso al catálogo |
| Agregar producto al carrito | Positivo | Producto visible en el carrito |
| Agregar favorito sin sesión | Negativo | Respuesta `401` y mensaje visible |
| Actualizar y eliminar producto | Positivo | Cantidad actualizada y carrito vacío |

Ejecutar todos los E2E:

```bash
npm run test:e2e
```

Ejecutar un caso específico:

```bash
npx playwright test QA/e2e/critical-flows.spec.ts -g "browses the catalog" --workers=1
```

La configuración utiliza Chromium, servidor local de Next.js, screenshots ante
fallos, videos y traces retenidos para facilitar el diagnóstico.

## 7. Pruebas unitarias y de componentes

activa los matchers de Testing Library y limpia `localStorage` antes de cada
prueba para evitar contaminación entre escenarios.

Ejecutar la suite:

```bash
npm run test:unit
```

Ejecutar Vitest en modo observación:

```bash
npm run test:watch
```

## 8. Casos manuales y regresión

Cada caso contiene:

- ID.
- Prioridad.
- Severidad.
- Tipo de prueba.
- Precondiciones.
- Pasos reproducibles.
- Resultado esperado.

Los estados válidos son:

- `Passed`: el resultado coincide con el esperado.
- `Failed`: existe una diferencia entre esperado y actual.
- `Blocked`: no puede ejecutarse por una dependencia.
- `Not Run`: aún no se ha ejecutado.

No se deben marcar casos manuales como exitosos sin haberlos ejecutado y
respaldado con evidencia.

## 9. Evidencias y defectos

Playwright genera el reporte HTML en `QA/evidence/playwright-report/`. Para
abrir el último reporte:

```bash
npx playwright show-report QA/evidence/playwright-report
```

En un fallo se deben conservar, cuando aporten información:

- Screenshot.
- Video.
- Trace de Playwright.
- Fecha, navegador, entorno y commit.
- Pasos para reproducir.

Cada defecto debe documentar:

- ID y título.
- Severidad y prioridad.
- Precondiciones.
- Pasos para reproducir.
- Resultado esperado.
- Resultado actual.
- Evidencia.
- Estado del defecto.

Los artefactos generados de ejecución no deben incluir secretos ni credenciales.

## 10. Criterios de entrada y salida

### Criterios de entrada

- La aplicación inicia correctamente.
- Las variables de entorno de QA están configuradas.
- Existe al menos un producto de prueba.
- Las credenciales utilizadas pertenecen a un usuario de prueba.
- El entorno no realiza pagos reales.

### Criterios de salida

- El smoke test pasa.
- Los flujos P0/P1 no tienen fallos abiertos críticos.
- Los fallos tienen evidencia y pasos reproducibles.
- Las pruebas unitarias pasan.
- Los resultados manuales están actualizados.
- Los cambios relevantes tienen cobertura o una justificación documentada.

## 11. Flujo recomendado de ejecución

Ejecutar en este orden:

```bash
npm run lint
npm run test:unit
npm run test:smoke
npm run test:e2e
```

Después de una ejecución completa:

1. Revisar los fallos.
2. Abrir el reporte HTML de Playwright.
3. Registrar defectos en `manual/test-results.md`.
4. Adjuntar evidencia seleccionada.
5. Actualizar los casos afectados.

## 12. Próximas mejoras

- Añadir casos negativos E2E para login y registro.
- Cubrir el manejo de errores de la API de checkout con mocks.
- Automatizar la persistencia del carrito después de recargar.
- Añadir pruebas E2E para favoritos con sesión autenticada.
- Añadir cobertura y umbrales para la lógica crítica.
- Integrar la suite en CI cuando el entorno de datos de QA esté definido.
