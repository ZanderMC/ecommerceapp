# Casos de Prueba Manuales

## Suite funcional: autenticación, catálogo, favoritos y carrito

**Tipo:** Pruebas funcionales manuales  
**Entorno:** QA / staging  
**Datos:** Utilizar únicamente usuarios y productos de prueba  

### Estados permitidos

- **Passed:** el resultado actual coincide con el esperado.
- **Failed:** el resultado actual no coincide con el esperado.
- **Blocked:** no se puede ejecutar por una dependencia o configuración faltante.
- **Not Run:** todavía no se ha ejecutado.

---

## Módulo 01: Autenticación

### TC-AUTH-01: Registro exitoso de nueva cuenta

- **Prioridad:** Alta (P1)
- **Severidad:** Crítica
- **Tipo:** Positiva
- **Precondiciones:** Disponer de un correo de prueba nuevo.

#### Pasos

1. Navegar a `/Register`.
2. Escribir un nombre válido.
3. Escribir un correo de prueba que no exista.
4. Escribir una contraseña válida de al menos seis caracteres.
5. Hacer clic en `Crear cuenta`.

#### Resultado esperado

- La cuenta se crea correctamente.
- El usuario es redirigido a `/Login` o a `/`.
- Si la confirmación de correo está activa, se informa que debe revisar su correo.

---

### TC-AUTH-02: Inicio de sesión con cuenta registrada

- **Prioridad:** Alta (P1)
- **Severidad:** Bloqueante
- **Tipo:** Positiva
- **Precondiciones:** Tener una cuenta de prueba registrada.

#### Pasos

1. Navegar a `/Login`.
2. Escribir el correo registrado.
3. Escribir la contraseña correcta.
4. Hacer clic en `Entrar`.

#### Resultado esperado

- El usuario es autenticado.
- Es redirigido al catálogo (`/`).
- La sesión permanece activa al recargar la página.

---

### TC-AUTH-03: Registro con campos obligatorios vacíos

- **Prioridad:** Alta (P1)
- **Severidad:** Mayor
- **Tipo:** Negativa
- **Precondiciones:** Estar en `/Register`.

#### Pasos

1. Dejar nombre, correo y contraseña vacíos.
2. Hacer clic en `Crear cuenta`.

#### Resultado esperado

- El formulario no se envía.
- El sistema indica los campos obligatorios.
- No se crea una cuenta.

---

### TC-AUTH-04: Registro con correo inválido

- **Prioridad:** Media (P2)
- **Severidad:** Mayor
- **Tipo:** Negativa

#### Pasos

1. Navegar a `/Register`.
2. Escribir un nombre válido.
3. Escribir `correo-invalido`.
4. Escribir una contraseña válida.
5. Hacer clic en `Crear cuenta`.

#### Resultado esperado

- El sistema solicita un formato de correo válido.
- El formulario no crea la cuenta.
- No se muestra un error técnico.

---

### TC-AUTH-05: Inicio de sesión con contraseña incorrecta

- **Prioridad:** Alta (P1)
- **Severidad:** Bloqueante
- **Tipo:** Negativa
- **Precondiciones:** Tener un correo de prueba registrado.

#### Pasos

1. Navegar a `/Login`.
2. Escribir un correo válido.
3. Escribir una contraseña incorrecta.
4. Hacer clic en `Entrar`.

#### Resultado esperado

- El usuario no inicia sesión.
- Se muestra un mensaje de error controlado.
- El usuario no es redirigido al catálogo autenticado.

---

## Módulo 02: Catálogo y favoritos

### TC-CAT-01: Navegación del catálogo al detalle

- **Prioridad:** Alta (P1)
- **Severidad:** Crítica
- **Tipo:** Positiva
- **Precondiciones:** Existir al menos un producto publicado.

#### Pasos

1. Navegar a `/`.
2. Seleccionar un producto del catálogo.
3. Abrir el detalle del producto.

#### Resultado esperado

- Se muestra el nombre del producto.
- Se muestra el precio.
- Se muestra la descripción.
- Se muestra el botón `Añadir al carrito`.

---

### TC-CAT-02: Búsqueda sin resultados

- **Prioridad:** Media (P2)
- **Severidad:** Menor
- **Tipo:** Negativa

#### Pasos

1. Navegar al catálogo.
2. Buscar `producto-qa-inexistente`.

#### Resultado esperado

- No se muestran productos incorrectos.
- Aparece el mensaje `No encontramos productos que coincidan con tu búsqueda.`.
- La página continúa funcionando.

---

### TC-FAV-01: Agregar producto a favoritos con sesión activa

- **Prioridad:** Media (P2)
- **Severidad:** Mayor
- **Tipo:** Positiva
- **Precondiciones:** Iniciar sesión con un usuario de prueba.

#### Pasos

1. Navegar al catálogo.
2. Hacer clic en el botón de favoritos de un producto.
3. Abrir la pestaña `Favoritos`.

