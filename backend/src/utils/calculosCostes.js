class CalculosCostes {
  static calcularCosteTotalLogistico(costes) {
    return {
      compras: costes.compras || 0,
      almacenamiento: costes.almacenamiento || 0,
      transporte: costes.transporte || 0,
      distribucion: costes.distribucion || 0,
      gastos_administrativos: costes.gastos_administrativos || 0,
      total: (costes.compras || 0) + 
             (costes.almacenamiento || 0) + 
             (costes.transporte || 0) + 
             (costes.distribucion || 0) + 
             (costes.gastos_administrativos || 0)
    };
  }

  static calcularCostePorUnidad(costeTotal, cantidadUnidades) {
    if (cantidadUnidades === 0) return 0;
    return costeTotal / cantidadUnidades;
  }

  static calcularCostePorKilometro(costeTotalTransporte, kilometrosRecorridos) {
    if (kilometrosRecorridos === 0) return 0;
    return costeTotalTransporte / kilometrosRecorridos;
  }

  static calcularCostePorHora(costeTotalAlmacenamiento, horasAlmacenamiento) {
    if (horasAlmacenamiento === 0) return 0;
    return costeTotalAlmacenamiento / horasAlmacenamiento;
  }

  static calcularRentabilidadLogistica(ingresoTotal, costeTotal) {
    if (ingresoTotal === 0) return 0;
    const margen = ingresoTotal - costeTotal;
    return (margen / ingresoTotal) * 100;
  }

  static verificarSobrecoste(montoReal, montoEsperado, umbralPorcentaje) {
    const diferencia = montoReal - montoEsperado;
    const porcentajeDiferencia = (diferencia / montoEsperado) * 100;
    return {
      esSobrecoste: porcentajeDiferencia > umbralPorcentaje,
      diferencia,
      porcentajeDiferencia
    };
  }

  static calcularCosteEstimadoTransporte(kilometros, costePorKm) {
    return kilometros * costePorKm;
  }

  static calcularCosteEstimadoAlmacenamiento(horas, costePorHora) {
    return horas * costePorHora;
  }
}

module.exports = CalculosCostes;
