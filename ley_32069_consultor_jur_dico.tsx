import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, BookOpen, Bot, Bookmark, Sparkles, Scale, FileText, 
  ChevronRight, Filter, Copy, Check, Info, ArrowLeftRight, 
  Sun, Moon, Volume2, Share2, HelpCircle, AlertTriangle, ExternalLink,
  Tag, Download, Edit3, Trash2, Zap, Layers, Award, ShieldAlert,
  Send, RefreshCw, MessageSquare
} from 'lucide-react';

// ==========================================
// DATASET: LEY N° 32069 & REGLAMENTO (PERÚ)
// ==========================================
const CATEGORIES = [
  { id: 'all', name: 'Todos los Temas' },
  { id: 'principios', name: 'Principios & Ámbito' },
  { id: 'planificacion', name: 'Planificación & Actos Prep.' },
  { id: 'impedimentos', name: 'Impedimentos para Contratar' },
  { id: 'metodos', name: 'Métodos de Selección' },
  { id: 'ejecucion', name: 'Ejecución Contractual' },
  { id: 'controversias', name: 'Solución de Controversias & JRD' },
  { id: 'sanciones', name: 'Régimen Sancionador & Tribunal' },
  { id: 'digital', name: 'Plataforma Digital & Compras Ecoeficientes' }
];

