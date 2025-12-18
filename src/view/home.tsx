import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/button";
import Input from "../components/input";
import { signupSchema } from "../view/signup.schema";
type SignupFormData = {
  nom: string;
  email: string;
  motDePasse: string;
  confirmerMotDePasse: string;
};

export default function Home() {
  const [voirPassword, setVoirPassword] = useState(false);
  const [voirConfirm, setVoirConfirm] = useState(false);
  const [succes, setSucces] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    reset();
    setVoirPassword(false);
    setVoirConfirm(false);
    setSucces("Inscription réussie !");
    setTimeout(() => setSucces(""), 3000);
  };

  const handleReset = () => {
    reset();
    setSucces("");
    setVoirPassword(false);
    setVoirConfirm(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="bg-blue-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
        </div>

        <div className="p-6">
          {succes && (
            <div className="mb-4 bg-green-100 border border-green-300 rounded-lg p-3 text-center">
              <p className="text-green-700 font-medium">{succes}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
              <Input label="Nom complet" placeholder="Votre nom" {...register("nom")} />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
            </div>

            <div>
              <Input label="Email" type="email" placeholder="email@domaine.com" {...register("email")} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-1">Critères :</p>
              <div className="text-xs text-blue-600">
                <p>• 8 caractères min</p>
                <p>• Majuscule, minuscule, chiffre, caractère spécial</p>
              </div>
            </div>

            <div>
              <Input label="Mot de passe" type={voirPassword ? "text" : "password"} placeholder="Votre mot de passe"
                showToggle toggleState={voirPassword} onToggle={() => setVoirPassword(!voirPassword)} {...register("motDePasse")}
              />
              {errors.motDePasse && <p className="text-red-500 text-sm mt-1">{errors.motDePasse.message}</p>}
            </div>

            <div>
              <Input label="Confirmation" type={voirConfirm ? "text" : "password"} placeholder="Retapez le mot de passe"
                showToggle toggleState={voirConfirm} onToggle={() => setVoirConfirm(!voirConfirm)} {...register("confirmerMotDePasse")}
              />
              {errors.confirmerMotDePasse && <p className="text-red-500 text-sm mt-1">{errors.confirmerMotDePasse.message}</p>}
            </div>

            <div className="pt-4">
              <div className="flex justify-center gap-3">
                <Button type="button" variant="danger" onClick={handleReset}>Annuler</Button>
                <Button type="submit" variant="primary" >S'inscrire</Button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200 mt-4">
                <p className="text-sm text-gray-600">
                  Déjà un compte ? <a href="#" className="text-blue-600 font-medium hover:underline">Se connecter</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}