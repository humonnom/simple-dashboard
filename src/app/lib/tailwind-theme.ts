import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfigFile from '../../../tailwind.config';

export const tailwindTheme = resolveConfig(tailwindConfigFile).theme;
