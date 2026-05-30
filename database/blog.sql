-- 1. Crear tabla de entradas de blog (posts)
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  category text default 'General' not null,
  author text default 'Plásticos Salamanca' not null,
  published boolean default true not null,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- 2. Configurar RLS (Row Level Security)
alter table posts enable row level security;

-- 3. Crear políticas de seguridad
-- Lectura pública para cualquier usuario
create policy "Allow public read access on posts" on posts for select using (true);

-- Escritura completa (INSERT, UPDATE, DELETE) solo para administradores autenticados
create policy "Allow admin write access on posts" on posts for all to authenticated using (true) with check (true);

-- 4. Insertar artículos semilla iniciales de alto impacto profesional
insert into posts (slug, title, excerpt, content, image_url, category, author, published) values
(
  'maximizando-rendimiento-cultivos-plasticos-invernadero',
  'Maximizando el rendimiento de tus cultivos con plásticos para invernadero de alta tecnología',
  'Descubre cómo la elección correcta de películas de polietileno con aditivos UV e infrarrojos puede transformar la productividad, proteger tus cultivos y optimizar la temperatura de tu invernadero.',
  '<h3>La Importancia de una Cubierta Plástica Inteligente</h3>\n<p>En la agricultura moderna de alto rendimiento, el invernadero ya no es simplemente una estructura física para cubrir plantas; se ha convertido en un ecosistema microclimático de alta precisión. La cubierta de polietileno actúa como la principal barrera protectora frente a los elementos exteriores y, a la vez, como el regulador térmico y de luz más crucial para el desarrollo vegetativo.</p>\n\n<h3>Factores Claves para Elegir el Plástico Correcto</h3>\n<p>Elegir el material óptimo depende de comprender las necesidades específicas de la zona geográfica y el tipo de cultivo. Aquí se detallan los tres aditivos de mayor relevancia tecnológica:</p>\n<ul>\n  <li><strong>Protección contra la Radiación UV:</strong> El sol emite rayos ultravioleta que degradan rápidamente el plástico convencional. Las películas con aditivos estabilizadores UV garantizan una duración de hasta 2 a 3 años expuestos a la intemperie sin perder elasticidad ni transparencia.</li>\n  <li><strong>Termicidad (Control de Infrarrojos):</strong> Durante el día, el invernadero acumula calor. Durante la noche, este calor tiende a escapar en forma de radiación infrarroja de onda larga. Los plásticos térmicos actúan como una manta que retiene esta energía, evitando caídas drásticas de temperatura y previniendo heladas severas.</li>\n  <li><strong>Difusión de Luz Eficiente:</strong> La luz solar directa puede quemar las hojas superiores de las plantas mientras que las hojas inferiores permanecen en la sombra. Un plástico con difusión de luz distribuye los rayos solares en múltiples direcciones, iluminando homogéneamente todo el follaje y estimulando una fotosíntesis equilibrada.</li>\n</ul>\n\n<div class="my-8 bg-brand-green-50/50 border-l-4 border-brand-green-500 p-6 rounded-r-2xl">\n  <h4 class="font-title font-bold text-brand-dark-800 text-base mb-2">Consejo Técnico de Expertos</h4>\n  <p class="text-sm text-slate-700 leading-relaxed">Para climas fríos con noches extremas, prioriza siempre plásticos de invernadero térmicos con una barrera IR superior al 75%. Esto puede representar una diferencia de hasta 4°C en comparación con el exterior, reduciendo significativamente la necesidad de calefacción artificial.</p>\n</div>\n\n<h3>Conclusión: Una Inversión Altamente Rentable</h3>\n<p>Al seleccionar películas coextruidas multicapa desarrolladas con tecnología avanzada, no estás adquiriendo un insumo de paso, sino realizando una inversión estratégica que se amortiza rápidamente mediante la reducción del uso de pesticidas, una cosecha más temprana y frutos con estándares de calidad aptos para exportación comercial.</p>',
  'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1200&q=80',
  'Agricultura',
  'Ingeniería de Plásticos Salamanca',
  true
),
(
  'guia-empaques-flexibles-industriales-sostenibilidad',
  'Guía de empaques flexibles industriales: Resistencia, protección y compromiso ambiental',
  'Conoce las ventajas de los empaques coextruidos de polietileno de alta y baja densidad para optimizar la logística de tu negocio reduciendo la huella de carbono mediante materiales reciclables.',
  '<h3>El Rol Crítico de los Empaques en la Cadena Logística</h3>\n<p>En el transporte y almacenamiento de productos industriales y comerciales, un empaque defectuoso no solo representa pérdidas materiales y financieras, sino que también afecta directamente la reputación de la marca ante sus distribuidores finales. Los empaques flexibles a base de polietileno (PE) ofrecen la perfecta conjunción entre peso mínimo y resistencia estructural insuperable.</p>\n\n<h3>Tipos de Materiales y Aplicaciones Clave</h3>\n<p>Dependiendo del producto a proteger, la industria demanda configuraciones específicas de densidad polimérica:</p>\n<ul>\n  <li><strong>Polietileno de Alta Densidad (HDPE):</strong> Caracterizado por su rigidez, opacidad y excelente resistencia al rasgado y tracción. Es ideal para bolsas tipo camiseta comercial, empaques industriales de carga pesada y revestimientos protectores.</li>\n  <li><strong>Polietileno de Baja Densidad (LDPE):</strong> Destaca por su flexibilidad extraordinaria, brillo superior y transparencia. Es perfecto para películas de envoltura elástica (stretch film), bolsas para congelación y empaques de alimentos procesados.</li>\n</ul>\n\n<div class="my-8 bg-brand-orange-50/50 border-l-4 border-brand-orange-500 p-6 rounded-r-2xl">\n  <h4 class="font-title font-bold text-brand-dark-800 text-base mb-2">Compromiso de Sostenibilidad Circular</h4>\n  <p class="text-sm text-slate-700 leading-relaxed">El polietileno es un material 100% reciclable. Al optimizar los espesores (calibres) de fabricación mediante tecnologías de coextrusión multicapa, es posible reducir hasta un 25% el uso de materia prima virgen sin restar ni un solo gramo de resistencia a la carga.</p>\n</div>\n\n<h3>¿Cómo elegir el Calibre y Dimensiones Adecuadas?</h3>\n<p>No existe una solución única. La mejor recomendación es trabajar de la mano con asesores técnicos expertos que evalúen:</p>\n<ol>\n  <li>El peso neto del producto terminado.</li>\n  <li>El método de transporte y las condiciones de almacenamiento (humedad, exposición solar).</li>\n  <li>La necesidad de sellado hermético o impresión flexográfica personalizada para branding.</li>\n</ol>\n\n<p>Optimizar el empaque industrial no solo asegura tus mercancías, sino que proyecta a tu organización como una empresa moderna alineada con la responsabilidad ecológica mundial.</p>',
  'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=1200&q=80',
  'Industria',
  'Redacción Técnica Plásticos Salamanca',
  true
)
on conflict (slug) do nothing;
