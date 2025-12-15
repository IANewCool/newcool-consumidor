'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SERNAC por region
const OFICINAS = [
  { id: 1, nombre: 'SERNAC Arica y Parinacota', region: 'Arica y Parinacota', direccion: 'Patricio Lynch 244', telefono: '58 2231100', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 2, nombre: 'SERNAC Tarapaca', region: 'Tarapaca', direccion: 'Serrano 145, Of. 501', telefono: '57 2411500', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 3, nombre: 'SERNAC Antofagasta', region: 'Antofagasta', direccion: 'Prat 461, Piso 2', telefono: '55 2268600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 4, nombre: 'SERNAC Atacama', region: 'Atacama', direccion: 'Copiapo 525', telefono: '52 2212800', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 5, nombre: 'SERNAC Coquimbo', region: 'Coquimbo', direccion: 'Cordovez 281', telefono: '51 2311600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 6, nombre: 'SERNAC Valparaiso', region: 'Valparaiso', direccion: 'Blanco 1465', telefono: '32 2507600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 7, nombre: 'SERNAC Metropolitana', region: 'Metropolitana', direccion: 'Teatinos 50, Piso 1', telefono: '2 2594 6000', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 8, nombre: 'SERNAC OHiggins', region: 'OHiggins', direccion: 'Campos 423', telefono: '72 2231100', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 9, nombre: 'SERNAC Maule', region: 'Maule', direccion: '1 Sur 898', telefono: '71 2515600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 10, nombre: 'SERNAC Nuble', region: 'Nuble', direccion: 'Constitucion 550', telefono: '42 2433100', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 11, nombre: 'SERNAC Biobio', region: 'Biobio', direccion: 'Barros Arana 541', telefono: '41 2861600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 12, nombre: 'SERNAC Araucania', region: 'Araucania', direccion: 'Claro Solar 873', telefono: '45 2747600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 13, nombre: 'SERNAC Los Rios', region: 'Los Rios', direccion: 'Picarte 322', telefono: '63 2221600', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 14, nombre: 'SERNAC Los Lagos', region: 'Los Lagos', direccion: 'Urmeneta 509', telefono: '65 2483100', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 15, nombre: 'SERNAC Aysen', region: 'Aysen', direccion: 'Moraleda 233', telefono: '67 2233100', horario: 'Lunes a Viernes 09:00-14:00' },
  { id: 16, nombre: 'SERNAC Magallanes', region: 'Magallanes', direccion: 'Bories 901', telefono: '61 2241700', horario: 'Lunes a Viernes 09:00-14:00' }
];

// Tipos de reclamos
const TIPOS_RECLAMOS = [
  { categoria: 'Retail y comercio', icono: '🛒', ejemplos: ['Productos defectuosos', 'Publicidad engañosa', 'Negativa de cambio', 'Cobros indebidos'], plazo: '6 meses' },
  { categoria: 'Servicios basicos', icono: '💡', ejemplos: ['Cobros excesivos', 'Cortes injustificados', 'Mala calidad servicio', 'Facturacion erronea'], plazo: '6 meses' },
  { categoria: 'Telecomunicaciones', icono: '📱', ejemplos: ['Internet lento', 'Cobros no autorizados', 'Portabilidad', 'Cancelacion de servicio'], plazo: '6 meses' },
  { categoria: 'Financieros', icono: '🏦', ejemplos: ['Comisiones abusivas', 'Creditos no solicitados', 'Seguros no contratados', 'Cobranzas extrajudiciales'], plazo: '6 meses' },
  { categoria: 'Transporte', icono: '✈️', ejemplos: ['Vuelos cancelados', 'Equipaje perdido', 'Retrasos', 'Overbooking'], plazo: '6 meses' },
  { categoria: 'Inmobiliario', icono: '🏠', ejemplos: ['Vicios ocultos', 'Retrasos entrega', 'Incumplimiento contrato', 'Defectos construccion'], plazo: '5 años' }
];

