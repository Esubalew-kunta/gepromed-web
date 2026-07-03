"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { uploadSignedContract } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export function SignUpload() {
  const params = useSearchParams();
  const ref = params.get("ref") || "";
  const { lang } = useLang();
  const tx = (fr: string, en: string) => (lang === "fr" ? fr : en);

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const submit = async () => {
    if (!file) return;
    setStatus("uploading");
    setErr("");
    try {
      await uploadSignedContract(ref, file);
      setStatus("done");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Error");
      setStatus("error");
    }
  };

  if (!ref) {
    return (
      <div className="card p-8 text-center text-ink-muted">
        {tx("Lien invalide. Veuillez utiliser le lien reçu par email.", "Invalid link. Please use the link from your email.")}
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="tick-frame card p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-3xl text-brand-600">✓</div>
        <h2 className="mt-4 text-2xl">{tx("Document bien reçu !", "Document received!")}</h2>
        <p className="mt-3 text-ink-soft">
          {tx(
            "Votre contrat signé a été transmis à notre équipe. Il est en attente de vérification. Vous recevrez une confirmation dès validation de votre place.",
            "Your signed contract has been sent to our team and is pending verification. You will be notified once your seat is confirmed.",
          )}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-2 text-sm">
          <span className="mono-label">{tx("Référence", "Reference")}</span>
          <span className="stat-figure font-semibold text-brand-700">{ref}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="tick-frame card p-6 sm:p-8">
      <p className="mono-label-brand">{tx("Signature du contrat", "Contract signature")}</p>
      <h2 className="mt-2 text-xl">{tx("Téléverser votre contrat signé", "Upload your signed contract")}</h2>
      <p className="mt-2 text-sm text-ink-soft">
        {tx(
          "Signez le contrat d'engagement reçu par email, puis déposez-le ici (PDF ou photo).",
          "Sign the engagement contract you received by email, then upload it here (PDF or photo).",
        )}
      </p>
      <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-mist px-3 py-1.5 text-sm">
        <span className="mono-label">{tx("Référence", "Reference")}</span>
        <span className="stat-figure font-semibold text-brand-700">{ref}</span>
      </p>

      <div className="mt-5">
        <label className="field-label">{tx("Contrat signé", "Signed contract")}</label>
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
        />
      </div>

      {err ? <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{err}</p> : null}

      <button
        onClick={submit}
        disabled={!file || status === "uploading"}
        className="btn-primary mt-6 w-full disabled:opacity-50"
      >
        {status === "uploading" ? tx("Envoi…", "Uploading…") : tx("Envoyer le contrat signé", "Submit signed contract")}
      </button>
      <p className="mt-3 text-center text-xs text-ink-muted">
        {tx("Vos documents restent confidentiels.", "Your documents remain confidential.")}
      </p>
    </div>
  );
}
