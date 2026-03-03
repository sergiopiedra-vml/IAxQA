/* =============================================================
   IA x QA — Presentación Interactiva
   app.js — Lógica de navegación, datos y demos interactivos
   Vanilla JS, sin dependencias externas.
   ============================================================= */
// @ts-nocheck
'use strict';

/* ──────────────────────────────────────────────────
   1. DATA MODEL — Slides
   ────────────────────────────────────────────────── */
var SLIDES_META = [
    { id: 0, tag: '', title: 'QA en la nueva era', speakerNotes: 'Bienvenidos. Esta presentación cubre cómo la IA está transformando el trabajo de QA — no como reemplazo, sino como herramienta que multiplica nuestras capacidades. Duración objetivo: 40 minutos con dos demos interactivos.' },
    { id: 1, tag: 'Contexto', title: '¿Qué cambió?', speakerNotes: 'En los últimos 2 años, la IA generativa pasó de curiosidad a herramienta del día a día. GitHub Copilot, ChatGPT, Claude, Gemini — todos generan código, tests y análisis. La velocidad de entrega se aceleró, y eso impacta directamente al QA. Lo importante: esto no es hype pasajero, es una nueva capa de tooling.' },
    { id: 2, tag: 'Contexto', title: 'La IA genera… todo (o casi)', speakerNotes: 'La IA puede generar código, tests, documentación, análisis de logs, reportes. Pero NO entiende su negocio, sus usuarios ni su contexto. La pregunta no es "me va a reemplazar" sino "cómo usarla para ser más efectivo". Ahí es donde entra el criterio humano.' },
    { id: 3, tag: 'Evolución', title: 'Evolución del rol QA', speakerNotes: 'El rol QA siempre ha evolucionado. De manual a automation, y ahora a AI-assisted. Cada fase agrega herramientas, no elimina lo anterior. Todavía se necesita criterio para testing manual, skills de automation, y ahora sumar skills de IA. No es una u otra — es acumulativo.' },
    { id: 4, tag: 'Evolución', title: 'El nuevo QA: Orquestador', speakerNotes: 'El QA del futuro cercano es un orquestador: define QUÉ probar, la IA ayuda con el CÓMO. Pero el QA sigue siendo dueño de la estrategia, los criterios de calidad, y la decisión final. Piense en un director de orquesta — no toca todos los instrumentos, pero sabe cómo debe sonar la pieza completa.' },
    { id: 5, tag: 'Evolución', title: '¿Qué se espera de un QA en 2026?', speakerNotes: 'Analizamos 12 vacantes reales de empresas tech en LinkedIn, Lever y Greenhouse (Feb-Mar 2026). Resultado: automation es piso (12/12), CI/CD casi universal (11/12), 9 de 12 piden experiencia con IA/LLM tools, y 6 incluyen skills de Docker/K8s/infra. Testing manual aparece solo en 2 como nice-to-have. El título ya no es Tester, es QA Engineer o SDET. El mensaje: el QA de 2026 es un engineer que testea, no un tester que programa.' },
    { id: 6, tag: 'Mitos vs Realidades', title: 'Lo que dicen vs lo que pasa', speakerNotes: 'Vamos a derribar algunos mitos. "La IA reemplaza testers" — No, reemplaza tareas repetitivas. "Los tests de IA son production-ready" — No, el output es un borrador. "Solo pego y corro" — se necesita contexto, revisión y criterio.' },
    { id: 7, tag: 'Mitos vs Realidades', title: 'Más mitos que hay que soltar', speakerNotes: 'La IA no conoce su negocio — solo sabe lo que usted le dice. Más IA no significa mejor calidad — malos prompts dan malos resultados. Y nunca elimina la necesidad de una estrategia de pruebas. La IA es una herramienta, no una estrategia.' },
    { id: 8, tag: 'IA como aliada', title: '5 cosas que la IA hace mejor que yo', speakerNotes: 'Aquí van 5 áreas donde la IA genuinamente ayuda más que un humano solo. No es fanboy talk — son casos reales donde el ROI es medible. Generar casos de prueba desde user stories es el caso de uso #1 más práctico. Sugerir escenarios que usted no consideró es el #2 más valioso — la IA no tiene sus sesgos.' },
    { id: 9, tag: 'IA como aliada', title: '5 cosas (continuación)', speakerNotes: 'Detectar gaps en cobertura funciona como un peer review instantáneo. Documentación repetitiva — nadie quiere escribir el quinto reporte del sprint. Y acelerar automatización generando scripts base ahorra horas. Clave: son tareas de ASISTENCIA. El criterio sigue siendo tuyo.' },
    { id: 10, tag: 'Limitaciones reales', title: 'Donde la IA falla (y falla feo)', speakerNotes: 'Ahora lo que NO funciona. Redundancia: genera 20 test cases donde 5 bastan. Sin contexto es genérica e inútil. No entiende reglas de negocio complejas. Y siempre — siempre — requiere revisión humana. La frase clave: "El output es un borrador, no un entregable." Grabenla.' },
    { id: 11, tag: 'GenAI en el STLC', title: 'IA en cada fase del ciclo', speakerNotes: 'Vamos a ver cómo la IA se integra en cada fase del Software Testing Life Cycle. No es solo "generar tests" — entra desde requirements hasta reporting. La clave es saber DÓNDE aporta valor real y dónde solo agrega ruido.' },
    { id: 12, tag: 'GenAI en el STLC', title: 'Requirements y Planning', speakerNotes: 'En requirements: detectar ambigüedades, generar preguntas al PO, sugerir test ideas iniciales. En planning: proponer estructura de plan de pruebas, identificar áreas de riesgo, priorizar por impacto. Excelente para el "first draft" que después usted refina.' },
    { id: 13, tag: 'GenAI en el STLC', title: 'Design, Execution y Reporting', speakerNotes: 'En design: análisis de cobertura, edge cases, valores límite, combinaciones. En execution: generar scripts base (Playwright, Cypress), sugerir selectores, datos, assertions. Incluso debugging de tests fallidos. En reporting: generar tickets desde logs, resumir resultados, crear summaries para stakeholders.' },
    { id: 14, tag: 'Selección de LLM', title: '¿Qué modelo conviene para QA?', speakerNotes: 'No todos los modelos son iguales para QA. Usted necesita evaluar: precisión (qué tan buenos son los tests generados), costo (tokens, suscripción), privacidad (datos sensibles, compliance), velocidad y ventana de contexto (cuánto código/spec puede enviar). Esta matriz ayuda a decidir.' },
    { id: 15, tag: 'Selección de LLM', title: 'Reglas de decisión', speakerNotes: 'Reglas simples: datos sensibles -> solo vía WPP Open que tiene GPT-5.2, Claude y Gemini con filtros de seguridad enterprise. En VML nunca usamos APIs públicas directas con datos de clientes. Razonamiento complejo -> modelo grande (GPT-5.2, Claude Opus 4.6). Alto volumen / bajo costo -> modelo menor (GPT-4o-mini, Haiku). Ojo: Opus 4.6 consume ×3 vs Sonnet, usarlo solo cuando el razonamiento lo justifique. Velocidad crítica -> endpoints optimizados o modelos edge. No es one-size-fits-all.' },
    { id: 16, tag: 'Prompt Engineering', title: 'Prompt + Context Engineering', speakerNotes: 'El prompt es solo la mitad. El CONTEXTO es lo que hace la diferencia entre un resultado genérico y uno útil. ¿Qué app es? ¿Qué tecnología? ¿Qué restricciones? ¿Qué formato de salida necesitás? Los errores más comunes: prompts vagos, sin contexto, sin formato esperado, sin ejemplos.' },
    { id: 17, tag: 'Prompt Engineering', title: 'La fórmula del buen prompt', speakerNotes: 'La fórmula: Objetivo + Contexto + Restricciones + Formato de salida + Ejemplos. No es magia — es ser específico. Vamos a verlo en acción con el demo.' },
    { id: 18, tag: 'Demo', title: 'Demo: Prompt Builder', speakerNotes: 'Demo interactivo. Vamos a construir un prompt para QA paso a paso. Pueden ver cómo cambia el resultado según el contexto que le demos. Noten la diferencia entre un prompt genérico y uno específico.', interactiveType: 'prompt-builder' },
    { id: 19, tag: 'Herramientas', title: 'Asistentes de código: Copilot e IDE', speakerNotes: 'Copilot, Cursor, Windsurf — asistentes de código en el IDE. Para QA: generan scripts de test, sugieren assertions, autocompletan patrones. Aceleración realista: 30-50% en tareas repetitivas. Riesgos: over-reliance, código que "parece bien" pero tiene bugs sutiles. Siempre revisar.' },
    { id: 20, tag: 'Herramientas', title: 'LLMs locales: Ollama y cuándo convienen', speakerNotes: 'Ollama, LM Studio, llama.cpp — modelos que corren en su máquina. Ventajas: privacidad total, sin costos de API, funciona offline, compliance friendly. Desventajas: menos precisos que modelos cloud, requieren hardware decente, modelos más limitados. Cuándo convienen: prototipado rápido, ambientes air-gapped. Nota: en VML para datos sensibles nuestra opción principal es WPP Open, que ya integra GPT-5.2, Claude y Gemini con filtros de seguridad enterprise.' },
    { id: 21, tag: 'Agentes', title: 'QA Agents: ¿Qué son?', speakerNotes: 'Un agente es más que un LLM: planifica, ejecuta, evalúa y ajusta. Loop: recibe objetivo -> descompone en pasos -> ejecuta cada paso -> evalúa resultado -> ajusta si falla. No es un chatbot — es un worker autónomo con supervisión. Para QA: puede planificar tests, ejecutarlos, y reportar — con su supervisión.' },
    { id: 22, tag: 'Agentes', title: 'Ejemplos de agentes + MCPs', speakerNotes: 'Ejemplos: agente que genera plan de pruebas desde specs, agente Playwright que escribe y ejecuta tests E2E, agente de autocorrección que arregla tests rotos, agente de a11y que audita automáticamente. MCPs (Model Context Protocols): estandarizan cómo los agentes acceden a herramientas externas. Piensen en APIs pero para agentes IA.' },
    { id: 23, tag: 'Demo', title: 'Demo: Interpretador de Performance', speakerNotes: 'Demo de interpretación de resultados de performance test con IA. Estos son datos reales de un JMeter test. La IA no solo lee los números — interpreta patrones, correlaciona métricas y sugiere acciones concretas. Pero siempre necesitamos al QA para validar el contexto.', interactiveType: 'perf-interpreter' },
    { id: 24, tag: 'Cultura', title: 'VibeCoding y VibeTesting', speakerNotes: 'VibeCoding: escribir código dejándose llevar por la IA sin estructura. VibeTesting: lo mismo pero para testing. Suena cool, pero es riesgoso. No es improvisación: es guiar con criterio. Use la IA, pero con intención. Defina qué quiere antes de pedirlo. La IA amplifica su dirección — asegúrese de que su dirección sea buena.' },
    { id: 25, tag: 'Guardrails', title: 'Guardrails y buenas prácticas', speakerNotes: 'Las reglas no negociables: 1) Always human review — nunca confiar ciegamente. 2) Checklist antes de confiar: ¿el test es relevante? ¿cubre el caso real? ¿usa datos válidos? 3) Datos sensibles solo vía WPP Open — nunca APIs públicas directas. 4) Documentar qué fue asistido por IA. 5) Versionar prompts como código.' },
    { id: 26, tag: 'Cierre', title: 'Conclusión', speakerNotes: 'Estas dos frases resumen todo: "La IA no reemplaza a un QA. Reemplaza las horas que un QA desperdicia en tareas mecánicas." Y "La IA multiplica lo que usted ya sabe. Si sabe poco, multiplica poco. Si sabe mucho, es imparable." El futuro del QA no es sin humanos — es con humanos potenciados.' },
    { id: 27, tag: '', title: 'Preguntas y Discusión', speakerNotes: 'Abrir espacio para preguntas. Temas sugeridos si no hay preguntas: ¿Qué herramienta probarían primero mañana? ¿Cuál es el mayor blocker para adoptar IA en su equipo? ¿Cómo manejan datos sensibles actualmente?' }
];