const ARTICLES_DATA = [
  {
    id: 'ley-art-1',
    type: 'ley',
    num: 1,
    title: 'Objeto de la Ley',
    category: 'principios',
    chapter: 'TÍTULO I: DISPOSICIONES GENERALES',
    summary: 'Establece el marco normativo para maximizar el valor de los recursos públicos y promover la eficacia, transparencia e innovación.',
    fullContent: `Artículo 1. Objeto de la Ley
La presente Ley tiene por objeto establecer el marco normativo orientado a maximizar el valor de los recursos públicos que se destinan a las contrataciones de bienes, servicios y obras por parte de las entidades del sector público. 

Asimismo, busca promover la eficiencia, la eficacia, la transparencia, la integridad, la competencia y la sostenibilidad ambiental y social en el uso de los fondos públicos, fomentando la compra pública de innovación y el desarrollo socioeconómico del país.`,
    concordance: 'Reglamento - Artículo 2 (Finalidad)',
    keyTakeaway: 'Prioriza el concepto de "Valor por Dinero" y compra pública de innovación por encima del simple criterio del menor precio.',
    tags: ['Objeto', 'Finalidad', 'Valor por dinero', 'Innovación']
  },
  {
    id: 'ley-art-2',
    type: 'ley',
    num: 2,
    title: 'Principios de la Contratación Pública',
    category: 'principios',
    chapter: 'TÍTULO I: DISPOSICIONES GENERALES',
    summary: 'Principios rectores: Libertad de concurrencia, Igualdad de trato, Transparencia, Publicidad, Competencia, Eficacia y Eficiencia, Valor por Dinero, Integridad y Sostenibilidad.',
    fullContent: `Artículo 2. Principios que rigen las contrataciones
Las contrataciones públicas se desarrollan con sujeción a los siguientes principios rectores:

a) Libertad de concurrencia: Las entidades promueven el acceso libre y sin barreras injustificadas de proveedores.
b) Igualdad de trato: Todos los proveedores disponen de las mismas oportunidades para formular sus ofertas.
c) Transparencia y Publicidad: Toda contratación se presume pública, salvo excepciones expresamente taxativas de confidencialidad o seguridad nacional.
d) Competencia: Los procesos se orientan a la obtención de la propuesta técnica y económica más ventajosa.
e) Eficacia y Eficiencia: Prevalece el cumplimiento de las metas e intereses públicos sobre formalismos no sustanciales.
f) Valor por dinero: Maximizar el beneficio neto de la compra en términos de costo, calidad y oportunidad integral durante el ciclo de vida del bien u obra.
g) Integridad: La conducta de los partícipes se rige por la honestidad, veracidad y combate a la corrupción.
h) Sostenibilidad ambiental y social: Inclusión de criterios éticos, ecológicos y socioeconómicos en las compras estatales.`,
    concordance: 'Reglamento - Artículo 4 al 8 (Criterios de Aplicación de Principios)',
    keyTakeaway: 'Servirán como criterio interpretativo para resolver vacíos de la ley y guiar las decisiones del funcionario.',
    tags: ['Principios', 'Integridad', 'Valor por Dinero', 'Transparencia']
  },
  {
    id: 'ley-art-17',
    type: 'ley',
    num: 17,
    title: 'Impedimentos para contratar con el Estado',
    category: 'impedimentos',
    chapter: 'TÍTULO II: SUJETOS DE LA CONTRATACIÓN',
    summary: 'Quiénes no pueden ser participantes, postores, contratistas ni subcontratistas en las contrataciones públicas.',
    fullContent: `Artículo 17. Impedimentos
Cualquiera sea el régimen legal de contratación, están impedidos de ser participantes, postores, contratistas y/o subcontratistas:

a) El Presidente y Vicepresidentes de la República, Congresistas, Ministros y Viceministros en todo el territorio nacional durante el ejercicio del cargo y hasta doce (12) meses después de haber dejado el cargo.
b) Los Gobernadores Regionales, Consejeros Regionales, Alcaldes y Regidores en su ámbito territorial y hasta doce (12) meses después.
c) Los funcionarios públicos, empleados de confianza y servidores públicos con poder de decisión o que tengan intervención en el proceso de contratación.
d) Las personas naturales o jurídicas sancionadas con inhabilitación temporal o definitiva por el Tribunal de Contrataciones.
e) Las personas condenadas con sentencia firme o que hayan admitido la comisión de delitos de corrupción, colusión, peculado, tráfico de influencias, lavado de activos o delitos conexos.
f) Los parientes hasta el segundo grado de consanguinidad o afinidad (cónyuge, conviviente, hijos, padres, hermanos) de las autoridades antes señaladas.`,
    concordance: 'Reglamento - Artículo 25 (Declaración Jurada y Verificación de Impedimentos)',
    keyTakeaway: 'Aplica a autoridades, sus parientes hasta 2do grado de consanguinidad/afinidad y sancionados o condenados por corrupción.',
    tags: ['Impedimentos', 'Conflicto de Interés', 'Inhabilitados', 'Parientes']
  },
  {
    id: 'ley-art-30',
    type: 'ley',
    num: 30,
    title: 'Métodos de Selección y Contratación Directa',
    category: 'metodos',
    chapter: 'TÍTULO III: PROCESO DE CONTRATACIÓN',
    summary: 'Determina los procedimientos competitivos y los supuestos excepcionales de contratación directa.',
    fullContent: `Artículo 30. Métodos de Selección
Las entidades efectúan sus contrataciones a través de los siguientes métodos competitivos y no competitivos:

1. Licitación Pública: Para la adquisición de bienes y ejecución de obras de gran envergadura.
2. Concurso Público: Para la contratación de servicios en general y consultorías.
3. Subasta Inversa Electrónica: Para bienes y servicios comunes que cuenten con ficha técnica homologada.
4. Selección de Consultores Individuales: Para consultorías especializadas que no requieren equipo multidisciplinario.
5. Contratación Directa (Excepcional): Procedimiento no competitivo regulado para casos de emergencia declarada, desabastecimiento inminente, proveedor único, secreto de Estado y contrataciones entre entidades públicas.`,
    concordance: 'Reglamento - Título IV (Reglas específicas por Método de Selección)',
    keyTakeaway: 'La Contratación Directa requiere informe técnico y legal sustentatorio obligatorio aprobado por la máxima autoridad.',
    tags: ['Métodos de Selección', 'Licitación', 'Subasta Inversa', 'Contratación Directa']
  },
  {
    id: 'ley-art-45',
    type: 'ley',
    num: 45,
    title: 'Adelantos, Penalidades y Modificaciones al Contrato',
    category: 'ejecucion',
    chapter: 'TÍTULO IV: EJECUCIÓN CONTRACTUAL',
    summary: 'Regula las condiciones para el pago de adelantos directos y de materiales, aplicación de penalidades por mora y adendas.',
    fullContent: `Artículo 45. Modificaciones Contractuales y Penalidades
1. El contrato puede ser modificado por variaciones en el plazo, adicionantes, reducciones o cesión de posición contractual por razones de interés público debidamente sustentadas.
2. El monto máximo de adiciones o adicionales no puede superar el 25% del monto del contrato original salvo excepciones en obras públicas con informe previo de Contraloría.
3. Se aplican penalidades por mora en la ejecución de la prestación, hasta por un monto máximo equivalente al 10% del monto contractual vigente.
4. Los adelantos directos y por materiales se otorgan contra la presentación de una garantía financiera o fideicomiso de administración.`,
    concordance: 'Reglamento - Artículo 140 al 165 (Cálculo de penalidades y gestión de adendas)',
    keyTakeaway: 'Penalidad máxima por mora: 10%. Adicionales máximos en servicios/bienes: 25%. Requieren garantía respaldatoria.',
    tags: ['Penalidades', 'Modificaciones', 'Adelantos', 'Adicionales']
  },
  {
    id: 'ley-art-60',
    type: 'ley',
    num: 60,
    title: 'Solución de Controversias y Junta de Resolución de Disputas (JRD)',
    category: 'controversias',
    chapter: 'TÍTULO V: SOLUCIÓN DE CONTROVERSIAS',
    summary: 'Mecanismos de conciliación, arbitraje y la obligatoriedad de las JRD en contratos de obra.',
    fullContent: `Artículo 60. Solución de Controversias durante la Ejecución Contractual
Las controversias que surjan entre las partes sobre la ejecución, interpretación, resolución, inexistencia, ineficacia o invalidez del contrato se resuelven mediante Conciliación, Junta de Resolución de Disputas o Arbitraje.

1. Junta de Resolución de Disputas (JRD): Es obligatoria en contratos de ejecución de obras cuyo monto sea superior al límite fijado en el Reglamento. Sus decisiones son de cumplimento inmediato para la Entidad y el Contratista.
2. Arbitraje: Es de derecho y se resuelve por árbitro único o tribunal arbitral institucional.
3. Conciliación: Se realiza ante un centro de conciliación acreditado por el Ministerio de Justicia.`,
    concordance: 'Reglamento - Capítulo VII (Funcionamiento y Reglas de la JRD y Arbitraje)',
    keyTakeaway: 'La JRD previene paralizaciones de obra emitiendo decisiones vinculantes e inmediatas en campo.',
    tags: ['Arbitraje', 'Conciliación', 'JRD', 'Obras Públicas', 'Controversias']
  },
  {
    id: 'ley-art-72',
    type: 'ley',
    num: 72,
    title: 'Tribunal de Contrataciones Públicas y Sanciones',
    category: 'sanciones',
    chapter: 'TÍTULO VI: RÉGIMEN SANCIONADOR',
    summary: 'Tipificación de infracciones administrativas, inhabilitación temporal/definitiva y multas.',
    fullContent: `Artículo 72. Infracciones y Sanciones Administrativas
El Tribunal de Contrataciones Públicas sanciona a los proveedores, participantes, postores y contratistas por:

a) Presentar documentación falsa o información inexacta.
b) Desistirse o no perfeccionar el contrato sin justificación.
c) Resolver el contrato por causal atribuible al contratista.
d) Contratar estando impedido.
e) Presentar propuestas en colusión o acuerdos anticompetitivos.

Sanciones aplicables:
1. Inhabilitación Temporal: De 3 a 36 meses.
2. Inhabilitación Definitiva: En caso de reincidencia o faltas gravísimas vinculadas a corrupción.
3. Multa Económica: No menor al 5% ni mayor al 15% de la propuesta o contrato.`,
    concordance: 'Reglamento - Artículo 210 al 235 (Procedimiento Administrativo Sancionador - PAS)',
    keyTakeaway: 'Documentos falsos conllevan inhabilitación temporal no menor a 36 meses e informe a Fiscalía de la Nación.',
    tags: ['Sanciones', 'Tribunal', 'Inhabilitación', 'Documentación Falsa']
  },

  // REGULATION ARTICLES
  {
    id: 'reg-art-25',
    type: 'reglamento',
    num: 25,
    title: 'Verificación Automatizada de Impedimentos',
    category: 'impedimentos',
    chapter: 'REGLAMENTO: TÍTULO II - SUJETOS DEL PROCESO',
    summary: 'Interconexión de bases de datos de JNE, RENIEC, SUNAT y Poder Judicial para detectar impedimentos.',
    fullContent: `Artículo 25 (Reglamento). Verificación y Declaración Jurada de Impedimentos
1. La Plataforma Digital de Contrataciones Públicas efectúa la validación técnica en tiempo real de los impedimentos señalados en el Artículo 17 de la Ley N° 32069.
2. La validación interactúa con las bases de datos de la RENIEC (vínculo de parentesco), JNE (autoridades electas), SUNAT, Registro de Sancionados y Poder Judicial (Registro de Condenados).
3. La omisión o falsedad en la Declaración Jurada digital conlleva la descalificación automática de la oferta y la notificación inmediata al Ministerio Público.`,
    concordance: 'Ley N° 32069 - Artículo 17 (Impedimentos)',
    keyTakeaway: 'El control de parentesco e inhabilitación ahora es cruzado automáticamente mediante la plataforma digital.',
    tags: ['Reglamento', 'RENIEC', 'Verificación', 'Plataforma Digital']
  },
  {
    id: 'reg-art-142',
    type: 'reglamento',
    num: 142,
    title: 'Fórmula para el Cálculo de Penalidad por Mora',
    category: 'ejecucion',
    chapter: 'REGLAMENTO: TÍTULO V - EJECUCIÓN CONTRACTUAL',
    summary: 'Fórmula matemática oficial para la aplicación de penalidades diarias por retraso injustificado.',
    fullContent: `Artículo 142 (Reglamento). Cálculo de Penalidad Diaria por Mora
En caso de retraso injustificado en la ejecución de la prestación, la Entidad aplica automáticamente una penalidad por cada día de atraso, calculada mediante la siguiente fórmula:

Penalidad Diaria = (0.10 x Monto vigente) / (F x Plazo en días)

Donde 'F' tiene los siguientes valores:
a) Para plazos menores o iguales a sesenta (60) días, para bienes, servicios y consultorías: F = 0.40.
b) Para plazos mayores a sesenta (60) días:
   - Bienes, servicios y consultorías: F = 0.25
   - Obras: F = 0.15

El monto máximo total acumulado por penalidad por mora no puede superar el diez por ciento (10%) del monto del contrato vigente.`,
    concordance: 'Ley N° 32069 - Artículo 45 (Penalidades)',
    keyTakeaway: 'El factor F varía según el tipo de objeto (obras vs bienes/servicios) y el plazo contractual.',
    tags: ['Reglamento', 'Fórmula Penalidad', 'Factor F', 'Mora Diaria']
  },
  {
    id: 'reg-art-180',
    type: 'reglamento',
    num: 180,
    title: 'Operatividad y Decisiones de la Junta de Resolución de Disputas (JRD)',
    category: 'controversias',
    chapter: 'REGLAMENTO: TÍTULO VII - SOLUCIÓN DE CONTROVERSIAS',
    summary: 'Composición, funciones consultivas y vinculatorias de la JRD en obras públicas.',
    fullContent: `Artículo 180 (Reglamento). Funcionamiento de la Junta de Resolución de Disputas
1. La JRD puede estar integrada por uno (1) o tres (3) miembros según el valor estimado de la obra.
2. Los miembros de la JRD deben realizar visitas periódicas obligatorias a la obra al menos una vez al mes.
3. Emiten dos tipos de pronunciamientos:
   - Recomendaciones: Respuestas a consultas preventivas de las partes.
   - Decisiones: Resoluciones vinculantes e inmediatamente ejecutables sobre controversias planteadas (ej. ampliaciones de plazo, valorizaciones).
4. El recurso de arbitraje contra una decisión de la JRD no suspende la obligación de su inmediato cumplimiento durante la ejecución del contrato.`,
    concordance: 'Ley N° 32069 - Artículo 60 (JRD y Arbitraje)',
    keyTakeaway: 'Las decisiones de la JRD se acatan de inmediato sin suspender la obra, aun si la Entidad va a arbitraje posterior.',
    tags: ['Reglamento', 'JRD', 'Obras', 'Decisiones Vinculantes']
  }
];

