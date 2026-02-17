import React from "react";
import { LinkButton } from "./HomeComponents";
import { NAV_ROUTES } from "../../constants/homeConstants";
import { useTranslation } from "react-i18next";
import { heroAnimationStyles } from "../sections/heroAnimations";

export function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="px-6 pb-20">
      <style>{heroAnimationStyles}</style>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur animate-fadeIn">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <div className="text-xl font-extrabold">
                {t("home.cta.title")}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {t("home.cta.subtitle")}
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
