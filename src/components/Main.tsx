import React, { useEffect, useState } from "react";
import jsonFile from "../data/data.json";

interface DrugType {
  Numb: number;
  "DENOMINATION COMMUNE INTERNATIONALE": string;
  "NOM DE MARQUE": string;
  FORME?: string;
  DOSAGE?: string | number;
  COND?: string;
  LISTE?: string;
  "LABORATOIRES DETENTEUR DE LA DECISION D'ENREGISTREMENT"?: string;
  "PAYS DU LABORATOIRE DETENTEUR DE LA DECISION D'ENREGISTREMENT"?: string;
  TYPE?: string | number;
  "DUREE DE STABILITE"?: string;
}

const Main = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DrugType[]>([]);
  const [searchType, setSearchType] = useState(
    "DENOMINATION COMMUNE INTERNATIONALE",
  );

  const handleChangeSearchType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(e.target.value);
  };

  useEffect(() => {
    const list = jsonFile["nomenclature 28 fevrier 2023"];
    const result = list.filter((el: DrugType) => {
      const value = el[searchType as keyof DrugType];
      if (typeof value === "string") {
        return value.toLowerCase().includes(query.toLowerCase());
      } else if (typeof value === "number") {
        return value.toString().toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
    setResult(result);
  }, [query, searchType]);

  return (
    <main className="space-y-4 bg-[#f8fef3] px-4 py-3 pb-8">
      <div>
        <p className="font-semibold text-yellow-700">
          <span className="mr-2">Dernière mise à jour:</span>13 Juin 2024
        </p>
        <p className="font-semibold text-green-600">
          <span className="mr-2">Status:</span>à jour
        </p>
      </div>
      <div className="flex flex-col gap-4 md:max-w-screen-md">
        <input
          type="search"
          placeholder="Recherche"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded border px-4 py-2 shadow"
        />
        <div className="flex flex-wrap items-center gap-4">
          <div className="space-x-2">
            <input
              type="radio"
              id="DN"
              value="NOM DE MARQUE"
              name="searchType"
              checked={searchType === "NOM DE MARQUE"}
              onChange={handleChangeSearchType}
            />
            <label htmlFor="DN">Nom commercial</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              id="DCI"
              value="DENOMINATION COMMUNE INTERNATIONALE"
              name="searchType"
              checked={searchType === "DENOMINATION COMMUNE INTERNATIONALE"}
              onChange={handleChangeSearchType}
            />
            <label htmlFor="DCI">DCI</label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              id="labo"
              value="LABORATOIRES DETENTEUR DE LA DECISION D'ENREGISTREMENT"
              name="searchType"
              checked={
                searchType ===
                "LABORATOIRES DETENTEUR DE LA DECISION D'ENREGISTREMENT"
              }
              onChange={handleChangeSearchType}
            />
            <label htmlFor="labo">Laboratoire</label>
          </div>
        </div>
      </div>
      <p className="font-semibold text-yellow-700">
        Résultats: {result.length}
      </p>
      <div className="h-[600px] overflow-scroll">
        <table className="w-full table-auto border-collapse border border-slate-400 bg-slate-50">
          <caption className="mb-4 caption-top text-xl font-bold text-slate-400">
            Liste complète des médicaments en Algérie
          </caption>
          <thead className="bg-slate-200">
            <tr>
              <th className="border border-slate-300 p-2">Nom commercial</th>
              <th className="border border-slate-300 p-2">DCI</th>
              <th className="border border-slate-300 p-2">Dosage</th>
              <th className="border border-slate-300 p-2">Forme</th>
              <th className="border border-slate-300 p-2">Conditionnement</th>
              <th className="border border-slate-300 p-2">Laboratoire</th>
              <th className="border border-slate-300 p-2">Pays du Labo</th>
              <th className="border border-slate-300 p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((el: DrugType, index: number) => (
                <tr key={index} className="even:bg-slate-100">
                  <td className="border border-slate-300 p-2">
                    {el["NOM DE MARQUE"]}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {el["DENOMINATION COMMUNE INTERNATIONALE"]}
                  </td>
                  <td className="border border-slate-300 p-2">
                    {el["DOSAGE"]}
                  </td>
                  <td className="border border-slate-300 p-2">{el["FORME"]}</td>
                  <td className="border border-slate-300 p-2">{el["COND"]}</td>
                  <td className="border border-slate-300 p-2">
                    {
                      el[
                        "LABORATOIRES DETENTEUR DE LA DECISION D'ENREGISTREMENT"
                      ]
                    }
                  </td>
                  <td className="border border-slate-300 p-2">
                    {
                      el[
                        "PAYS DU LABORATOIRE DETENTEUR DE LA DECISION D'ENREGISTREMENT"
                      ]
                    }
                  </td>
                  <td className="border border-slate-300 p-2">{el["TYPE"]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-2">
                  Votre recherche n'a donné aucun résultat. Veuillez vérifier
                  que vous avez correctement saisi le nom du médicament
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Main;