var TOTAL_SLIDES = SLIDES_META.length;
var TARGET_MINUTES = 40;

/* ──────────────────────────────────────────────────
   2. STATE
   ────────────────────────────────────────────────── */
var state = {
    currentSlide: 0,
    isOverview: false,
    isPresenter: false,
    isHelp: false,
    timerRunning: false,
    timerSeconds: 0,
    timerInterval: null
};

/* ──────────────────────────────────────────────────
   3. DOM REFERENCES
   ────────────────────────────────────────────────── */
var DOM = {};

function cacheDom() {
    DOM.slides = Array.from(document.querySelectorAll('.slide'));
    DOM.progressBar = document.getElementById('progress-bar');
    DOM.slideCounter = document.getElementById('slide-counter');
    DOM.helpOverlay = document.getElementById('help-overlay');
    DOM.overviewOverlay = document.getElementById('overview-overlay');
    DOM.overviewGrid = document.getElementById('overview-grid');
    DOM.presenterPanel = document.getElementById('presenter-panel');
    DOM.presenterNotes = document.getElementById('presenter-notes-text');
    DOM.presenterTitle = document.getElementById('presenter-slide-title');
    DOM.presenterTimer = document.getElementById('presenter-timer');
    DOM.presenterInfo = document.getElementById('presenter-slide-info');
    DOM.helpBtn = document.getElementById('help-btn');
}

