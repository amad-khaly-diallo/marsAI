import React from 'react';
import avatar from "../assets/images/avatar.jpg";
const juryMembers = [
  {
    id: 1,
    name: "Nordine",
    role: "President du Jury",
    bio: "Réalisateur éminent et leader dans l'utilisation de l'intelligence artificielle au cinéma.",
    image: avatar,
  },
  {
    id: 2,
    name: "ahamd",
    role: "Critique Cinema",
    bio: "Critique principal de magazines de cinéma et analyste technologique.",
    image: avatar
  },
  {
    id: 3,
    name: "mehdi-",
    role: "Expert AI",
    bio: "Chercheur principal en modèles linguistiques et production d'images.",
    image: avatar
  },
  {
    id: 4,
    name: "Sofia Martinez",
    role: "Productrice",
    bio: "Producteur de projets indépendants en Europe.",
    image:avatar
  }
  ,{
    id: 5,
    name: "john doe",
    role: "Producteur",
    bio: "Producteur de projets indépendants en Europe.",
    image: avatar
  }
  ,{
    id: 6,
    name: "jane smith",
    role: "Productrice",
    bio: "Productrice de projets indépendants en Europe.",
    image: avatar
  }
];

const Jury = () => {
  return (
    <div className="w-full bg-slate-950 text-white h-full bg-gradient-to-b from-sky-dark to-sky-light py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-navy mb-4">
            Jury du <span className="text-primary">Festival</span>
          </h1>
          <p className="text-body text-lg max-w-2xl mx-auto">
            Découvrez les experts qui évaluent vos œuvres créatives.
          </p>
         <br></br>
         <br></br>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {juryMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center group cursor-pointer">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-accent shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <span className="mt-3 text-sm font-bold text-navy group-hover:text-primary transition-colors">
                {member.name}
              </span>
            </div>
          ))}
        </div>
        </div>

        {/* Réseau de cartes*/}
        <div className="grid text-black  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {juryMembers.map((member) => (
            <div key={member.id} className="bg-gray-100 border-x-blue-500/80 rounded-2xl p-6 shadow-glass hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 text-center">
              
              <div className="w-24  h-24 mx-auto mb-4 rounded-full p-1 bg-gradient-to-tr from-primary to-accent">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>

              <h3 className="text-xl font-bold text-navy">{member.name}</h3>
              <span className="text-sm font-semibold text-primary uppercase block mb-3">{member.role}</span>
              <p className="text-body text-sm">{member.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Jury;