import { useCallback, useEffect, useState } from 'react';

export type PresenceState = 'open' | 'closing';

export type UsePresenceOptions = {
  open: boolean;
  onExitComplete?: () => void;
};

export type UsePresenceReturn = {
  isPresent: boolean;
  state: PresenceState;
  onExitComplete: () => void;
};

export function usePresence({
  open,
  onExitComplete,
}: UsePresenceOptions): UsePresenceReturn {
  const [isPresent, setIsPresent] = useState(open);

  useEffect(() => {
    if (open) {
      setIsPresent(true);
    }
  }, [open]);

  const handleExitComplete = useCallback(() => {
    if (open) {
      return;
    }

    setIsPresent(false);
    onExitComplete?.();
  }, [onExitComplete, open]);

  return {
    isPresent,
    state: open ? 'open' : 'closing',
    onExitComplete: handleExitComplete,
  };
}