// Derechos del consumidor
const DERECHOS = [
  { derecho: 'Informacion veraz', descripcion: 'Conocer precio, caracteristicas y condiciones antes de comprar', icono: '📋' },
  { derecho: 'Libre eleccion', descripcion: 'Elegir libremente entre productos y servicios', icono: '✅' },
  { derecho: 'Seguridad', descripcion: 'Productos que no pongan en riesgo tu salud o seguridad', icono: '🛡️' },
  { derecho: 'No discriminacion', descripcion: 'Ser tratado con respeto sin discriminacion arbitraria', icono: '⚖️' },
  { derecho: 'Retracto', descripcion: '10 dias para arrepentirse en compras a distancia', icono: '↩️' },
  { derecho: 'Garantia legal', descripcion: '3 meses para productos nuevos, 6 meses para servicios', icono: '🔧' },
  { derecho: 'Reparacion', descripcion: 'Indemnizacion por daños causados por productos defectuosos', icono: '💰' },
  { derecho: 'Educacion', descripcion: 'Ser informado sobre tus derechos como consumidor', icono: '📚' }
];

// Garantias legales
const GARANTIAS = [
  { tipo: 'Productos nuevos', plazo: '3 meses', opciones: 'Reparacion, cambio o devolucion', desde: 'Fecha de compra' },
  { tipo: 'Productos usados', plazo: 'Variable', opciones: 'Segun acuerdo con vendedor', desde: 'Fecha de compra' },
  { tipo: 'Servicios', plazo: '6 meses', opciones: 'Repeticion servicio o devolucion', desde: 'Prestacion servicio' },
  { tipo: 'Viviendas nuevas', plazo: '5 años', opciones: 'Reparacion de vicios', desde: 'Recepcion municipal' },
  { tipo: 'Compras online', plazo: '10 dias retracto', opciones: 'Devolucion sin expresion de causa', desde: 'Recepcion producto' }
];

// Proceso de reclamo
const PROCESO_RECLAMO = [
  { paso: 1, titulo: 'Reclama al proveedor', descripcion: 'Primero intenta resolver directamente con la empresa', tiempo: '7-15 dias' },
  { paso: 2, titulo: 'Reune pruebas', descripcion: 'Boletas, contratos, correos, fotos del problema', tiempo: 'Inmediato' },
  { paso: 3, titulo: 'Reclamo SERNAC', descripcion: 'www.sernac.cl o presencial si no hay solucion', tiempo: '25 dias habiles' },
  { paso: 4, titulo: 'Mediacion', descripcion: 'SERNAC media entre consumidor y empresa', tiempo: 'Variable' },
  { paso: 5, titulo: 'Juzgado Policia Local', descripcion: 'Demanda si no hay acuerdo', tiempo: '6 meses max' }
];

// Glosario
const GLOSARIO = [
  { termino: 'Garantia legal', definicion: 'Proteccion minima que establece la ley para productos y servicios defectuosos' },
  { termino: 'Derecho a retracto', definicion: '10 dias para devolver producto en compras a distancia sin dar explicaciones' },
  { termino: 'Clausula abusiva', definicion: 'Condicion contractual que genera desequilibrio en perjuicio del consumidor' },
  { termino: 'Publicidad engañosa', definicion: 'Informacion falsa o que induce a error sobre un producto o servicio' },
  { termino: 'Venta atada', definicion: 'Obligar a comprar un producto para acceder a otro (prohibido)' },
  { termino: 'Triple opcion', definicion: 'Derecho a elegir entre reparacion, cambio o devolucion del dinero' },
  { termino: 'SERNAC Financiero', definicion: 'Proteccion especial para productos y servicios financieros' },
  { termino: 'Cobranza extrajudicial', definicion: 'Gestion de cobro fuera de tribunales, con regulacion especifica' },
  { termino: 'Consumidor vulnerable', definicion: 'Adultos mayores, personas con discapacidad que requieren proteccion especial' },
  { termino: 'Demanda colectiva', definicion: 'Accion judicial que representa a multiples consumidores afectados' },
  { termino: 'Letra chica', definicion: 'Condiciones poco visibles que limitan derechos (reguladas por ley)' },
  { termino: 'Precio exhibido', definicion: 'El precio mostrado es el que debe cobrarse, incluidos impuestos' }
];

