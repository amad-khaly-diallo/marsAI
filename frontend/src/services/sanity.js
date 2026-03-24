import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'tvm6js2e',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});
