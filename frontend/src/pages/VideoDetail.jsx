import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function VideoDetail() {
  const { id } = useParams(); 
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '60px',
      backgroundColor: '#000',
      color: '#fff',
      padding: '80px 10%',
      alignItems: 'center',
      minHeight: '70vh',
    }}>
      <style>
        {`

.top-link {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.75rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 35px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.top-link::before {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  background: #3b82f6;
}

.top-link:hover {
  opacity: 0.7;
  transform: translateX(-4px);
}


        .marsai-title {
  font-family: 'Inter', sans-serif;
  font-size: 3.5rem;   /* plus cohérent */
  font-weight: 800;    /* un peu moins lourd */
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 25px;
}
          .white-text {
            color: #FFFFFF;
          }

          .gradient-eo {
            /* Dégradé MarsAI : Violet Indigo -> Rose Flash -> Orange */
            background: linear-gradient(to right, #6366f1, #d946ef, #fb7185);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
          }

          .subtitle {
            color: #FFFFFF;
            font-size: 1.15rem;
            font-weight: 600;
            margin-bottom: 12px;
            opacity: 0.9;
          }

          .description {
            color: #9ca3af;
            font-size: 1.05rem;
            line-height: 1.6;
            margin-bottom: 40px;
            max-width: 500px;
          }

      .vote-btn {
  padding: 8px 24px;
  background: linear-gradient(90deg, #8b5cf6 0%, #d946ef 50%, #f43f5e 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  width: fit-content;
  transition: transform 0.2s ease, opacity 0.2s ease;
  box-shadow: 0 4px 15px rgba(217, 70, 239, 0.3);
}

.vote-btn:hover {
  transform: scale(1.05);
  opacity: 0.9;
}











        `}
      </style>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* VID en blanc, ÉO en dégradé, #ID en blanc */}
<Link to="/" className="top-link">
  Retour aux films
</Link>

        <h1 className="marsai-title">
          <span className="white-text">VID</span>
          <span className="gradient-eo">ÉO</span>
          <span className="white-text"> #{id}</span>
        </h1>

        <h2 className="subtitle">Description sur la vidéo</h2>
        <p className="description">
          L'intention artistique est mise en avant pour ce court-métrage généré par IA, 
          conçu spécialement pour l'immersion MarsAI à Marseille.
        </p>

        <button className="vote-btn">VOTE</button>
      </div>

      <div style={{ flex: 1.8 }}>
        <div style={{
          width: '100%',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)', /* Lueur violette légère */
          overflow: 'hidden',
          border: '1px solid #262626'
        }}>
          <video key={id} controls width="100%" style={{ display: 'block' }}>
            <source src={`/videos/${id}.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}