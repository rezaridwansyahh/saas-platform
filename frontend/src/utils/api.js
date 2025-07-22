// src/utils/api.js
import { getTenant } from './getTenant';

export const apiBase = `http://${getTenant()}.localhost/api`;
