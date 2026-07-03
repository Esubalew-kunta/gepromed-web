"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { trainings as SEED, type TrainingSession } from "./trainings";
import { getTrainings } from "./data";

/**
 * Provides the training catalogue to client components. Fetches live data from
 * Supabase once on mount; falls back to the bundled seed array if Supabase is
 * unconfigured or returns nothing (keeps the site working offline/in the demo).
 */

type Ctx = { trainings: TrainingSession[]; loading: boolean };
const TrainingsContext = createContext<Ctx>({ trainings: SEED, loading: false });

export function TrainingsProvider({ children }: { children: React.ReactNode }) {
  const [trainings, setTrainings] = useState<TrainingSession[]>(SEED);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getTrainings()
      .then((list) => {
        if (alive && list.length > 0) setTrainings(list);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <TrainingsContext.Provider value={{ trainings, loading }}>
      {children}
    </TrainingsContext.Provider>
  );
}

export function useTrainings(): TrainingSession[] {
  return useContext(TrainingsContext).trainings;
}
