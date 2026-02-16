import React from "react";
import { LinkButton, ProgramCard } from "./HomeComponents";
import { NAV_ROUTES } from "../../constants/homeConstants";

export function ProgramSection() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold text-white/60">Programme</div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
              Projections • Talks • Ateliers
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
              Une structure simple : regarder, comprendre, expérimenter.
            </p>
          </div>
          <LinkButton
            to={NAV_ROUTES.PROGRAM}
            variant="secondary"
            className="hidden md:inline-flex"
          >
            Voir le programme →
          </LinkButton>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProgramCard
            title="Projections"
            description="Courts au format 1 minute. Un rythme, une idée, une tenue visuelle."
          />
          <ProgramCard
            title="Talks"
            description="Créateurs, producteurs, retours d'expérience et discussions."
          />
          <ProgramCard
            title="Ateliers"
            description="Expérimentation : écriture, montage, direction artistique."
          />
        </div>
      </div>
    </section>
  );
}