/* ──────────────────────────────────────────────────
   4. NAVIGATION
   ────────────────────────────────────────────────── */
function goToSlide(index) {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    state.currentSlide = index;

    DOM.slides.forEach(function (slide, i) {
        slide.classList.remove('active', 'prev', 'next');
        slide.setAttribute('aria-hidden', 'true');
        if (i === index) {
            slide.classList.add('active');
            slide.setAttribute('aria-hidden', 'false');
        } else if (i < index) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
    });

    updateProgress();
    updatePresenter();
    updateOverviewHighlight();
}

function nextSlide() {
    if (state.currentSlide < TOTAL_SLIDES - 1) goToSlide(state.currentSlide + 1);
}

function prevSlide() {
    if (state.currentSlide > 0) goToSlide(state.currentSlide - 1);
}

function updateProgress() {
    var pct = ((state.currentSlide + 1) / TOTAL_SLIDES) * 100;
    DOM.progressBar.style.width = pct + '%';
    DOM.slideCounter.textContent = (state.currentSlide + 1) + ' / ' + TOTAL_SLIDES;
}

/* ──────────────────────────────────────────────────
   5. OVERVIEW MODE
   ────────────────────────────────────────────────── */
function buildOverview() {
    DOM.overviewGrid.innerHTML = '';
    SLIDES_META.forEach(function (meta, i) {
        var thumb = document.createElement('button');
        thumb.className = 'overview-thumb' + (i === state.currentSlide ? ' active' : '');
        thumb.setAttribute('aria-label', 'Ir a slide ' + (i + 1) + ': ' + meta.title);
        var tagHtml = meta.tag ? '<span class="overview-thumb__tag">' + meta.tag + '</span>' : '';
        thumb.innerHTML = '<span class="overview-thumb__number">' + (i + 1) + '</span>' + tagHtml + '<span class="overview-thumb__title">' + meta.title + '</span>';
        thumb.addEventListener('click', function () {
            goToSlide(i);
            toggleOverview(false);
        });
        DOM.overviewGrid.appendChild(thumb);
    });
}

