import { supabase } from './supabase';
import type { AppState } from '@/types/models';

const ROW_ID = 'atelier';
let saveTimer: ReturnType<typeof setTimeout> | null = null;

export async function loadStateFromSupabase(): Promise<AppState | null> {
  try {
    const { data, error } = await supabase
      .from('shared_state')
      .select('data')
      .eq('id', ROW_ID)
      .single();
    if (error || !data) return null;
    return data.data as AppState;
  } catch {
    return null;
  }
}

export function scheduleSave(state: AppState) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveStateToSupabase(state), 1000);
}

async function saveStateToSupabase(state: AppState) {
  try {
    await supabase.from('shared_state').upsert({
      id: ROW_ID,
      data: state,
      updated_at: new Date().toISOString(),
    });
  } catch {
    /* offline — no pasa nada, siguiente cambio reintentará */
  }
}

export function subscribeToChanges(onUpdate: (state: AppState) => void) {
  const channel = supabase
    .channel('shared_state_changes')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'shared_state', filter: `id=eq.${ROW_ID}` },
      (payload) => {
        const newState = (payload.new as { data: AppState }).data;
        if (newState) onUpdate(newState);
      }
    )
    .subscribe();
  return () => supabase.removeChannel(channel);
}
