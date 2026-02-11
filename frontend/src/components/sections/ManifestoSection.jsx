import React from "react";
import { InfoRow, LinkButton, Divider } from "../HomeComponents";
import { NAV_ROUTES, HOME_TEXTS } from "../../constants/homeConstants";

export function ManifestoSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="animate-fadeIn">
            <div className="text-xs font-semibold text-white/60">
              {HOME_TEXTS.MANIFESTO_LABEL}
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              {HOME_TEXTS.MANIFESTO_TITLE}{" "}
              <span className="text-white/80">L'intention l'est.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/70 md:text-base">
              {HOME_TEXTS.MANIFESTO_DESC}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to={NAV_ROUTES.ABOUT} variant="secondary">
                À propos
              </LinkButton>
              <LinkButton to={NAV_ROUTES.CONTACT} variant="tertiary">
                Contact →
              </LinkButton>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_60px_rgba(0,0,0,.18)] backdrop-blur-xl animate-fadeIn">
            <div className="text-xs font-semibold text-white/60">En bref</div>
            <div className="mt-4 grid gap-3">
              <InfoRow k="Projections" v="Sélection courte" />
              <InfoRow k="Talks" v="Intervenants & retours" />
              <InfoRow k="Ateliers" v="Workshops" />
              <InfoRow k="Ambiance" v="Éditorial / ciné" />
            </div>

            <Divider />

            <div className="mt-5 text-sm text-white/70">
              Une expérience pensée comme un rendez-vous culturel — pas un
              produit tech.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