function toggleOverview(force) {
    var show = (typeof force === 'boolean') ? force : !state.isOverview;
    state.isOverview = show;
    if (show) buildOverview();
    DOM.overviewOverlay.classList.toggle('active', show);
}

function updateOverviewHighlight() {
    var thumbs = DOM.overviewGrid.querySelectorAll('.overview-thumb');
    thumbs.forEach(function (t, i) { t.classList.toggle('active', i === state.currentSlide); });
}

/* ──────────────────────────────────────────────────
   6. PRESENTER MODE
   ────────────────────────────────────────────────── */
function togglePresenter(force) {
    var show = (typeof force === 'boolean') ? force : !state.isPresenter;
    state.isPresenter = show;
    DOM.presenterPanel.classList.toggle('active', show);
    if (show) updatePresenter();
}

function updatePresenter() {
    if (!state.isPresenter) return;
    var meta = SLIDES_META[state.currentSlide];
    DOM.presenterTitle.textContent = (meta.tag ? meta.tag + ': ' : '') + meta.title;
    DOM.presenterNotes.textContent = meta.speakerNotes;
    DOM.presenterInfo.textContent = 'Slide ' + (state.currentSlide + 1) + ' de ' + TOTAL_SLIDES;
}

function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function updateTimerDisplay() {
    DOM.presenterTimer.textContent = formatTime(state.timerSeconds);
    var mins = state.timerSeconds / 60;
    DOM.presenterTimer.classList.remove('warning', 'overtime');
    if (mins >= TARGET_MINUTES) {
        DOM.presenterTimer.classList.add('overtime');
    } else if (mins >= TARGET_MINUTES - 5) {
        DOM.presenterTimer.classList.add('warning');
    }
}

