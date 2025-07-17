/* FORMULARIO DE CONTACTO */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por contactarnos! Pronto te responderemos.');
      form.reset();
    });
  }
});

/* FORMULARIO DE DIAGNÓSTICO */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('diagnosticoForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por contactarnos! Pronto te responderemos.');
      form.reset();
    });
  }
});

/* SISTEMA DE GARANTÍAS */

// Función para buscar garantías por número de factura
// Utiliza datos simulados para demostración
function buscarGarantia() {
  // Base de datos simulada de garantías
  const data = [
    { factura: '001245', fecha: '2025-06-10', producto: 'Cambio de pantalla', dispositivo: 'Laptop HP' },
    { factura: '001246', fecha: '2025-06-15', producto: 'Mantenimiento general', dispositivo: 'PC de escritorio' },
    { factura: '001247', fecha: '2025-06-20', producto: 'Venta de cargador', dispositivo: 'Laptop Lenovo' }
  ];
  
  const input = document.getElementById('factura').value.trim();
  const resultado = data.find(d => d.factura === input);
  const tabla = document.getElementById('garantia-body');
  const contenedor = document.getElementById('resultado-garantia');
  
  if (resultado) {
    tabla.innerHTML = `<tr><td>${resultado.factura}</td><td>${resultado.fecha}</td><td>${resultado.producto}</td><td>${resultado.dispositivo}</td></tr>`;
    contenedor.style.display = 'block';
  } else {
    tabla.innerHTML = '<tr><td colspan="4">No se encontró información para ese número de factura.</td></tr>';
    contenedor.style.display = 'block';
  }
}

/* CARRITO DE COMPRAS - FUNCIONALIDADES */
document.addEventListener('DOMContentLoaded', function() {
  // Array para almacenar los productos del carrito
  const carrito = [];
  const compraItems = document.querySelectorAll('.compra-item');
  const carritoResumen = document.getElementById('carrito-resumen');

  // Crear el resumen visual del carrito si no existe
  if (carritoResumen && !document.getElementById('carrito-lista')) {
    const ul = document.createElement('ul');
    ul.id = 'carrito-lista';
    carritoResumen.appendChild(ul);
    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrito-total';
    totalDiv.innerHTML = 'Total: <span id="carrito-total">$0.00</span>';
    carritoResumen.appendChild(totalDiv);
  }

  // Función para actualizar la visualización del carrito
  function actualizarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    if (!carritoLista || !carritoTotal || !carritoResumen) return;
    
    carritoLista.innerHTML = '';
    let total = 0;
    
    carrito.forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)} <button class='eliminar-item' data-idx='${idx}' title='Eliminar' style='margin-left:10px;color:#fff;background:#d32f2f;border:none;border-radius:50%;width:28px;height:28px;font-size:1.1rem;font-weight:bold;cursor:pointer;'>✕</button>`;
      carritoLista.appendChild(li);
      total += item.precio * item.cantidad;
    });
    
    carritoTotal.textContent = `$${total.toFixed(2)}`;
    carritoResumen.style.display = carrito.length ? 'block' : 'none';
    
    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.eliminar-item').forEach(btn => {
      btn.addEventListener('click', function() {
        const idx = parseInt(this.getAttribute('data-idx'));
        carrito.splice(idx, 1);
        actualizarCarrito();
      });
    });
  }

  // Agregar funcionalidad a cada producto
  compraItems.forEach(item => {
    const btn = item.querySelector('.btn-carrito');
    const input = item.querySelector('.compra-cantidad');
    const nombre = item.querySelector('.compra-nombre').textContent;
    const precio = parseFloat(item.querySelector('.compra-precio').textContent.replace('$',''));
    const stock = parseInt(item.getAttribute('data-stock'));

    btn && btn.addEventListener('click', function() {
      const cantidad = parseInt(input.value);
      if (isNaN(cantidad) || cantidad < 1 || cantidad > stock) return;
      // Buscar si ya está en el carrito
      const existente = carrito.find(p => p.nombre === nombre);
      if (existente) {
        if (existente.cantidad + cantidad > stock) {
          existente.cantidad = stock;
        } else {
          existente.cantidad += cantidad;
        }
      } else {
        // Si no existe, agregar nuevo producto
        carrito.push({ nombre, precio, cantidad });
      }
      actualizarCarrito();
    });
  });

  // Inicialmente ocultar el carrito
  if (carritoResumen) carritoResumen.style.display = 'none';
});

/* FUNCIONES AUXILIARES Y UTILIDADES */

// Función para formatear precios
function formatearPrecio(precio) {
  return `$${precio.toFixed(2)}`;
}

// Función para validar formularios
function validarFormulario(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let esValido = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      esValido = false;
      input.style.borderColor = '#d32f2f';
    } else {
      input.style.borderColor = '#b0bec5';
    }
  });
  
  return esValido;
}