#### Resultado esperado

- Se muestra un mensaje de confirmación.
- El producto aparece en favoritos.
- El botón cambia a la opción para quitarlo de favoritos.

---

### TC-FAV-02: Impedir favoritos para usuario anónimo

- **Prioridad:** Alta (P1)
- **Severidad:** Mayor
- **Tipo:** Negativa / Control de acceso
- **Precondiciones:** No tener una sesión iniciada.

#### Pasos

1. Cerrar sesión o abrir una ventana privada.
2. Navegar al catálogo.
3. Hacer clic en favoritos de un producto.

#### Resultado esperado

- El producto no se agrega a favoritos.
- Se muestra `Inicia sesión para agregar productos a favoritos.`.
- El botón mantiene el estado de producto no favorito.
- No se revela información sensible ni un error técnico.

---

## Módulo 03: Carrito de compras

### TC-CART-01: Agregar producto al carrito

- **Prioridad:** Alta (P1)
- **Severidad:** Crítica
- **Tipo:** Positiva
- **Precondiciones:** Existir un producto disponible.

#### Pasos

1. Navegar a `/`.
2. Abrir el detalle de un producto.
3. Seleccionar una talla si el producto tiene tallas.
4. Hacer clic en `Añadir al carrito`.
5. Navegar a `/ShoppingCart`.

#### Resultado esperado

- El producto aparece en el carrito.
- Se muestra la talla seleccionada.
- La cantidad inicial es uno.
- Se muestra el precio y el total correcto.

---

### TC-CART-02: Consolidar el mismo producto y talla

- **Prioridad:** Alta (P1)
- **Severidad:** Mayor
- **Tipo:** Positiva

#### Pasos

1. Agregar un producto con talla `M`.
2. Volver al detalle del mismo producto.
3. Agregarlo nuevamente con talla `M`.
4. Abrir el carrito.

#### Resultado esperado

- El producto aparece una sola vez.
- La cantidad se acumula correctamente.
- El total se recalcula.

---

### TC-CART-03: Mantener separadas tallas diferentes

- **Prioridad:** Media (P2)
- **Severidad:** Mayor
- **Tipo:** Positiva

#### Pasos

1. Agregar un producto con talla `M`.
2. Agregar el mismo producto con talla `L`.
3. Abrir el carrito.

#### Resultado esperado

- Se muestran dos líneas de producto.
- Cada línea conserva su talla.
- Las cantidades y subtotales son independientes.

---

### TC-CART-04: Actualizar cantidad y eliminar producto

- **Prioridad:** Alta (P1)
- **Severidad:** Crítica
- **Tipo:** Positiva
- **Precondiciones:** Tener un producto en el carrito.

#### Pasos

1. Abrir `/ShoppingCart`.
2. Cambiar la cantidad a `3`.
3. Verificar el total.
4. Hacer clic en `Eliminar`.

#### Resultado esperado

- La cantidad cambia a `3`.
- El total se actualiza correctamente.
- El producto desaparece.
- Si era el único producto, aparece `Tu carrito está vacío.`.

---

### TC-CART-05: Impedir cantidad menor que uno

- **Prioridad:** Alta (P1)
- **Severidad:** Mayor
- **Tipo:** Negativa

#### Pasos

1. Abrir el detalle de un producto.
2. Hacer clic varias veces en `Disminuir cantidad`.
3. Intentar escribir `0` o `-1`.

#### Resultado esperado

- La cantidad nunca queda por debajo de uno.
- No se generan subtotales negativos.
- El producto se puede agregar con una cantidad válida.

---

### TC-CART-06: Persistencia del carrito después de recargar

- **Prioridad:** Alta (P1)
- **Severidad:** Mayor
- **Tipo:** Positiva

#### Pasos

1. Agregar un producto.
2. Abrir el carrito.
3. Recargar la página.

#### Resultado esperado

- El producto continúa en el carrito.
- La cantidad y el total se conservan.

---

### TC-CART-07: Carrito vacío

- **Prioridad:** Media (P2)
- **Severidad:** Menor
- **Tipo:** Negativa / Estado límite

#### Pasos

1. Eliminar todos los productos del carrito.
2. Abrir `/ShoppingCart`.

#### Resultado esperado

- Aparece `Tu carrito está vacío.`.
- Aparece la opción `Seguir comprando`.
- No se muestra un total incorrecto.

---

## Registro de ejecución manual

| ID | Fecha | Entorno | Navegador | Resultado actual | Estado | Evidencia | Defecto |
|---|---|---|---|---|---|---|---|
| TC-XXX | AAAA-MM-DD | QA | Chrome | Pendiente | Not Run | Pendiente | N/A |

Para cada caso ejecutado, reemplazar `Pendiente` por el resultado observado y
adjuntar una captura cuando el caso falle. En los casos `Failed`, documentar
pasos para reproducir, resultado esperado, resultado actual, severidad y enlace
a la evidencia.