function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    state.timerInterval = setInterval(function () {
        state.timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    state.timerRunning = false;
    clearInterval(state.timerInterval);
}

function resetTimer() {
    pauseTimer();
    state.timerSeconds = 0;
    updateTimerDisplay();
}

function toggleTimer() {
    state.timerRunning ? pauseTimer() : startTimer();
}

/* ──────────────────────────────────────────────────
   7. HELP OVERLAY
   ────────────────────────────────────────────────── */
function toggleHelp(force) {
    var show = (typeof force === 'boolean') ? force : !state.isHelp;
    state.isHelp = show;
    DOM.helpOverlay.classList.toggle('active', show);
}

/* ──────────────────────────────────────────────────
   8. KEYBOARD NAVIGATION
   ────────────────────────────────────────────────── */
function handleKeyDown(e) {
    // Don't capture keys when typing in inputs
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.key) {
        case 'ArrowRight':
        case ' ':
            e.preventDefault();
            if (!state.isOverview) nextSlide();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (!state.isOverview) prevSlide();
            break;
        case 'Escape':
            e.preventDefault();
            if (state.isHelp) { toggleHelp(false); return; }
            if (state.isPresenter) { togglePresenter(false); return; }
            toggleOverview();
            break;
        case 'p': case 'P':
            e.preventDefault();
            if (!state.isOverview) togglePresenter();
            break;
        case 'h': case 'H': case '?':
            e.preventDefault();
            toggleHelp();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(TOTAL_SLIDES - 1);
            break;
    }
}

/* ──────────────────────────────────────────────────
   9. DEMO: PROMPT BUILDER
   ────────────────────────────────────────────────── */
var PROMPT_TEMPLATES = {
    generic: {
        prefix: 'Genere casos de prueba para la siguiente funcionalidad.',
        body: '{userStory}\n\nCriterios de aceptación:\n{acceptance}\n\nContexto:\n{context}\n\nTipo de pruebas: {testType}\n\nEntregue los test cases en formato tabla con columnas: ID, Nombre, Pasos, Resultado Esperado, Prioridad.',
        suffix: ''
    },
    specific: {
        prefix: 'Actúe como un QA Engineer senior con experiencia en {testType} testing. Analice la siguiente user story y genere test cases exhaustivos siguiendo las mejores prácticas de testing.\n\nIMPORTANTE:\n- Incluya escenarios positivos, negativos y edge cases\n- Considere accesibilidad, performance y seguridad cuando aplique\n- Priorice por riesgo de negocio\n- Use datos realistas en los steps',
        body: 'USER STORY:\n{userStory}\n\nCRITERIOS DE ACEPTACIÓN:\n{acceptance}\n\nCONTEXTO TÉCNICO:\n{context}\n\nTIPO DE PRUEBAS SOLICITADO: {testType}\n\nFORMATO DE SALIDA:\nTabla con columnas: ID | Nombre del Test | Precondiciones | Pasos detallados | Resultado Esperado | Prioridad (Alta/Media/Baja) | Tipo (Positivo/Negativo/Edge Case)\n\nDespués de la tabla, agregue:\n1. Gaps de cobertura detectados\n2. Riesgos identificados\n3. Sugerencias de automatización',
        suffix: '\n\nConsideraciones adicionales:\n- Si hay ambigüedades en la story, liste estas antes de los test cases\n- Incluya al menos 2 edge cases no obvios\n- Marque los tests que son candidatos a automatización'
    }
};

