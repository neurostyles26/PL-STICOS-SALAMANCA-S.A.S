-- 1. Habilitar la extensión para UUIDs
create extension if not exists "uuid-ossp";

-- 2. Crear tabla de categorías
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default now()
);

-- 3. Crear tabla de productos
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references categories(id) on delete cascade not null,
  slug text not null unique,
  name text not null,
  description text not null,
  specifications jsonb not null default '{}'::jsonb,
  images text[] not null default '{}'::text[],
  featured boolean default false not null,
  whatsapp_message text,
  created_at timestamp with time zone default now()
);

-- 4. Crear tabla de banners para el Hero slider
create table if not exists banners (
  id uuid default gen_random_uuid() primary key,
  title text,
  subtitle text,
  image_url text not null,
  link_url text,
  sort_order integer default 0 not null,
  active boolean default true not null,
  created_at timestamp with time zone default now()
);

-- 5. Crear tabla de información empresarial
create table if not exists company_info (
  id uuid default gen_random_uuid() primary key,
  key text not null unique,
  value jsonb not null,
  updated_at timestamp with time zone default now()
);

-- 6. Configurar RLS (Row Level Security)
alter table categories enable row level security;
alter table products enable row level security;
alter table banners enable row level security;
alter table company_info enable row level security;

-- 7. Crear políticas de seguridad
-- Lectura pública para anon y authenticated
create policy "Allow public read access on categories" on categories for select using (true);
create policy "Allow public read access on products" on products for select using (true);
create policy "Allow public read access on banners" on banners for select using (true);
create policy "Allow public read access on company_info" on company_info for select using (true);

-- Escritura solo para usuarios autenticados (Admin)
create policy "Allow admin write access on categories" on categories for all to authenticated using (true) with check (true);
create policy "Allow admin write access on products" on products for all to authenticated using (true) with check (true);
create policy "Allow admin write access on banners" on banners for all to authenticated using (true) with check (true);
create policy "Allow admin write access on company_info" on company_info for all to authenticated using (true) with check (true);

-- 8. Insertar semilla inicial (Categorías)
insert into categories (slug, name, description, image_url) values
('bolsas', 'Bolsas Plásticas', 'Bolsas plásticas de alta resistencia para uso industrial, comercial y doméstico.', 'https://images.unsplash.com/photo-1605600611280-146c68e3b9ef?auto=format&fit=crop&w=800&q=80'),
('invernaderos', 'Plásticos para Invernaderos', 'Películas plásticas coextruidas con aditivos UV para la agricultura de alto rendimiento.', 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'),
('empaques', 'Empaques Flexibles', 'Rollos y bolsas especializadas para empaque de alimentos y productos industriales.', 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80')
on conflict (slug) do nothing;

-- 9. Insertar información de la empresa inicial
insert into company_info (key, value) values
('history', '{"text": "PLÁSTICOS SALAMANCA S.A.S. se fundó con el firme compromiso de proveer soluciones plásticas de alta calidad para el sector agrícola e industrial. A lo largo de los años, nos hemos consolidado como líderes en la fabricación de empaques, bolsas de alta y baja densidad y plásticos técnicos para invernaderos, impulsados por la innovación constante y el compromiso con nuestros clientes.", "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"}'),
('mission', '{"text": "Nuestra misión es desarrollar, fabricar y comercializar soluciones plásticas de alta calidad e innovación para el sector industrial y agrícola, asegurando la durabilidad, eficiencia y satisfacción de nuestros clientes, apoyados en prcocesos sostenibles y un talento humano comprometido."}'),
('vision', '{"text": "Para el 2030, ser reconocidos como el proveedor líder y más confiable de empaques plásticos e invernaderos a nivel nacional, destacándonos por la sostenibilidad ambiental, tecnología de vanguardia y la excelencia en el servicio al cliente."}'),
('values', '{"list": ["Calidad Superior: Excelencia innegociable en cada producto.", "Innovación Tecnológica: Desarrollo de materiales duraderos y eficientes.", "Compromiso Sostenible: Reducción del impacto ambiental en nuestros procesos.", "Servicio al Cliente: Atención personalizada y asesoramiento técnico especializado."]}'),
('contact_details', '{"whatsapp": "+573102003040", "email": "contacto@plasticossalamanca.com", "phone": "(+57) 607 6351234", "address": "Zona Industrial, Bucaramanga, Santander, Colombia", "google_maps_embed": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.0831634568853!2d-73.132644!3d7.116234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDYnNTguNCJOIDczwrAwNyc1Ny41Ilc!5e0!3m2!1ses!2sco!4v1680000000000"}')
on conflict (key) do nothing;

-- 10. Insertar banners iniciales para el Hero
insert into banners (title, subtitle, image_url, link_url, sort_order, active) values
('Bolsas Plásticas de Alta Resistencia', 'Soluciones de empaque duraderas y confiables para el sector industrial y comercial.', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1920&q=80', '/productos?categoria=bolsas', 1, true),
('Plásticos para Invernaderos de Alto Rendimiento', 'Películas de polietileno con protección UV y alta transmisión de luz para optimizar tus cultivos.', 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=1920&q=80', '/productos?categoria=invernaderos', 2, true),
('Empaques Flexibles Especializados', 'Diseño y fabricación a la medida de bolsas y rollos plásticos industriales de primera calidad.', 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&w=1920&q=80', '/productos?categoria=empaques', 3, true)
on conflict do nothing;