// PRESET AI PROMPTS
const AI_PRESET_PROMPTS = [
  "¿Cuáles son los principales impedimentos para contratar con el Estado según la Ley 32069?",
  "¿Cómo se calcula la penalidad por mora en bienes y obras?",
  "¿En qué casos es obligatoria la Junta de Resolución de Disputas (JRD)?",
  "¿Cuál es el límite para las adendas y adicionales de contratos de servicios?",
  "Explica el principio de 'Valor por Dinero' aplicado a una licitación pública."
];

// FLOWCHART / PROCESS PHASES
const PROCESS_PHASES = [
  {
    phase: '1. Actos Preparatorios',
    color: 'border-blue-500 bg-blue-50 text-blue-900',
    icon: FileText,
    steps: [
      'Requerimiento del área usuaria (TDR / Especificaciones Técnicas)',
      'Indagación de mercado y definición del Valor de la Contratación',
      'Inclusión en el Plan Anual de Contrataciones (PAC)',
      'Certificación del crédito presupuestario',
      'Elaboración y aprobación de las Bases de Selección'
    ]
  },
  {
    phase: '2. Fase de Selección',
    color: 'border-amber-500 bg-amber-50 text-amber-900',
    icon: Award,
    steps: [
      'Convocatoria pública en Plataforma Digital',
      'Registro de participantes y formulación de consultas/observaciones',
      'Absolución e integración de bases definitivas',
      'Presentación, evaluación y calificación de ofertas',
      'Otorgamiento de la Buena Pro y consentimiento del acuerdo'
    ]
  },
  {
    phase: '3. Ejecución Contractual',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    icon: Scale,
    steps: [
      'Perfeccionamiento del contrato (Garantías, suscripción)',
      'Entrega de adelantos directos/materiales (con fideicomiso o fianza)',
      'Supervisión y control de prestaciones / aplicación de penalidades',
      'Conformidad de bienes/servicios o Recepción de Obra',
      'Pago final y liquidación contractual / Solución de controversias'
    ]
  }
];

