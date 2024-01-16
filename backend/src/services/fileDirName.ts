import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface Meta {
  url: string;
}

interface FileDirNameResult {
  __dirname: string;
  __filename: string;
}

/**
 *
 * @param meta
 */
export const fileDirName = (meta: Meta): FileDirNameResult => {
  const __filename: string = fileURLToPath(meta.url);
  const __dirname: string = dirname(__filename);

  return { __dirname, __filename };
}
