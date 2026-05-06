const WA_NUMBER = "524422709543";
const WA_MSG = encodeURIComponent(
  "Hola, me interesa conocer más sobre sus servicios.",
);

export default function WhatsAppButton() {
  return (
    <>
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label="Escríbenos por WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.856L.054 23.203a.75.75 0 00.916.939l5.453-1.63A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 01-5.197-1.455l-.368-.22-3.237.967.93-3.147-.24-.384A10 10 0 0112 2c5.514 0 10 4.486 10 10s-4.486 10-10 10z" />
        </svg>
        <span className="wa-tooltip">Escríbenos por WhatsApp</span>
      </a>

      <style>{`
        .wa-fab {
          position: fixed;
          bottom: 24px;
          left: 24px;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #25d366, #128c7e);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          box-shadow: 0 6px 24px rgba(37,211,102,0.45), 0 2px 8px rgba(0,0,0,0.25);
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
          animation: waFloat 3.4s 1.7s ease-in-out infinite;
        }

        .wa-fab::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 2px solid rgba(37,211,102,0.45);
          animation: waPing 2.8s ease-out infinite;
        }

        .wa-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 10px 32px rgba(37,211,102,0.6), 0 4px 12px rgba(0,0,0,0.3);
        }

        .wa-fab:hover .wa-tooltip {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }

        .wa-tooltip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateX(-8px) translateY(-50%);
          white-space: nowrap;
          background: rgba(18,140,126,0.95);
          color: #fff;
          font-family: "Outfit", sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          padding: 0.4rem 0.85rem;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }

        .wa-tooltip::before {
          content: "";
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
          border-right-color: rgba(18,140,126,0.95);
        }

        @keyframes waPing {
          0%   { opacity: 0.7; transform: scale(1); }
          70%  { opacity: 0;   transform: scale(1.35); }
          100% { opacity: 0;   transform: scale(1.35); }
        }
        @keyframes waFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-9px); }
        }
      `}</style>
    </>
  );
}