var SAMPLE_OUTPUT = {
    generic: [
        { id: 'TC-001', name: 'Login exitoso con credenciales válidas', expected: 'Redirige al dashboard', priority: 'Alta' },
        { id: 'TC-002', name: 'Login con contraseña incorrecta', expected: 'Muestra error "Credenciales inválidas"', priority: 'Alta' },
        { id: 'TC-003', name: 'Login con campos vacíos', expected: 'Muestra validación requerida', priority: 'Media' }
    ],
    specific: [
        { id: 'TC-001', name: 'Login exitoso con credenciales válidas', expected: 'Redirige a /dashboard en < 2s<br>Muestra nombre de usuario<br>Cookie de sesión creada', priority: 'Alta' },
        { id: 'TC-002', name: 'Login con contraseña incorrecta (3 intentos)', expected: 'Muestra "Credenciales inválidas"<br>Al tercer intento: bloquea por 30s<br>Log de seguridad generado', priority: 'Alta' },
        { id: 'TC-003', name: 'Login con campos vacíos', expected: 'Validación inline visible<br>aria-invalid="true" en campos<br>Foco en primer campo con error', priority: 'Media' },
        { id: 'TC-004', name: 'Login con SQL injection', expected: 'Input sanitizado<br>Error genérico (no SQL)<br>Evento en security log', priority: 'Alta' },
        { id: 'TC-005', name: 'Login con sesión expirada (edge)', expected: 'Redirect a /login<br>Mensaje "Sesión expirada"<br>No pierde contexto (return URL)', priority: 'Media' },
        { id: 'TC-006', name: 'Login responsive (mobile 375px)', expected: 'Form usable sin scroll horizontal<br>Botón touch-friendly (min 44px)<br>Teclado no oculta inputs', priority: 'Media' }
    ]
};

function initPromptBuilder() {
    var btnGenerate = document.getElementById('pb-generate');
    var btnCopy = document.getElementById('pb-copy');
    var toggleEl = document.getElementById('pb-toggle-specific');

    if (btnGenerate) btnGenerate.addEventListener('click', generatePrompt);
    if (btnCopy) btnCopy.addEventListener('click', copyPrompt);
    if (toggleEl) toggleEl.addEventListener('change', generatePrompt);
}

function generatePrompt() {
    var userStory = (document.getElementById('pb-userstory') || {}).value || 'Como usuario quiero iniciar sesión.';
    var acceptance = (document.getElementById('pb-acceptance') || {}).value || 'Login con email y contraseña.';
    var context = (document.getElementById('pb-context') || {}).value || 'React + Node.js, JWT.';
    var testType = (document.getElementById('pb-testtype') || {}).value || 'E2E';
    var isSpecific = (document.getElementById('pb-toggle-specific') || {}).checked;

    var tpl = isSpecific ? PROMPT_TEMPLATES.specific : PROMPT_TEMPLATES.generic;
    var prompt = tpl.prefix + '\n\n' + tpl.body + tpl.suffix;
    prompt = prompt
        .replace(/\{userStory\}/g, userStory)
        .replace(/\{acceptance\}/g, acceptance)
        .replace(/\{context\}/g, context)
        .replace(/\{testType\}/g, testType);

    var outputArea = document.getElementById('pb-output');
    if (outputArea) outputArea.value = prompt;

    showSampleResults(isSpecific);
}

function showSampleResults(isSpecific) {
    var container = document.getElementById('pb-results');
    if (!container) return;

    var data = isSpecific ? SAMPLE_OUTPUT.specific : SAMPLE_OUTPUT.generic;
    var html = '<table class="demo-results-table"><thead><tr><th>ID</th><th>Nombre</th><th>Resultado Esperado</th><th>Prioridad</th></tr></thead><tbody>';

    data.forEach(function (row) {
        html += '<tr><td>' + row.id + '</td><td>' + row.name + '</td><td>' + row.expected + '</td><td>' + row.priority + '</td></tr>';
    });

    html += '</tbody></table>';
    html += '<p class="text-muted mt-1" style="font-size:0.75rem;">Ejemplo de salida simulada — en producción la IA generaría esto basado en su prompt.</p>';

    container.innerHTML = html;
    container.style.display = 'block';

    var placeholder = document.getElementById('pb-results-placeholder');
    if (placeholder) placeholder.style.display = 'none';
}

