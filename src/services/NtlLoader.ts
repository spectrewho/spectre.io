/**
 * NtlLoader Service - Phase 1.4 (Universal Injector Bridge)
 */

const LOCAL_NTL_PATH = '/ntl.js';

export const fetchLatestNtl = async (): Promise<string | null> => {
  try {
    console.log('Fetching NTL from GitHub (Live Updates)...');
    const response = await fetch(LOCAL_NTL_PATH);
    if (!response.ok) throw new Error('Failed to load bundled NTL');
    
    return await response.text();
  } catch (error) {
    console.warn('Could not load NTL mod from assets.', error);
    return null;
  }
};
