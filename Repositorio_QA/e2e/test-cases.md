# Pruebas E2E

# Suite de Pruebas Funcionales: Autenticación y Carrito de Compras

**Tipo de Pruebas:** Funcionales / Extremo a Extremo (E2E)  
**Herramienta de Automatización:** Playwright (TypeScript)

---

##  Módulo 01: Flujo de Autenticación (Modo: Serial)
*Nota: Estos casos se ejecutan secuencialmente ya que el flujo de Login depende del registro previo.*

### TC-AUTH-01: Registro Exitoso de Nueva Cuenta
* **Prioridad:** Alta (P1)
* **Severidad:** Crítica
* **Tipo:** Positiva (Flujo Crítico)
* **Precondiciones:** El correo electrónico dinámico generado para la prueba no debe existir en la base de datos de producción.

#### Pasos de Ejecución:
1. Navegar a la página de registro (`/Register`).
2. Ingresar "QA Portfolio" en el campo de texto "Nombre".
3. Ingresar el correo electrónico dinámico generado en el campo "Correo electrónico".
4. Ingresar la contraseña segura en el campo "Contraseña".
5. Hacer clic en el botón "Crear cuenta".

#### Resultado Esperado:
* El sistema procesa el registro en menos de 15 segundos.
* El usuario es redirigido automáticamente a la URL de inicio de sesión (`/Login`) o a la raíz de la aplicación si el login es automático.

---

### TC-AUTH-02: Inicio de Sesión Exitoso con Cuenta Registrada
* **Prioridad:** Alta (P1)
* **Severidad:** Bloqueante
* **Tipo:** Positiva (Flujo Crítico)
* **Precondiciones:** El usuario debió haberse registrado exitosamente en el paso anterior (`TC-AUTH-01`).

#### Pasos de Ejecución:
1. Navegar a la página de inicio de sesión (`/Login`).
2. Ingresar el correo electrónico registrado en el campo "Correo electrónico".
3. Ingresar la contraseña correspondiente en el campo "Contraseña".
4. Hacer clic en el botón "Entrar".

#### Resultado Esperado:
* El sistema autentica las credenciales en menos de 15 segundos.
* El usuario es redirigido a la página de inicio (`/`) de la plataforma como usuario autenticado.

---

##  Módulo 02: Gestión del Carrito de Compras y Catálogo

### TC-CART-01: Navegación por Catálogo y Adición de Producto al Carrito
* **Prioridad:** Alta (P1)
* **Severidad:** Crítica
* **Tipo:** Positiva (Flujo Crítico)
* **Precondiciones:** Debe existir al menos un producto visible en la página principal con el enlace estructurado `/Product/*`.

#### Pasos de Ejecución:
1. Navegar a la página principal de la tienda (`/`).
2. Localizar el primer producto disponible y hacer clic en su enlace de detalle.
3. Verificar que la página de detalle del producto cargue correctamente, mostrando el encabezado principal (H1) con el nombre del artículo.
4. Capturar el nombre del producto de forma dinámica.
5. Hacer clic en el botón "Añadir al carrito".
6. Navegar directamente a la vista del carrito de compras (`/ShoppingCart`).

#### Resultado Esperado:
* La URL de destino cambia a la estructura de detalle del producto (`/Product/[ID]`).
* Al ingresar a `/ShoppingCart`, se despliega el encabezado "Tu carrito" y la sección "Resumen".
* El producto capturado dinámicamente en el paso 4 aparece listado en el carrito de compras.

---

### TC-CART-02: Control de Restricción para Usuarios Anónimos en Favoritos
* **Prioridad:** Media (P2)
* **Severidad:** Mayor
* **Tipo:** Negativa / Control de Acceso
* **Precondiciones:** El usuario actual no debe haber iniciado sesión (Sesión anónima / Limpia de cookies).

#### Pasos de Ejecución:
1. Navegar a la página principal de la tienda (`/`).
2. Localizar el primer botón de favoritos disponible (identificado por el atributo `aria-label` que inicia con "Agregar ").
3. Hacer clic en el botón de favoritos.
4. Interceptar la petición de red dirigida al endpoint del servidor (`POST /api/favorites`).

#### Resultado Esperado:
* La API del servidor debe rechazar la petición respondiendo estrictamente con un código de estado HTTP **401 (Unauthorized)**.
* La interfaz de usuario debe reaccionar mostrando el mensaje de alerta en pantalla: *"Inicia sesión para agregar productos a favoritos."*.
* El botón de favoritos debe mantener su estado inicial (`aria-label` comenzando con "Agregar ") garantizando que la acción no se procesó.

---

### TC-CART-03: Actualización de Cantidad y Eliminación de Ítem en el Carrito
* **Prioridad:** Alta (P1)
* **Severidad:** Crítica
* **Tipo:** Positiva (Flujo de Gestión)
* **Precondiciones:** Inyección previa mediante script en el `window.localStorage` del estado simulado del carrito: `[{"id": "qa-product", "name": "Producto QA", "price": 25, "quantity": 1}]`.

#### Pasos de Ejecución:
1. Inyectar los datos del producto en el almacenamiento local (`localStorage`) bajo la clave `zandev-cart`.
2. Navegar directamente a la vista del carrito de compras (`/ShoppingCart`).
3. Localizar el selector numérico de cantidad (`spinbutton`) con la etiqueta "Cantidad" y cambiar su valor a "3".
4. Hacer clic en el botón "Eliminar" asociado al producto.

#### Resultado Esperado:
* La interfaz refleja de inmediato el cambio de cantidad a "3" en el input.
* Tras hacer clic en "Eliminar", el ítem desaparece por completo del DOM.
* Se despliega en la pantalla el mensaje de estado vacío: *"Tu carrito está vacío."*.
