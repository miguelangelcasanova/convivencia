import { DocumentModel, ExpedienteData } from './types';

export const DECREE_COLOR = "#A50034"; // CyL Red

export const DOCUMENT_MODELS: DocumentModel[] = [
  // --- ABREVIADO ---
  {
    id: "Modelo Abreviado",
    title: "Acuerdo Abreviado",
    phase: 1,
    description: "Procedimiento ágil con acuerdo de partes (FAQ P.8)",
    showInAbreviado: true,
    requiredForPhase: true,
    generateText: (data) => `
ACUERDO ABREVIADO DE CORRECCIÓN (Procedimiento Abreviado)

Reunidos la Dirección del Centro, el alumno/a ${data.student.name} y sus representantes legales.

CONSTATADOS los hechos ocurridos el ${data.dateStarted}: "${data.facts}".

MANIFESTANDO el alumno el reconocimiento de los mismos y su voluntad de reparar el daño.

ACUERDAN:
1. La aceptación inmediata de la sanción: ${data.sanction || "[SANCIÓN]"}.
2. La renuncia a la tramitación del procedimiento ordinario.
3. El compromiso de mejora de conducta.

De conformidad con los procedimientos de acuerdo abreviado previstos para agilizar la respuesta educativa.

Fdo: El Director, El Alumno, Los Padres.
    `
  },
  
  // --- PHASE 1 MODELS ---
  {
    id: "Modelo 1",
    title: "Iniciación del Expediente",
    phase: 1,
    description: "Acuerdo de incoación del director",
    requiredForPhase: true,
    showInAbreviado: true,
    generateText: (data) => `
MODELO 1: INICIACIÓN DEL EXPEDIENTE SANCIONADOR Y COMUNICACIÓN (Art. 50.2)

D. DIRECTOR DEL CENTRO, una vez recogida la necesaria información,

ACUERDA incoar expediente sancionador al alumno/a ${data.student.name || "[NOMBRE ALUMNO]"} de curso de ${data.student.course || "[CURSO]"} por la presunta comisión de los hechos ocurridos el día ${data.dateStarted}, que se concreta en:

"${data.facts || "[DESCRIPCIÓN DE LOS HECHOS]"}"

A tenor de lo dispuesto en el artículo 50.2 del Decreto 51/2007, de 17 de mayo, por el que se regulan los derechos y los deberes de los alumnos y la participación y los compromisos de las familias en el proceso educativo.

EL DIRECTOR
    `
  },
  {
    id: "Modelo 2",
    title: "Nombramiento Instructor/Secretario",
    phase: 1,
    description: "Designación de responsables",
    requiredForPhase: true,
    generateText: (data) => `
MODELO 2: NOMBRAMIENTO DEL INSTRUCTOR Y SECRETARIO (Art. 50.3.c)

Una vez incoado expediente sancionador al alumno/a ${data.student.name},

NOMBRA INSTRUCTOR a D. ${data.instructor || "[NOMBRE INSTRUCTOR]"}
y como Secretario/a a D. ${data.secretary || "[NOMBRE SECRETARIO]"}

A tenor de lo dispuesto en el artículo 50.3.c del Decreto 51/2007.

EL DIRECTOR
    `
  },
  {
    id: "Modelo 3",
    title: "Comunicación y Recusación",
    phase: 1,
    description: "Comunicación a la familia con derecho a recusación",
    generateText: (data) => `
MODELO 3: COMUNICACIÓN DE NOMBRAMIENTO Y DERECHO DE RECUSACIÓN (Art. 50.3.d)

Al alumno/a ${data.student.name} y a sus padres/tutores (${data.student.parents || "[PADRES]"}).

Se comunica el nombramiento del Instructor D. ${data.instructor} y Secretario D. ${data.secretary}.

Conforme al artículo 50.3.d del Decreto 51/2007, le comunico la posibilidad de acogerse a los procesos de Mediación (excepto en casos muy graves).

Asimismo, se le traslada que usted puede RECUSAR por escrito estos nombramientos en un plazo de DOS DÍAS LECTIVOS ante esta dirección (Art 24 Ley 40/2015).

EL DIRECTOR
    `
  },
  {
    id: "Modelo 4",
    title: "Notificación al Proponente",
    phase: 1,
    description: "A quien propuso la sanción",
    generateText: (data) => `
MODELO 4: NOTIFICACIÓN AL PROPONENTE (Art. 50.4)

De conformidad con el Artículo 50.4, le comunico que con fecha ${data.dateStarted} se ha iniciado expediente sancionador al alumno/a ${data.student.name} por la presunta comisión de los hechos que usted comunicó a esta dirección.

EL DIRECTOR
    `
  },
  {
    id: "Modelo 5",
    title: "Notificación Inspección",
    phase: 1,
    description: "Comunicación obligatoria al Inspector",
    generateText: (data) => `
MODELO 5: NOTIFICACIÓN AL INSPECTOR DE EDUCACIÓN (Art. 50.4)

Sr. Inspector de Educación del Centro:

Le comunico que con fecha ${data.dateStarted} se ha iniciado expediente sancionador al alumno/a ${data.student.name} del curso ${data.student.course}.

Conforme se vaya desarrollando el procedimiento se le irá informando del proceso de tramitación y de su resolución.

EL DIRECTOR
    `
  },

  // --- PHASE 2 MODELS ---
  {
    id: "Modelo 6",
    title: "Entrevista Alumno",
    phase: 2,
    description: "Actuación para esclarecimiento de hechos",
    requiredForPhase: true,
    generateText: (data) => `
MODELO 6: ACTUACIONES DEL INSTRUCTOR - ENTREVISTA AL ALUMNO

Comparece el alumno ${data.student.name}, en presencia de sus padres/tutores ${data.student.parents}.

PREGUNTADO sobre los hechos ocurridos el día ${data.dateStarted}:
RESPONDE: __________________________________________________________________

PREGUNTADO si tiene algo más que alegar:
RESPONDE: __________________________________________________________________

Se les cita para notificarles el PLIEGO DE CARGOS conforme al artículo 52.2.

EL INSTRUCTOR
    `
  },
  {
    id: "Modelo 7",
    title: "Entrevista Testigos",
    phase: 2,
    description: "Declaración de otros miembros",
    generateText: (data) => `
MODELO 7: ACTUACIONES DEL INSTRUCTOR - ENTREVISTA A TESTIGOS

Comparece D. [NOMBRE TESTIGO] en relación al expediente del alumno ${data.student.name}.

PREGUNTADO: __________________________________________________________________
RESPONDE: __________________________________________________________________

EL INSTRUCTOR
    `
  },
  {
    id: "Modelo 8",
    title: "Propuesta Medidas Cautelares",
    phase: 2,
    description: "Propuesta del Instructor al Director",
    isUrgent: true,
    generateText: (data) => `
MODELO 8: PROPUESTA DE MEDIDAS CAUTELARES (Art. 51.1)

El Instructor estima procedente PROPONER la adopción de Medidas Cautelares consistentes en:
[ ] Cambio temporal de grupo
[ ] Suspensión temporal de asistencia a clase

EL INSTRUCTOR: ${data.instructor}
    `
  },
  {
    id: "Modelo 10",
    title: "Pliego de Cargos",
    phase: 2,
    description: "Documento central de la instrucción",
    requiredForPhase: true,
    generateText: (data) => `
MODELO 10: PLIEGO DE CARGOS (Art. 52.1 y 52.2)

INSTRUCTOR: ${data.instructor}
ALUMNO: ${data.student.name}

A la vista de las actuaciones${data.isAuthorityContext ? ' y considerando el valor probatorio de las declaraciones del profesorado (Art. 25 bis)' : ''}, se imputan los siguientes CARGOS:

1. HECHOS: "${data.factsProven || data.facts || "[HECHOS PROBADOS]"}"

2. TIPIFICACIÓN: Podría constituir una conducta gravemente perjudicial para la convivencia (Art. 48 Decreto 51/2007).

${data.isAuthorityContext ? 'NOTA: Los hechos constatados por el profesorado tienen presunción de veracidad salvo prueba en contrario.' : ''}

Se le informa que puede contestar en un plazo de DOS DÍAS LECTIVOS con las alegaciones que considere convenientes.

EL INSTRUCTOR
    `
  },

  // --- PHASE 3 MODELS ---
  {
    id: "Modelo 11",
    title: "Propuesta de Resolución",
    phase: 3,
    description: "Propuesta final y vista de audiencia",
    requiredForPhase: true,
    generateText: (data) => `
MODELO 11: PROPUESTA DE RESOLUCIÓN Y VISTA DE AUDIENCIA (Art. 52.4)

ALUMNO: ${data.student.name}

A.- PROPUESTA DE RESOLUCIÓN:
I. HECHOS PROBADOS: "${data.factsProven || "[HECHOS]"}"
II. CALIFICACIÓN: Conducta Gravemente Perjudicial.
III. RESPONSABLE: El alumno citado.
IV. ATENUANTES/AGRAVANTES: [DETALLAR]
V. SANCIÓN APLICABLE: ${data.sanction || "[SANCIÓN PROPUESTA]"}

Se concede un plazo de DOS DÍAS LECTIVOS para alegaciones.

EL INSTRUCTOR
    `
  },
  {
    id: "Modelo 12",
    title: "Elevación al Director",
    phase: 3,
    description: "Paso final antes de la resolución",
    generateText: (data) => `
MODELO 12: ELEVACIÓN DEL EXPEDIENTE AL DIRECTOR (Art. 52.5)

Sr. Director del Centro.

Tramitado el expediente sancionador al alumno ${data.student.name}, el instructor formula la propuesta de resolución adjunta.
Corresponde al director la resolución en un plazo máximo de dos días lectivos.

EL INSTRUCTOR
    `
  },
  {
    id: "Modelo 13",
    title: "Resolución Final",
    phase: 3,
    description: "Documento de finalización y sanción",
    requiredForPhase: true,
    isUrgent: true,
    showInAbreviado: true,
    generateText: (data) => `
MODELO 13: RESOLUCIÓN DEL EXPEDIENTE SANCIONADOR (Art. 53.1)

El Director del centro REALIZA LA SIGUIENTE RESOLUCIÓN:

I. HECHOS PROBADOS: "${data.factsProven || "[HECHOS]"}"
II. SANCIÓN IMPUESTA: "${data.sanction || "[SANCIÓN]"}"
III. EJECUTIVIDAD: Las medidas son inmediatamente ejecutivas (Art 29.2.b).
IV. RECURSO: Contra esta resolución cabe recurso de alzada ante la Dirección Provincial de Educación en el plazo de un mes.

EL DIRECTOR
    `
  },
   {
    id: "Modelo 16",
    title: "Solicitud Revisión Consejo Escolar",
    phase: 3,
    description: "Derecho de la familia a revisión",
    generateText: (data) => `
MODELO 16: SOLICITUD DE REVISIÓN POR EL CONSEJO ESCOLAR (Art 16.2.b)

D. ${data.student.parents}, padre/madre del alumno ${data.student.name}.

SOLICITA ante el Consejo Escolar la revisión de la resolución sancionadora adoptada por el director con fecha [FECHA], en base a los siguientes motivos:

__________________________________________________________________

Fdo: ${data.student.parents}
    `
  }
];