import { registerPlugin } from '@capacitor/core';

export interface SpectrePlugin {
  injectMod(options: { code: string }): Promise<{ success: boolean; result?: string }>;
}

const SpectrePlugin = registerPlugin<SpectrePlugin>('SpectrePlugin');

export default SpectrePlugin;
