import { redirect } from "next/navigation";

/**
 * Retired (client response 2026-07-16): "no public referral link, no
 * coordinator-facing portal — Gepromed is the intermediary for each
 * registrant." HelpMeSee sessions now use the SAME public /register form as
 * every other training (RegisterPanel lists them, gated by nothing since the
 * foundation dictates enrollment); the training itself, not a separate page,
 * is what differentiates the parcours. Kept as a redirect so any link already
 * shared with HelpMeSee still works.
 */
export default function HelpMeSeeReferralRedirect() {
  redirect("/register");
}