function copyPrompt() {
    var outputArea = document.getElementById('pb-output');
    if (!outputArea || !outputArea.value) return;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(outputArea.value).then(function () { showCopyFeedback(); });
    } else {
        outputArea.select();
        document.execCommand('copy');
        showCopyFeedback();
    }
}

function showCopyFeedback() {
    var btn = document.getElementById('pb-copy');
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = 'Copiado';
    setTimeout(function () { btn.textContent = orig; }, 1500);
}

/* ──────────────────────────────────────────────────
   10. DEMO: PERFORMANCE TEST INTERPRETER
   ────────────────────────────────────────────────── */
var PERF_FINDINGS = [
    { title: 'Cuello de botella en CPU', severity: 'high', detail: 'CPU al 89% con solo 100 usuarios indica un proceso bloqueante. Probable causa: queries N+1 o serialización síncrona pesada en el endpoint /checkout. El P99 de 8.9s confirma saturación.' },
    { title: 'Memory leak probable', severity: 'high', detail: 'Memoria en 80% (3.2/4 GB) con carga moderada. En un test de 5 min esto sugiere que no se están liberando objetos correctamente. En producción con carga sostenida, esto termina en OOM.' },
    { title: 'Connection pool agotado', severity: 'high', detail: '347 conexiones rechazadas = el pool de conexiones a DB/servicio externo se agotó. El throughput de 42 req/s (vs 80 esperado) correlaciona directamente: las requests quedan encoladas esperando conexión.' },
    { title: 'Error rate fuera de SLA', severity: 'high', detail: '12.3% error rate vs 1% SLA. Probablemente los errores son timeouts (correlaciona con P99 de 8.9s) y connection refused. Los 12% de errores son síntoma, no causa.' },
    { title: 'Degradación no lineal', severity: 'medium', detail: 'La diferencia entre Avg (1.8s) y P99 (8.9s) es 5x. Esto indica que la degradación no es uniforme — hay un subset de requests que sufren mucho más, probablemente las que caen cuando el pool está lleno.' },
    { title: 'Throughput insuficiente para producción', severity: 'medium', detail: 'Con 42 req/s en 100 usuarios, al escalar a 500 usuarios en un flash sale el sistema colapsaría. Se necesita al menos 2x el throughput objetivo antes de ir a producción.' }
];

var PERF_QA_ACTIONS = [
    'Revisar slow query logs del periodo del test — buscar queries > 1s',
    'Verificar el tamaño del connection pool (HikariCP/PgBouncer) y comparar con max threads',
    'Ejecutar un memory profiling (heap dump) durante otro run para confirmar leak',
    'Correlacionar los 347 connection refused con timestamps de los errores HTTP 5xx',
    'Repetir el test con 50 usuarios para establecer baseline de degradación',
    'Revisar si hay cascading failures — ¿el error de /checkout afecta otros endpoints?',
    'Validar que los datos del test representen el escenario real (think time, ramp-up, datos)',
    'Documentar y priorizar: fix connection pool > fix memory leak > optimizar queries'
];

