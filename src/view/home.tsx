import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";

type Erreurs = {
  nom?: string;
  email?: string;
  motDePasse?: string;
  confirmerMotDePasse?: string;
};

export default function Home() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");

  const [voirMotDePasse, setVoirMotDePasse] = useState(false);
  const [voirConfirmer, setVoirConfirmer] = useState(false);

  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [succes, setSucces] = useState("");

  const validerFormulaire = (): boolean => {
    const nouvellesErreurs: Erreurs = {};

    if (!nom) nouvellesErreurs.nom = "Veuillez remplir ce champ";
    if (!email) nouvellesErreurs.email = "Veuillez remplir ce champ";
    if (!motDePasse) nouvellesErreurs.motDePasse = "Veuillez remplir ce champ";
    if (!confirmerMotDePasse)
      nouvellesErreurs.confirmerMotDePasse = "Veuillez remplir ce champ";

    if (motDePasse && confirmerMotDePasse && motDePasse !== confirmerMotDePasse) {
      nouvellesErreurs.confirmerMotDePasse =
        "Les mots de passe ne correspondent pas";
    }

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSucces("");

    if (validerFormulaire()) {
      setSucces("Votre formulaire a été envoyé avec succès ");
      handleAnnuler();
    }
  };

  const handleAnnuler = () => {
    setNom("");
    setEmail("");
    setMotDePasse("");
    setConfirmerMotDePasse("");
    setErreurs({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12 bg-gray-200 p-8 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Inscription
      </h2>

      {succes && (
        <p className="bg-green-100 text-green-700 p-3 rounded text-center">
          {succes}
        </p>
      )}

      <div>
        <Input label="Nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Votre nom"/>
        {erreurs.nom && <p className="text-red-500 text-sm">{erreurs.nom}</p>}
      </div>

      <div>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com"/>
        {erreurs.email && (
          <p className="text-red-500 text-sm">{erreurs.email}</p>
        )}
      </div>

      <div>
        <Input label="Mot de passe" type={voirMotDePasse ? "text" : "password"} value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)}
         placeholder="********" showToggle toggleState={voirMotDePasse} onToggle={() => setVoirMotDePasse(!voirMotDePasse)}/>
        {erreurs.motDePasse && (
          <p className="text-red-500 text-sm">{erreurs.motDePasse}</p>
        )}
      </div>

      <div>
        <Input label="Confirmer le mot de passe" type={voirConfirmer ? "text" : "password"} value={confirmerMotDePasse}
          onChange={(e) => setConfirmerMotDePasse(e.target.value)} placeholder="********" showToggle toggleState={voirConfirmer} onToggle={() => setVoirConfirmer(!voirConfirmer)} />
           {erreurs.confirmerMotDePasse && (
              <p className="text-red-500 text-sm"> {erreurs.confirmerMotDePasse}</p>
             )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button onClick={handleAnnuler} variant="danger">
          Annuler
        </Button>
        <Button type="submit" variant="primary">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
