import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import BentoStepCard, { BentoStepCardProps } from "@/components/ui/BentoStepCard";
import BentoCtaCard from "@/components/ui/BentoCtaCard";

const STEPS_TOP: BentoStepCardProps[] = [
  {
    stepNumber: "01",
    title: "Registrarte en la app",
    description:
      "Únete a nuestra comunidad exclusiva para comenzar a planificar con herramientas profesionales.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEvbT8bXV9kDsBvouH5FgK3k_x4vEqLvkLWkh5y-LuJx4oKJNpvXpTGog2GQtVadr0HVerVbxzO0hTmpdPIFIMZxTwPR_I65ip1NQxWB7GPHTIvyKDMlbNpslisbOg3ozZ-AKaIs7BVSo3RE0aABoD6x1m033pLM9w_puE8V4qlfE8rbB5YekMpVllAuFesPHNMffrfMQ8PgclM0zqq5yT77Ilo8iYhoXdUjz2g-nRf2XiyEzGRCT1lpWoiYdZ0lS6cCQWnPX3D8w",
    imageAlt: "Registrarse",
  },
  {
    stepNumber: "02",
    title: "Selecciona tu Evento",
    description:
      "Personaliza cada detalle según el tipo de celebración, desde bodas hasta galas privadas.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfuqYo7h6xq_2E6r3-4ztjYUK2UpHxrbEFBjnLk9bGXJEBP1y20W6cm5qvReVP2Z3mvzkgEIKpflWkekwVrVK8TNpO_Et62wC_SWt3KslmDqxFMHPbtMSNEf6YkYin46WC_SNJuS8jctx0f6OQWT8bVyvqPqffVp0CIueWa2QCXgsX6Wz1MOU6V100dagZAv8SfSAjuL3lTmU5g_N0G2EzNd9Fkb-wwm8OQ3jTTXmn4H75eXQj7MCvYSs4wrbG-4HGFu-G0H_uICE",
    imageAlt: "Tipo de evento",
  },
  {
    stepNumber: "03",
    title: "Personaliza tu Web",
    description:
      "Crea un espacio digital único que refleje la esencia y el tono de tu gran día.",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1nnjEJUVyGQkrP9giDF44aqZ6RjXLlu_OnoqykdyVC82n8TVYXnvVHH5T2hq9Y_J2GUnkaIt-WA0jhBxXx1Nt5-TTFvtAZNIFomjY9hK_k1x2XgJOAOkvSbtWoxHv4-nbDiF5hgQGWmZrSQ9ZHLTzIJ7rixxoVkktgbEfBcoKfDPyTPs4qFaqDFiasEvTfHBl00OXQP0H1Qqko_xJgVqIPuUG7aXuEwBnndCiWEtYOmwTmuntKcYM2XjYcJoIdz__Fabfm56TDEI",
    imageAlt: "Configuración",
  },
];

const STEP_04: BentoStepCardProps = {
  stepNumber: "04",
  title: "Gestiona tu Lista",
  description:
    "Mesa de regalos integrada con las marcas más exclusivas del mundo.",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCpqdoOtXaYUlioFgCyb-0276YC85XhUgQUr55C4RZQwpDRzw-ReOxBUQto0N8ublNOOkVIsYlXqTXZO_ssk33wd9A7RAPpsC8ldtMhecIHjhS-O-d4df0kIjxdkvuLvf2mW2miazcA53BONUKBNCZk4BHngeLGuckz7MmZIhJT6eImnM6O5BeZL42z8r9XvxOMIEG7REJ-EEmc3mrCo_4M1QzLtg1HzE3nqJviEsdyyN1G-Aqtfd1uOqAkUzlSKulzR9JQ5ET6_UM",
  imageAlt: "Mesa de regalos",
};

const STEP_05: BentoStepCardProps = {
  stepNumber: "05",
  title: "Envía Invitaciones",
  description:
    "Comparte la experiencia digital con tus invitados de forma instantánea y elegante.",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvnPDQUktBPuNEQtnMQ3OTI1IGU-8-DwEz9258cJI0BT3B6YEAccvXa6CNXlbmyHCGZzpRwIk0Yei9ZEo9rK-1zzYOtSGRW3BYVv235UTFX0iGqN8B-Pfq5ZBTPzU3Vwud6os5OPvFHziCvHy8oLn6ZHEL2KzgQOQnMOLnWMm9NX1A0EsW_PoyronYwhRtjAAm5XAnytcVvixa4wLw9DAwMviYHY3vYDhfT9LsTdrnbD1RKexyy0mwkSUptPEnnm3fILUtanJdOvw",
  imageAlt: "Compartir",
};

const STEP_06: BentoStepCardProps = {
  stepNumber: "06",
  title: "Disfruta tu evento",
  description:
    "Nuestra curaduría se encarga de que cada segundo sea una memoria inolvidable.",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDGCr50uvSz_C88FoJg6NP0wUU9TCxYAbShb3iYUJdstjBcKqt7KVEYmumPfMK4Zas-Q993QVgqmjGqKBBprJ9D-buVSX5-T4rpkXYo6xOkmqUsEdIPKYyvzi5RuaHxy_9Kx0NNNhpIVI1SFG91DcPIMgvxq4TmGwunakRp24_7lh5K1hgo4d6uBHDGCaoViNbuPSFjxNyhnXvUnv_D9MDnxH8GF1UxgzhktA2zMW9Exver4nRRgMjZMs_zWSf4ECgsEPJf75B-uHk",
  imageAlt: "Disfrutar",
  fullWidth: true,
};

export default function HowToCreateSection() {
  return (
    <section
      className="py-24 md:py-[7.5rem] bg-surface relative border-b hairline-border"
      id="como-crear-evento"
    >
      <div className="px-8 sm:px-12 md:px-16 lg:px-20">
        <SectionHeader eyebrow="Guía de Inicio" title="Cómo crear tu evento" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pasos 01, 02, 03 */}
          {STEPS_TOP.map((step) => (
            <BentoStepCard key={step.stepNumber} {...step} />
          ))}

          {/* Paso 04 */}
          <BentoStepCard {...STEP_04} />

          {/* CTA Central */}
          <BentoCtaCard
            eyebrow="Comienza el viaje"
            title="Crear evento"
            href="/crear-evento"
          />

          {/* Paso 05 */}
          <BentoStepCard {...STEP_05} />

          {/* Paso 06 (Full Width) */}
          <BentoStepCard {...STEP_06} />
        </div>
      </div>
    </section>
  );
}
