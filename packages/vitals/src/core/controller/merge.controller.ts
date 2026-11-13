import { ReactiveController } from 'lit';

// eslint-disable-next-line id-length -- shut up, clear enough
export const merge = (a: ReactiveController, b: ReactiveController) => ({
  hostConnected() {
    a.hostConnected?.();
    b.hostConnected?.();
  },
  hostDisconnected() {
    a.hostDisconnected?.();
    b.hostDisconnected?.();
  },
  hostUpdate() {
    a.hostUpdate?.();
    b.hostUpdate?.();
  },
  hostUpdated() {
    a.hostUpdated?.();
    b.hostUpdated?.();
  },
});
