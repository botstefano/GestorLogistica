const jsPDF = require('jspdf');
const XLSX = require('xlsx');

class GeneradorReportes {
  static generarPDF(datos, titulo, columnas) {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(titulo, 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleString()}`, 14, 30);
    
    let y = 40;
    const colWidth = 180 / columnas.length;
    
    doc.setFontSize(8);
    columnas.forEach((col, index) => {
      doc.text(col.header, 14 + (index * colWidth), y);
    });
    
    y += 7;
    doc.line(14, y - 2, 194, y - 2);
    
    datos.forEach(fila => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      
      columnas.forEach((col, index) => {
        const valor = fila[col.key] || '';
        doc.text(String(valor).substring(0, 25), 14 + (index * colWidth), y);
      });
      
      y += 7;
    });
    
    return doc;
  }

  static generarExcel(datos, nombreHoja) {
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);
    return workbook;
  }

  static generarReporteCostes(costes) {
    const datos = [
      { Categoria: 'Compras', Monto: costes.compras || 0 },
      { Categoria: 'Almacenamiento', Monto: costes.almacenamiento || 0 },
      { Categoria: 'Transporte', Monto: costes.transporte || 0 },
      { Categoria: 'Distribución', Monto: costes.distribucion || 0 },
      { Categoria: 'Gastos Administrativos', Monto: costes.gastos_administrativos || 0 },
      { Categoria: 'TOTAL', Monto: costes.total || 0 }
    ];
    
    return datos;
  }

  static generarReporteInventario(inventario) {
    return inventario.map(item => ({
      Producto: item.producto_nombre || item.nombre,
      Almacén: item.almacen_nombre,
      Cantidad: item.cantidad,
      Ubicación: item.ubicacion_estanteria,
      'Última Actualización': new Date(item.ultima_actualizacion).toLocaleString()
    }));
  }

  static generarReporteTransporte(costesTransporte) {
    return costesTransporte.map(item => ({
      Fecha: item.fecha,
      Vehículo: item.placa,
      'Ruta Origen': item.ruta_origen,
      'Ruta Destino': item.ruta_destino,
      Kilómetros: item.kilometros_recorridos,
      'Coste Combustible': item.coste_combustible,
      'Coste Peajes': item.coste_peajes,
      'Coste Mantenimiento': item.coste_mantenimiento,
      'Coste Conductor': item.coste_conductor,
      'Total': item.coste_combustible + item.coste_peajes + item.coste_mantenimiento + item.coste_conductor
    }));
  }

  static generarReporteOrdenesCompra(ordenes) {
    return ordenes.map(orden => ({
      ID: orden.id,
      Proveedor: orden.proveedor_nombre,
      'Fecha Emisión': new Date(orden.fecha_emision).toLocaleDateString(),
      'Fecha Entrega Esperada': orden.fecha_entrega_esperada,
      Total: orden.total,
      Estado: orden.estado,
      'Usuario Registró': orden.usuario_registra_nombre
    }));
  }

  static generarReporteAlertas(alertas) {
    return alertas.map(alerta => ({
      Fecha: new Date(alerta.fecha).toLocaleString(),
      Tipo: alerta.tipo,
      'Monto Esperado': alerta.monto_esperado,
      'Monto Real': alerta.monto_real,
      Diferencia: alerta.diferencia,
      Estado: alerta.estado,
      'Referencia': alerta.operacion_referencia
    }));
  }
}

module.exports = GeneradorReportes;