export default function Ley32069App() {
  // State management
  const [activeTab, setActiveTab] = useState('explorer'); // explorer, ai, saved, compare, guide
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [docFilter, setDocFilter] = useState('all'); // all, ley, reglamento
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES_DATA[0]);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ley32069_bookmarks');
      return saved ? JSON.parse(saved) : ['ley-art-17', 'ley-art-60'];
    } catch {
      return ['ley-art-17', 'ley-art-60'];
    }
  });
  const [articleNotes, setArticleNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('ley32069_notes');
      return saved ? JSON.parse(saved) : { 'ley-art-17': 'Revisar parientes del nuevo alcalde.' };
    } catch {
      return {};
    }
  });

  // Reading preferences
  const [fontSize, setFontSize] = useState('text-base'); // text-sm, text-base, text-lg
  const [copiedId, setCopiedId] = useState(null);

  // Compare Tab states
  const [compareLeyNum, setCompareLeyNum] = useState(17);

  // AI Assistant states
  const [aiMessages, setAiMessages] = useState([
    {
      sender: 'ai',
      text: '¡Hola! Soy tu **Asistente Jurídico Inteligente experto en la Ley N.° 32069 (Ley General de Contrataciones Públicas del Perú)** y su Reglamento.\n\n¿En qué consulta normativa o análisis de caso te puedo orientar hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [apiKey, setApiKey] = useState(''); // Empty string uses system provided key automatically in runtime

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ley32069_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ley32069_notes', JSON.stringify(articleNotes));
    } catch (e) {
      console.error(e);
    }
  }, [articleNotes]);

  // Filtered Articles for Explorer
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesDoc = docFilter === 'all' || art.type === docFilter;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        art.title.toLowerCase().includes(query) ||
        art.fullContent.toLowerCase().includes(query) ||
        art.num.toString().includes(query) ||
        art.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesDoc && matchesSearch;
    });
  }, [searchTerm, selectedCategory, docFilter]);

  // Bookmark Toggle Handler
  const toggleBookmark = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Copy Content Handler
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Note change handler
  const handleNoteChange = (id, noteText) => {
    setArticleNotes((prev) => ({
      ...prev,
      [id]: noteText
    }));
  };

  // Gemini AI Query Processor
  const handleSendAiMessage = async (promptToSend) => {
    const textPrompt = promptToSend || userQuery;
    if (!textPrompt.trim() || isAiLoading) return;

    const newMessages = [
      ...aiMessages,
      {
        sender: 'user',
        text: textPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    setAiMessages(newMessages);
    if (!promptToSend) setUserQuery('');
    setIsAiLoading(true);

    // Prepare prompt with legal system context
    const systemInstructionText = `
Eres un abogado consultor especialista de alto nivel en Derecho Administrativo y Contrataciones Públicas del Perú.
Tu especialidad central es la nueva Ley N° 32069 (Ley General de Contrataciones Públicas) y su Reglamento.
Proporciona respuestas claras, estructuradas, didácticas y bien fundamentadas jurídicamente. 
Cita explícitamente el número de los artículos aplicables de la Ley 32069 y del Reglamento. 
Usa viñetas o negritas para los puntos clave y añade un resumen ejecutivo al inicio de respuestas extensas.
`;

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstructionText}\n\nConsulta del usuario: ${textPrompt}` }]
          }
        ]
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];
      const aiReplyText = candidate?.content?.parts?.[0]?.text || "No se pudo obtener una respuesta jurídica detallada en este momento.";

      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error('AI Error:', error);
      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `⚠️ **Error en la consulta:** No se pudo conectar con el servicio de Inteligencia Artificial (${error.message}). Revisa tu conexión a internet o intenta nuevamente.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* HEADER INSTITUCIONAL */}
      <header className="bg-slate-900 text-white border-b border-amber-500/30 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center text-slate-950 font-black shadow-lg ring-2 ring-amber-400/30">
                <Scale className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white">
                    LEY N.° 32069
                  </h1>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Perú
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Plataforma Digital de Consulta Jurisprudencial y Asistente IA de Contrataciones Públicas
                </p>
              </div>
            </div>

            {/* Quick Stats / Legal Badge */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Normativa Vigente 2026</span>
              </div>
              
              <button
                onClick={() => setActiveTab('ai')}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all shadow-md hover:shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Consultar IA</span>
              </button>
            </div>
          </div>

          {/* MAIN NAVIGATION TABS */}
          <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-800 overflow-x-auto py-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'explorer'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Explorador Normativo
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'compare'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              Comparador Ley vs Reglamento
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'ai'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-400" />
              Asistente IA Jurídico
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'saved'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              Guardados
              {bookmarks.length > 0 && (
                <span className="ml-1 bg-amber-500 text-slate-950 font-bold rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === 'guide'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Guía de Fases & Procesos
            </button>
          </nav>
        </div>
      </header>

      {/* BODY CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

        {/* TAB 1: NORMATIVE EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: FILTERS AND ARTICLE LIST */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* SEARCH BAR */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por artículo, palabra clave (ej: Mora, JRD)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* FILTERS: TYPE & CATEGORIES */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-100 text-xs font-medium">
                    <button
                      onClick={() => setDocFilter('all')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        docFilter === 'all' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setDocFilter('ley')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        docFilter === 'ley' ? 'bg-slate-900 text-amber-400 font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Ley 32069
                    </button>
                    <button
                      onClick={() => setDocFilter('reglamento')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        docFilter === 'reglamento' ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Reglamento
                    </button>
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    {filteredArticles.length} resultados
                  </span>
                </div>

                {/* CATEGORIES PILLS */}
                <div className="flex gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* ARTICLE LIST CARDS */}
              <div className="space-y-3 max-h-[calc(100vh-340px)] overflow-y-auto pr-1">
                {filteredArticles.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
                    <Info className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="font-semibold text-slate-700">No se encontraron artículos</p>
                    <p className="text-xs mt-1">Intenta con otra palabra clave o selecciona "Todos los Temas".</p>
                  </div>
                ) : (
                  filteredArticles.map((art) => {
                    const isSelected = selectedArticle?.id === art.id;
                    const isBookmarked = bookmarks.includes(art.id);
                    return (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-white border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                art.type === 'ley'
                                  ? 'bg-slate-900 text-amber-400'
                                  : 'bg-amber-100 text-amber-900 border border-amber-300'
                              }`}
                            >
                              {art.type === 'ley' ? `Ley Art. ${art.num}` : `Reglamento Art. ${art.num}`}
                            </span>
                            <span className="text-xs text-slate-500 truncate max-w-[180px]">
                              {art.chapter.split(':')[0]}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(art.id);
                            }}
                            className="text-slate-400 hover:text-amber-500 p-1"
                            title={isBookmarked ? 'Quitar de guardados' : 'Guardar artículo'}
                          >
                            <Bookmark
                              className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
                            />
                          </button>
                        </div>

                        <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1">
                          {art.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                          <span className="truncate max-w-[200px]">
                            🔍 {art.keyTakeaway}
                          </span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-semibold group">
                            Leer <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: ARTICLE DETAIL READER */}
            <div className="lg:col-span-7">
              {selectedArticle ? (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                  
                  {/* DETAIL TOP BAR */}
                  <div className="bg-slate-900 text-white p-5 border-b border-amber-500/30">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded">
                          {selectedArticle.type === 'ley' ? `LEY 32069 - ART. ${selectedArticle.num}` : `REGLAMENTO - ART. ${selectedArticle.num}`}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {selectedArticle.chapter}
                        </span>
                      </div>

                      {/* TEXT CONTROLS & ACTIONS */}
                      <div className="flex items-center gap-1">
                        <div className="bg-slate-800 rounded-lg p-0.5 flex items-center text-xs text-slate-300">
                          <button
                            onClick={() => setFontSize('text-sm')}
                            className={`px-2 py-1 rounded ${fontSize === 'text-sm' ? 'bg-slate-700 text-white font-bold' : ''}`}
                            title="Texto Pequeño"
                          >
                            A-
                          </button>
                          <button
                            onClick={() => setFontSize('text-base')}
                            className={`px-2 py-1 rounded ${fontSize === 'text-base' ? 'bg-slate-700 text-white font-bold' : ''}`}
                            title="Texto Normal"
                          >
                            A
                          </button>
                          <button
                            onClick={() => setFontSize('text-lg')}
                            className={`px-2 py-1 rounded ${fontSize === 'text-lg' ? 'bg-slate-700 text-white font-bold' : ''}`}
                            title="Texto Grande"
                          >
                            A+
                          </button>
                        </div>

                        <button
                          onClick={() => handleCopy(selectedArticle.fullContent, selectedArticle.id)}
                          className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Copiar Texto Completo"
                        >
                          {copiedId === selectedArticle.id ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => toggleBookmark(selectedArticle.id)}
                          className="p-2 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Guardar en favoritos"
                        >
                          <Bookmark
                            className={`w-4 h-4 ${bookmarks.includes(selectedArticle.id) ? 'fill-amber-400 text-amber-400' : ''}`}
                          />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {selectedArticle.title}
                    </h2>
                  </div>

                  {/* KEY TAKEAWAY BANNER */}
                  <div className="bg-amber-50 border-b border-amber-200/60 p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-amber-900">
                      <strong className="font-semibold">Resumen Clave: </strong>
                      {selectedArticle.keyTakeaway}
                    </div>
                  </div>

                  {/* ARTICLE FULL TEXT CONTENT */}
                  <div className="p-6 space-y-6 max-h-[calc(100vh-380px)] overflow-y-auto">
                    <div className={`text-slate-800 leading-relaxed font-serif whitespace-pre-line ${fontSize}`}>
                      {selectedArticle.fullContent}
                    </div>

                    {/* CONCORDANCE & TAGS SECTION */}
                    <div className="border-t border-slate-200 pt-4 space-y-3 font-sans">
                      <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <ArrowLeftRight className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <strong className="font-semibold text-slate-900">Concordancia Normativa: </strong>
                          {selectedArticle.concordance}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        {selectedArticle.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-600 border border-slate-200 text-[11px] px-2.5 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* AI PROMPT DIRECT ACTION BUTTON */}
                    <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Asistente Legal IA
                        </h4>
                        <p className="text-xs text-slate-300">
                          ¿Quieres una explicación práctica o análisis de un caso sobre este artículo?
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('ai');
                          handleSendAiMessage(`Explícame de manera práctica y con ejemplos el ${selectedArticle.title} (${selectedArticle.type === 'ley' ? 'Ley 32069' : 'Reglamento'})`);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs shrink-0 transition-colors"
                      >
                        Explicar con IA
                      </button>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-base font-semibold text-slate-700">Selecciona un artículo</p>
                  <p className="text-xs mt-1">Elige un artículo de la lista de la izquierda para visualizar su texto íntegro.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: COMPARATIVE VIEW (LEY VS REGLAMENTO) */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ArrowLeftRight className="w-5 h-5 text-amber-600" />
                    Comparador Sintáctico: Ley 32069 vs. Reglamento
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Visualiza simultáneamente la norma matriz y su reglamentación operativa para un análisis integral.
                  </p>
                </div>

                {/* SELECTOR FOR COMPARISON */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-700">Tema a comparar:</label>
                  <select
                    value={compareLeyNum}
                    onChange={(e) => setCompareLeyNum(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value={17}>Art. 17 - Impedimentos para Contratar</option>
                    <option value={45}>Art. 45 - Penalidades y Modificaciones</option>
                    <option value={60}>Art. 60 - Solución de Controversias & JRD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SPLIT SCREEN COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LEY 32069 SIDE */}
              {(() => {
                const leyArt = ARTICLES_DATA.find((a) => a.type === 'ley' && a.num === compareLeyNum);
                return (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 border-b border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded">
                          LEY N.° 32069
                        </span>
                        <h3 className="font-bold text-sm">Art. {leyArt?.num}</h3>
                      </div>
                      <span className="text-xs text-slate-400">Texto Matriz Legal</span>
                    </div>

                    <div className="p-5 space-y-4">
                      <h4 className="font-bold text-slate-900 text-base">{leyArt?.title}</h4>
                      <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
                        💡 <strong>Criterio Legal:</strong> {leyArt?.keyTakeaway}
                      </p>
                      <div className="text-xs text-slate-700 leading-relaxed font-serif whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-200">
                        {leyArt?.fullContent}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* REGLAMENTO SIDE */}
              {(() => {
                // Find matching regulation article in dataset
                const regMap = { 17: 25, 45: 142, 60: 180 };
                const regNum = regMap[compareLeyNum];
                const regArt = ARTICLES_DATA.find((a) => a.type === 'reglamento' && a.num === regNum);
                return (
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-amber-600 text-white p-4 border-b border-amber-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-950 text-amber-400 text-xs font-black px-2 py-0.5 rounded">
                          REGLAMENTO
                        </span>
                        <h3 className="font-bold text-sm">Art. {regArt?.num}</h3>
                      </div>
                      <span className="text-xs text-amber-100">Disposición Operativa</span>
                    </div>

                    <div className="p-5 space-y-4">
                      <h4 className="font-bold text-slate-900 text-base">{regArt?.title}</h4>
                      <p className="text-xs text-blue-900 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        🛠️ <strong>Mecanismo de Aplicación:</strong> {regArt?.keyTakeaway}
                      </p>
                      <div className="text-xs text-slate-700 leading-relaxed font-serif whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-200">
                        {regArt?.fullContent}
                      </div>
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        )}

        {/* TAB 3: AI LEGAL ASSISTANT (GEMINI INTEGRATION) */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* CHAT WINDOW */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
              
              {/* CHAT HEADER */}
              <div className="bg-slate-900 text-white p-4 border-b border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-slate-950 font-bold">
                    <Bot className="w-5 h-5 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      Consultor IA Ley 32069
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-medium px-2 py-0.2 rounded-full">
                        En línea
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Asistente virtual capacitado en el marco normativo peruano de contrataciones públicas
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAiMessages([aiMessages[0]])}
                  className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                  title="Reiniciar Conversación"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Limpiar</span>
                </button>
              </div>

              {/* MESSAGES CONTAINER */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                {aiMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-amber-400'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {msg.sender === 'user' ? 'Tú' : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white rounded-tr-none'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-sans'
                      }`}
                    >
                      {msg.text}

                      <div
                        className={`text-[10px] mt-2 text-right ${
                          msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isAiLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 animate-bounce" />
                    </div>
                    <div className="bg-white text-slate-600 border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs flex items-center gap-2 shadow-sm">
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                      <span>Analizando articulado de la Ley 32069 y jurisprudencia del OSCE...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT BAR */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAiMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Escribe tu consulta legal (ej: ¿Qué ocurre si no firmo el contrato en el plazo?)..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={!userQuery.trim() || isAiLoading}
                    className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Enviar</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center">
                  El asistente utiliza inteligencia artificial grounded en la normativa peruana. Verifica siempre con el texto oficial del Diario Oficial El Peruano.
                </p>
              </div>

            </div>

            {/* PRESET PROMPTS & LEGAL TIPS */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* PRESETS CARD */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  Consultas Frecuentes Sugeridas
                </h3>
                <p className="text-xs text-slate-500">
                  Haz clic en cualquiera de las siguientes preguntas preparadas para consultar de inmediato:
                </p>

                <div className="space-y-2">
                  {AI_PRESET_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendAiMessage(prompt)}
                      className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-xs text-slate-700 hover:text-amber-900 transition-all font-medium flex items-center justify-between group"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-amber-600 shrink-0 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* LAW DISCLAIMER & API INFO */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  Nota sobre las respuestas
                </div>
                <p className="text-[11px] leading-relaxed">
                  Las explicaciones emitidas por la Inteligencia Artificial sirven como orientación didáctica preliminar y no constituyen opinión vinculante del Tribunal de Contrataciones ni del Organismo Supervisor (OSCE).
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: SAVED ARTICLES & ANNOTATIONS */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-600 fill-amber-600" />
                  Mis Artículos Guardados & Anotaciones Personalizadas
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Guarda artículos clave para tu práctica legal diaria y añade notas personalizadas persistentemente.
                </p>
              </div>

              <span className="bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold px-3 py-1 rounded-full">
                {bookmarks.length} Artículos en Favoritos
              </span>
            </div>

            {bookmarks.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 space-y-3">
                <Bookmark className="w-12 h-12 mx-auto text-slate-300" />
                <h3 className="text-base font-bold text-slate-700">No tienes artículos guardados</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  En el "Explorador Normativo", haz clic en el icono del marcador (🔖) en cualquier artículo para guardarlo aquí.
                </p>
                <button
                  onClick={() => setActiveTab('explorer')}
                  className="bg-slate-900 text-amber-400 font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Ir al Explorador
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookmarks.map((id) => {
                  const art = ARTICLES_DATA.find((a) => a.id === id);
                  if (!art) return null;
                  const currentNote = articleNotes[id] || '';

                  return (
                    <div key={id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="bg-slate-900 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded">
                            {art.type === 'ley' ? `Ley Art. ${art.num}` : `Reglamento Art. ${art.num}`}
                          </span>

                          <button
                            onClick={() => toggleBookmark(id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                            title="Quitar de favoritos"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h3 className="font-bold text-slate-900 text-base">{art.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-serif bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {art.summary}
                        </p>

                        {/* NOTES AREA */}
                        <div className="pt-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                            <Edit3 className="w-3.5 h-3.5 text-amber-600" /> Mi Nota Personal:
                          </label>
                          <textarea
                            value={currentNote}
                            onChange={(e) => handleNoteChange(id, e.target.value)}
                            placeholder="Escribe tus notas, jurisprudencia o comentarios sobre este artículo..."
                            rows={3}
                            className="w-full text-xs bg-amber-50/50 border border-amber-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 border-t border-slate-100 p-3 flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedArticle(art);
                            setActiveTab('explorer');
                          }}
                          className="text-amber-700 hover:text-amber-900 font-bold text-xs flex items-center gap-1"
                        >
                          Ver en Lector Completo <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PRACTICAL GUIDE & PROCESS FLOWCHARTS */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                Guía Práctica: El Ciclo de la Contratación Pública bajo Ley 32069
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Estructura esquemática de las tres grandes fases del proceso de contratación estatal en el Perú.
              </p>
            </div>

            {/* THREE PHASES FLOWCHART */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROCESS_PHASES.map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <div key={idx} className={`bg-white rounded-xl border-t-4 ${p.color.split(' ')[0]} border-x border-b border-slate-200 p-5 shadow-sm space-y-4`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${p.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{p.phase}</h3>
                    </div>

                    <ul className="space-y-2.5">
                      {p.steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                          <span className="bg-slate-200 text-slate-800 rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* KEY INNOVATIONS IN LEY 32069 */}
            <div className="bg-slate-900 text-white p-6 rounded-xl border border-amber-500/30 space-y-4">
              <h3 className="font-bold text-base text-amber-400 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Novedades Clave introducidas por la Ley N.° 32069
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-1">
                  <h4 className="font-bold text-white text-sm">1. Compra Pública de Innovación</h4>
                  <p className="text-slate-300">
                    Permite al Estado contratar soluciones innovadoras no existentes en el mercado para resolver problemas públicos complejos.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-1">
                  <h4 className="font-bold text-white text-sm">2. Valor de la Contratación</h4>
                  <p className="text-slate-300">
                    Unifica la nomenclatura legal previa (Valor Estimado y Valor Referencial) bajo un solo concepto integrado.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-1">
                  <h4 className="font-bold text-white text-sm">3. Extensión de la JRD</h4>
                  <p className="text-slate-300">
                    Fortalece la Junta de Resolución de Disputas como mecanismo preventivo obligatorio para evitar paralizaciones de obras públicas.
                  </p>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 space-y-1">
                  <h4 className="font-bold text-white text-sm">4. Verificación Automatizada de Impedimentos</h4>
                  <p className="text-slate-300">
                    Cruce en tiempo real entre RENIEC, Poder Judicial y SUNAT a través de la Plataforma Digital para filtrar impedidos.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-12 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-200">
              Plataforma de Consulta Jurídica - Ley N.° 32069 & Reglamento
            </p>
            <p className="text-slate-500 mt-0.5">
              Herramienta independiente de consulta legal pública para funcionarios, abogados y contratistas del Estado Peruano.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Scale className="w-4 h-4 text-amber-500" /> República del Perú
            </span>
            <span>•</span>
            <span>Actualizado 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}