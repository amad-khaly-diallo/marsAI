import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import defaultAvatar from "../assets/images/avatar.jpg";

const Jury = () => {
  const { t } = useTranslation();

  const [juryMembers, setJuryMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const imagesContext = require.context(
    "../assets/images",
    false,
    /\.(png|jpe?g|svg)$/,
  );

  const getAssetImage = (imageName) => {
    if (!imageName) return defaultAvatar;
    try {
      return imagesContext(`./${imageName}`);
    } catch (err) {
      return defaultAvatar;
    }
  };

  useEffect(() => {
    const fetchJury = async () => {
      try {
        const response = await fetch("/api/jury");
        if (!response.ok) throw new Error("Erreur chargement");
        const data = await response.json();
        setJuryMembers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJury();
  }, []);

  const handleAvatarClick = (id) => {
    setSelectedMemberId(id);
    const element = document.getElementById(`jury-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultAvatar;
  };

  if (loading)
    return <div className="text-white text-center py-20">Chargement...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-20">Erreur: {error}</div>
    );

  return (
    <div className="w-full bg-[#070819] text-white h-full bg-gradient-to-b from-sky-dark to-sky-light py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center pt-20 pb-12">
          <h1 className="text-4xl font-extrabold text-navy mb-4">
            {t("jury.title", "Jury du ")}
            <span className="text-primary">
              {t("jury.titleHighlight", "Festival")}
            </span>
          </h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            {t(
              "jury.subtitle",
              "Découvrez les experts qui évaluent vos œuvres créatives.",
            )}
          </p>
          <br />
          <br />

          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {juryMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => handleAvatarClick(member.id)}
                className={`flex flex-col items-center group cursor-pointer transition-all duration-300 ${
                  selectedMemberId === member.id ? "scale-110" : ""
                }`}
              >
                <div
                  className={`w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    selectedMemberId === member.id
                      ? "ring-4 ring-orange-500 ring-offset-2 ring-offset-[#070819]"
                      : ""
                  }`}
                >
                  <img
                    src={getAssetImage(member.photo_url)}
                    alt={`${member.first_name}`}
                    className="w-full h-full rounded-full object-cover border-2 border-white bg-slate-800"
                    onError={handleImageError}
                  />
                </div>
                <span
                  className={`mt-3 text-sm font-bold transition-colors ${
                    selectedMemberId === member.id
                      ? "text-orange-500"
                      : "text-navy group-hover:text-primary"
                  }`}
                >
                  {member.first_name}{" "}
                  {member.last_name !== "-" ? member.last_name : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {juryMembers.map((member) => {
            const isSelected = selectedMemberId === member.id;

            return (
              <div
                key={member.id}
                id={`jury-card-${member.id}`}
                className={`
                  rounded-2xl p-6 transition-all duration-500 transform text-center scroll-mt-32 border-2
                  
                  ${
                    isSelected
                      ? "bg-white border-orange-500 scale-105 z-10 shadow-[0_0_35px_rgba(249,115,22,0.8)]"
                      : "bg-gray-100 border-transparent shadow-glass hover:shadow-glow hover:-translate-y-2"
                  }
                `}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-gradient-to-tr from-primary to-accent">
                  <img
                    src={getAssetImage(member.photo_url)}
                    alt={`${member.first_name}`}
                    className="w-full h-full rounded-full object-cover border-2 border-white bg-slate-800"
                    onError={handleImageError}
                  />
                </div>

                <h3
                  className={`text-xl font-bold ${isSelected ? "text-orange-600" : "text-navy"}`}
                >
                  {member.first_name}{" "}
                  {member.last_name !== "-" ? member.last_name : ""}
                </h3>
                <span className="text-sm font-semibold text-primary uppercase block mb-3">
                  {member.role}
                </span>
                <p className="text-body text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jury;
