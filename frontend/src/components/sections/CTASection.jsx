import React from "react";
import { LinkButton } from "./HomeComponents";
import { NAV_ROUTES, HOME_TEXTS } from "../../constants/homeConstants";

export function CTASection() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur animate-fadeIn">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <div className="text-xl font-extrabold">
                {HOME_TEXTS.CTA_TITLE}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {HOME_TEXTS.CTA_SUBTITLE}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              <LinkButton to={NAV_ROUTES.PROGRAM} variant="primary">
                Voir la programmation
              </LinkButton>
              <LinkButton to={NAV_ROUTES.LOGIN} variant="secondary">
                Connexion
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
