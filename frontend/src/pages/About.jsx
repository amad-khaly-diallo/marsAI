import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen text-white bg-slate-900 from-sky-dark to-sky-light">
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 text-center md:text-left space-y-6">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm">
               À PROPOS DE NOUS            
               </h2>
           
            <p className="text-body text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum esse modi! Assumenda doloribus, nihil est quo optio sit fugiat deleniti quae. Quia ut amet asperiores maxime laboriosam explicabo qui!
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-navy mb-2">NOTRE HISTOIRE & MISSION</h3>
              <p className="text-body">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam ipsam commodi laboriosam veritatis accusamus. Laboriosam dolor reiciendis dicta omnis eligendi accusamus. Ratione odit atque quae suscipit aperiam quibusdam aliquam!
              </p>
            </div>
            <div className="flex justify-center md:justify-start gap-8 pt-4">
              <div>
                <span className="block text-3xl font-bold text-navy">+120</span>
                <span className="text-sm text-body">Événements</span>
              </div>
              <div className="w-px h-12 bg-gray-300"></div> 
              <div>
                <span className="block text-3xl font-bold text-navy">600+</span>
                <span className="text-sm text-body">Films</span>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <span className="block text-3xl font-bold text-navy">+3000</span>
                <span className="text-sm text-body">Passionnés</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default About;  