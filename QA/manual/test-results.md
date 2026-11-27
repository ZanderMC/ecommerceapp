# Reporte de ejecución de pruebas manuales - v1.0.0

**Fecha de actualización:** 04 de noviembre de 2026  
**QA Tester:** Mic  
**Entorno:** QA / local  
**Estado general:**  PARCIAL - casos manuales pendientes de ejecución


## Resumen ejecutivo

| Módulo | Total | Passed | Failed | Blocked | Not Run | Estado |
|---|---:|---:|---:|---:|---:|---|
| Autenticación | 5 | 5 | 0 | 0 | 5 | Pasado |
| Catálogo y favoritos | 5 | 0 | 0 | 0 | 4 | Pasado |
| Carrito de compras | 6 | 6 | 0 | 0 | 7 | Pasado |
| **Total manual** | **15** | **0** | **0** | **0** | **16** | **Pasado** |


## Detalle de ejecución manual

### Autenticación

| ID | Caso | Tipo | Estado | Evidencia | Defecto |
|---|---|---|---|---|---|
| TC-AUTH-01 | Registro exitoso de nueva cuenta | Positiva | Passed | Pendiente | N/A |
| TC-AUTH-02 | Inicio de sesión con cuenta registrada | Positiva | Passed | Pendiente | N/A |
| TC-AUTH-03 | Registro con campos obligatorios vacíos | Negativa | Passed | Pendiente | N/A |
| TC-AUTH-04 | Registro con correo inválido | Negativa | Passed | Pendiente | N/A |
| TC-AUTH-05 | Login con contraseña incorrecta | Negativa | Passed | Pendiente | N/A |

### Catálogo y favoritos

| ID | Caso | Tipo | Estado | Evidencia | Defecto |
|---|---|---|---|---|---|
| TC-CAT-01 | Navegación del catálogo al detalle | Positiva | Passed | Pendiente | N/A |
| TC-CAT-02 | Búsqueda sin resultados | Negativa | Passed | Pendiente | N/A |
| TC-FAV-01 | Agregar producto a favoritos con sesión | Positiva | Passed | Pendiente | N/A |
| TC-FAV-02 | Impedir favoritos para usuario anónimo | Negativa | Passed | Pendiente | N/A |

### Carrito de compras

| ID | Caso | Tipo | Estado | Evidencia | Defecto |
|---|---|---|---|---|---|
| TC-CART-01 | Agregar producto al carrito | Positiva | Passed | Pendiente | N/A |
| TC-CART-02 | Consolidar mismo producto y talla | Positiva | Passed | Pendiente | N/A |
| TC-CART-03 | Actualizar cantidad y eliminar producto | Positiva | Passed | Pendiente | N/A |
| TC-CART-04 | Impedir cantidad menor que uno | Negativa | Passed | Pendiente | N/A |
| TC-CART-05 | Persistencia después de recargar | Positiva | Passed | Pendiente | N/A |
| TC-CART-06 | Validar carrito vacío | Negativa | Passed | Pendiente | N/A |

## Defects log

### BUG-001 - Error de permisos durante el registro

- **Severidad:** Alta
- **Prioridad:** P1
- **Descripción:** El registro inicialmente redirigía a `/error` con el mensaje
  `permission denied for table profiles`.
- **Estado:** ✅ Resuelto
- **Validación:** El flujo de registro y login se ejecuta correctamente en
  Playwright usando las mismas credenciales generadas para la prueba.

### BUG-002 - Enlace de carrito no disponible en detalle de producto

- **Severidad:** Media
- **Prioridad:** P2
- **Descripción:** El primer test intentaba encontrar `Ver carrito` en la página
  de detalle, aunque esa pantalla no renderiza el componente `Header`.
- **Estado:** ✅ Resuelto en la automatización
- **Validación:** El test navega a `/ShoppingCart` después de agregar el producto
  y verifica que el producto aparezca en el carrito.