var PERF_CLIENT_SUMMARY = [
    { icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 15h14L8 1z" stroke="currentColor" stroke-width="1.5"/><path d="M8 6v4M8 12v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', text: 'El proceso de compra tarda entre 2 y 9 segundos en responder. Un usuario normal abandona después de 3 segundos.' },
    { icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', text: '1 de cada 8 intentos de compra falla completamente. Eso significa pérdida directa de ventas.' },
    { icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 4l5 4 4-6 5 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', text: 'El sistema solo puede manejar la mitad del tráfico esperado. En un evento de alto tráfico (Black Friday, lanzamiento), colapsaría.' },
    { icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>', text: 'Recomendación: NO salir a producción con estos números. Se requieren correcciones antes del lanzamiento.' },
    { icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>', text: 'Estimación de fix: 3-5 días de trabajo del equipo de desarrollo para los 3 problemas principales.' }
];

function initPerfInterpreter() {
    var btnAnalyze = document.getElementById('perf-analyze');
    if (btnAnalyze) {
        btnAnalyze.addEventListener('click', analyzePerfResults);
    }
}

function analyzePerfResults() {
    var resultsEl = document.getElementById('perf-results');
    if (!resultsEl) return;

    /* Hide the raw metrics table and the header with the button */
    var metricsEl = document.querySelector('.perf-demo__metrics');
    var headerEl = document.querySelector('.perf-demo__header');
    if (metricsEl) metricsEl.style.display = 'none';
    if (headerEl) headerEl.style.display = 'none';

    resultsEl.style.display = 'grid';

    var findingsEl = document.getElementById('perf-findings');
    if (findingsEl) {
        findingsEl.innerHTML = '<h4 class="perf-demo__section-title"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align: -2px; margin-right: 4px;"><path d="M8 1L1 15h14L8 1z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 6v4M8 12v1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Análisis técnico — 6 hallazgos</h4>';
        PERF_FINDINGS.forEach(function (f) {
            var severityClass = 'severity-badge--' + f.severity;
            var severityLabel = f.severity === 'high' ? 'Crítico' : 'Alerta';
            var item = document.createElement('div');
            item.className = 'change-item';
            item.innerHTML = '<span class="severity-badge ' + severityClass + '">' + severityLabel + '</span>'
                + '<div><span class="change-item__text">' + f.title + '</span>'
                + '<span class="change-item__recommendation">' + f.detail + '</span></div>';
            findingsEl.appendChild(item);
        });
    }

    var clientEl = document.getElementById('perf-client');
    if (clientEl) {
        clientEl.innerHTML = '<h4 class="perf-demo__section-title" style="color: var(--accent-green);"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="vertical-align: -2px; margin-right: 4px;"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 4v5l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Resumen para stakeholders</h4>';
        PERF_CLIENT_SUMMARY.forEach(function (item) {
            var div = document.createElement('div');
            div.className = 'change-item';
            div.innerHTML = '<span style="flex-shrink: 0; color: var(--accent-cyan); display: flex; align-items: center;">' + item.icon + '</span>'
                + '<div><span class="change-item__text">' + item.text + '</span></div>';
            clientEl.appendChild(div);
        });
    }
}

/* ──────────────────────────────────────────────────
   11. INITIALIZATION
   ────────────────────────────────────────────────── */
function init() {
    cacheDom();
    goToSlide(0);

    // Keyboard
    document.addEventListener('keydown', handleKeyDown);

    // Help button
    if (DOM.helpBtn) DOM.helpBtn.addEventListener('click', function () { toggleHelp(); });

    // Help close
    var helpClose = document.getElementById('help-close');
    if (helpClose) helpClose.addEventListener('click', function () { toggleHelp(false); });

    // Overlay background clicks
    if (DOM.overviewOverlay) {
        DOM.overviewOverlay.addEventListener('click', function (e) {
            if (e.target === DOM.overviewOverlay) toggleOverview(false);
        });
    }
    if (DOM.helpOverlay) {
        DOM.helpOverlay.addEventListener('click', function (e) {
            if (e.target === DOM.helpOverlay) toggleHelp(false);
        });
    }

    // Presenter buttons
    var timerToggle = document.getElementById('presenter-timer-toggle');
    var timerReset = document.getElementById('presenter-timer-reset');
    var presClose = document.getElementById('presenter-close');
    var presPrev = document.getElementById('presenter-prev');
    var presNext = document.getElementById('presenter-next');

    if (timerToggle) timerToggle.addEventListener('click', toggleTimer);
    if (timerReset) timerReset.addEventListener('click', resetTimer);
    if (presClose) presClose.addEventListener('click', function () { togglePresenter(false); });
    if (presPrev) presPrev.addEventListener('click', prevSlide);
    if (presNext) presNext.addEventListener('click', nextSlide);

    // Initialize interactive demos
    initPromptBuilder();
    initPerfInterpreter();

    // Touch swipe support
    var touchX = 0;
    var touchY = 0;
    document.addEventListener('touchstart', function (e) {
        touchX = e.changedTouches[0].clientX;
        touchY = e.changedTouches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - touchX;
        var dy = e.changedTouches[0].clientY - touchY;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
            dx < 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });

    updateTimerDisplay();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