export default function ConsumidorModule() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora de garantia
  const [fechaCompra, setFechaCompra] = useState('');
  const [tipoProducto, setTipoProducto] = useState('3');

  const oficinasFiltradas = OFICINAS.filter(o =>
    o.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    o.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const calcularGarantia = () => {
    if (!fechaCompra) return null;

    const fecha = new Date(fechaCompra);
    const meses = parseInt(tipoProducto);
    const fechaVencimiento = new Date(fecha);
    fechaVencimiento.setMonth(fechaVencimiento.getMonth() + meses);

    const hoy = new Date();
    const diasRestantes = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));

    return {
      fechaVencimiento,
      diasRestantes,
      vencida: diasRestantes <= 0
    };
  };

  const garantia = calcularGarantia();

  const secciones = [
    { id: 'buscador', nombre: 'Oficinas', icono: '🔍' },
    { id: 'derechos', nombre: 'Derechos', icono: '⚖️' },
    { id: 'reclamos', nombre: 'Reclamos', icono: '📝' },
    { id: 'calculadora', nombre: 'Garantia', icono: '🧮' },
    { id: 'proceso', nombre: 'Proceso', icono: '📋' },
    { id: 'glosario', nombre: 'Glosario', icono: '📖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">🛒</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Consumidor - NewCooltura Informada
            </h1>
            <p className="text-purple-100">
              Oficinas SERNAC, derechos del consumidor, reclamos y calculadora de garantia
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="sticky top-0 z-40 bg-slate-800/90 backdrop-blur border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3">
            {secciones.map((seccion) => (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === seccion.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{seccion.icono}</span>
                <span className="text-sm font-medium">{seccion.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Oficinas */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Oficinas SERNAC
              </h2>
              <input
                type="text"
                placeholder="Buscar por region o ciudad..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-sm text-gray-400 mt-2">
                {oficinasFiltradas.length} oficinas encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {oficinasFiltradas.map((oficina, i) => (
                <motion.div
                  key={oficina.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-purple-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{oficina.nombre}</h3>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                      {oficina.region}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gray-500">📍</span> {oficina.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">📞</span> {oficina.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">🕐</span> {oficina.horario}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">📱 Canales de Atencion</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>Web:</strong> www.sernac.cl - Reclamos online 24/7</li>
                <li>• <strong>Telefono:</strong> 800 700 100 (gratuito)</li>
                <li>• <strong>App:</strong> SERNAC Movil (iOS y Android)</li>
                <li>• <strong>Redes:</strong> @sabordejapon en Twitter/X</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Derechos del Consumidor */}
        {seccionActiva === 'derechos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚖️</span> Derechos del Consumidor
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DERECHOS.map((derecho, i) => (
                <motion.div
                  key={derecho.derecho}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center"
                >
                  <span className="text-3xl mb-3 block">{derecho.icono}</span>
                  <h3 className="font-bold text-white mb-2">{derecho.derecho}</h3>
                  <p className="text-sm text-gray-400">{derecho.descripcion}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold text-white mb-4">📋 Garantias Legales</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-2 text-gray-400">Tipo</th>
                      <th className="text-left py-3 px-2 text-gray-400">Plazo</th>
                      <th className="text-left py-3 px-2 text-gray-400">Opciones</th>
                      <th className="text-left py-3 px-2 text-gray-400">Desde</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GARANTIAS.map((g, i) => (
                      <tr key={i} className="border-b border-slate-700/50">
                        <td className="py-3 px-2 text-white">{g.tipo}</td>
                        <td className="py-3 px-2 text-purple-400 font-medium">{g.plazo}</td>
                        <td className="py-3 px-2 text-gray-400">{g.opciones}</td>
                        <td className="py-3 px-2 text-gray-500">{g.desde}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        )}

        {/* Tipos de Reclamos */}
        {seccionActiva === 'reclamos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📝</span> Tipos de Reclamos
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIPOS_RECLAMOS.map((tipo, i) => (
                <motion.div
                  key={tipo.categoria}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{tipo.icono}</span>
                    <div>
                      <h3 className="font-bold text-white">{tipo.categoria}</h3>
                      <span className="text-xs text-purple-400">Plazo: {tipo.plazo}</span>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {tipo.ejemplos.map((ejemplo, j) => (
                      <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="text-purple-400">•</span> {ejemplo}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">⚠️ Antes de Reclamar</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Guarda SIEMPRE la boleta o factura de compra</li>
                <li>• Toma fotos o videos del problema</li>
                <li>• Conserva correos, chats y conversaciones</li>
                <li>• Intenta primero resolver con el proveedor</li>
                <li>• Anota nombres de ejecutivos con quien hablaste</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Calculadora de Garantia */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Garantia Legal
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Datos de la Compra</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Fecha de compra</label>
                    <input
                      type="date"
                      value={fechaCompra}
                      onChange={(e) => setFechaCompra(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tipo de producto/servicio</label>
                    <select
                      value={tipoProducto}
                      onChange={(e) => setTipoProducto(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="3">Producto nuevo (3 meses)</option>
                      <option value="6">Servicio (6 meses)</option>
                      <option value="60">Vivienda nueva (5 años)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Resultado</h3>

                {garantia ? (
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Fecha de compra</span>
                      <span className="text-white">{new Date(fechaCompra).toLocaleDateString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Garantia</span>
                      <span className="text-white">{tipoProducto} meses</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700">
                      <span className="text-gray-400">Vence el</span>
                      <span className="text-white">{garantia.fechaVencimiento.toLocaleDateString('es-CL')}</span>
                    </div>

                    <div className={`flex justify-between py-3 rounded-lg px-3 mt-4 ${
                      garantia.vencida
                        ? 'bg-red-500/20'
                        : garantia.diasRestantes < 30
                        ? 'bg-yellow-500/20'
                        : 'bg-green-500/20'
                    }`}>
                      <span className="text-white font-bold">Estado</span>
                      <span className={`font-bold ${
                        garantia.vencida
                          ? 'text-red-400'
                          : garantia.diasRestantes < 30
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}>
                        {garantia.vencida
                          ? 'Garantia vencida'
                          : `${garantia.diasRestantes} dias restantes`}
                      </span>
                    </div>

                    {!garantia.vencida && (
                      <div className="bg-purple-500/10 rounded-lg p-3 mt-4">
                        <p className="text-sm text-purple-300">
                          <strong>Triple opcion:</strong> Puedes exigir reparacion, cambio del producto o devolucion del dinero.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    Ingresa la fecha de compra para calcular
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-4">
                  * Garantia legal minima. Fabricante puede ofrecer garantia mayor.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Proceso de Reclamo */}
        {seccionActiva === 'proceso' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📋</span> Proceso de Reclamo
            </h2>

            <div className="space-y-4">
              {PROCESO_RECLAMO.map((paso, i) => (
                <motion.div
                  key={paso.paso}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-full bg-purple-500 text-white font-bold flex items-center justify-center flex-shrink-0">
                    {paso.paso}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-white">{paso.titulo}</h3>
                      <span className="text-xs text-purple-400">{paso.tiempo}</span>
                    </div>
                    <p className="text-sm text-gray-400">{paso.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">📞 Contactos Utiles</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">•</span>
                    <div>
                      <span className="text-white font-medium">SERNAC</span>
                      <p className="text-gray-400">800 700 100 (gratuito)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">•</span>
                    <div>
                      <span className="text-white font-medium">CMF (financiero)</span>
                      <p className="text-gray-400">800 200 100</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">•</span>
                    <div>
                      <span className="text-white font-medium">SUBTEL (telecom)</span>
                      <p className="text-gray-400">800 228 883</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">🚨 Que NO Pueden Hacerte</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Negarse a recibir un reclamo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Exigir boleta para garantia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Cobrar por servicio tecnico en garantia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Derivar al fabricante (el vendedor responde)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Limitar tu derecho a retracto
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario del Consumidor
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-purple-400 mb-1">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Consumidor - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-purple-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Conoce y ejerce tus derechos como consumidor
          </p>
        </div>
      </footer>
    </div>
  );
}
