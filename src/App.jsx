import React, { useEffect, useState } from "react";
import "./styles.css";

const taxonStyle = {
  Poisson: { couleur1: "#5EC8E5", couleur2: "#2A72A8" },
  Mollusque: { couleur1: "#9EE6CF", couleur2: "#2D9C83" },
  Crustacé: { couleur1: "#FFD0B0", couleur2: "#E25B3A" },
  Echinoderme: { couleur1: "#E6D4F1", couleur2: "#A27DB9" },
  Cnidaire: { couleur1: "#FFF8C9", couleur2: "#F3D86B" },
  Vers: { couleur1: "#F2C6A0", couleur2: "#C2847A" },
  Algues: { couleur1: "#CDE8B3", couleur2: "#6CA96E" },
  Bryozoaire: { couleur1: "#E9D8A6", couleur2: "#7D9A5C" },
  Tunicier: { couleur1: "#C1D4E8", couleur2: "#627E9B" },
  Cténaire: { couleur1: "#D6F1FF", couleur2: "#83C5E1" },
  Spongiaire: { couleur1: "#F6E6C7", couleur2: "#D1A36F" }
};

export default function App() {
  const [data, setData] = useState([]);
  const [selectedTaxon, setSelectedTaxon] = useState(null); // 🔹 Taxon filtré
  const [selected, setSelected] = useState(null); // 🔹 Espèce dans la modale

  useEffect(() => {
    fetch("/data/especes.json")
      .then((res) => res.json())
      .then((jsonData) => {
        console.log("JSON chargé :", jsonData);
        setData(jsonData);
      })
      .catch((err) => console.error("Erreur lors du chargement du JSON :", err));
  }, []);

  // 🔹 Extraction des taxons uniques (pour les icônes)
  const taxonsUniques = Array.from(
    new Set(data.map((item) => item.Taxon))
  ).sort();

  // 🔹 Application du filtre
  const dataFiltree = selectedTaxon
    ? data.filter((item) => item.Taxon === selectedTaxon)
    : data;

  return (
    <div className="app">
      <h1>Hurghada 2025</h1>

      {/* --- SECTION FILTRES PAR TAXON --- */}
      <div className="taxon-filter">
        <div className="filter-icons">
          <div
            className={`filter-icon ${selectedTaxon === null ? "active" : ""}`}
            onClick={() => setSelectedTaxon(null)}
          >
            🌊
            <p>Tous</p>
          </div>

          {taxonsUniques.map((taxon) => {
            const item = data.find((d) => d.Taxon === taxon);
            if (!item) return null;
            return (
              <div
                key={taxon}
                className={`filter-icon ${
                  selectedTaxon === taxon ? "active" : ""
                }`}
                onClick={() => setSelectedTaxon(taxon)}
              >
                <img
		 style={{ borderRadius: "50%", width: "50px", height: "50px", border: "1px solid #0b6e8a", padding:"2px",   boxShadow: "0 2px 6px rgba(0,0,0,0.2)"}}

                  src={`Signes/${item.signe}.png`}
                  alt={taxon}
                  className="filter-image"
                />
                <p>{taxon}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- LISTE DES FICHES --- */}
      <div className="cards">
        {dataFiltree.map((row, i) => {
          const style = taxonStyle[row.Taxon] || taxonStyle["Poisson"];
          return (
            <div className="card" key={i} onClick={() => setSelected(row)}>
              <div
                className="header"
                style={{
                  background: `linear-gradient(45deg, ${style.couleur1}, ${style.couleur2})`
                }}
              >
                <div className="header-text">
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <h2>{row.Nom}</h2>
                      <div className="latin-line">
                        <span className="latin">{row.Taxon}</span> –{" "}
                        <span className="taxon">{row["Sous-taxon"]}</span>
                      </div>
                    </div>
                    <img
			style={{ borderRadius: "50%", width: "50px", height: "50px", border: `2px solid ${style.couleur1}`, padding:"1px",  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",   background: "white"}}

                      src={`Signes/${row.signe}.png`}
                      alt={row.Nom}
                    />
                  </div>
                </div>
              </div>
              <img src={`photos/${row.photo}`} alt={row.Nom} className="photo" />
            </div>

          );
        })}
      </div>

 {/* 🔹 MODALE DETAIL */}
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // empêche la fermeture au clic intérieur
          >
            <button className="close-btn" onClick={() => setSelected(null)}>
              ✖
            </button>

            <div style={{ display: "flex" }}>
                    <img
                      style={{ borderRadius: "50%", width: "50px", height: "50px", marginRight:"30px", border: "1px solid #0b6e8a", padding:"2px",   boxShadow: "0 2px 6px rgba(0,0,0,0.2)"}}
                      src={`Signes/${selected.signe}.png`}
                      alt={selected.Nom}
                    />
                    <div>
                      <h2 style={{margin:"0"}}>{selected.Nom}</h2>
                      <div className="latin-line">
                        <span className="latin">{selected.Taxon}</span> –{" "}
                        <span className="taxon">{selected["Sous-taxon"]}</span>
                      </div>
                    </div>
                  </div>

		<div style={{width:"350px", margin:"auto"}}>
            <img
              src={`photos/${selected.photo}`}
              alt={selected.Nom}
              className="modal-photo"
            />
		</div>

            <div className="modal-info">
              {selected.habitat && (
                <p>
                  <strong>Habitat :</strong> {selected.habitat}
                </p>
              )}
              {selected.regime && (
                <p>
                  <strong>Régime :</strong> {selected.regime}
                </p>
              )}
              {selected.taille && (
                <p>
                  <strong>Taille :</strong> {selected.taille}
                </p>
              )}
              {selected.association && (
                <p>
                  <strong>Association :</strong> {selected.association}
                </p>
              )}
              {selected.Text && (
                <p>
                  <strong>Description :</strong> {selected.Text}
                </p>
              )}
              {selected.Doris && (
                <p>
                  <a href={selected.Doris} target="_blank" rel="noopener noreferrer">
                    Fiche DORIS 🔗
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
   