
export enum Format {
  POST = 'POST',
  STORY = 'STORY'
}

export enum StoryType {
  RESULTS = 'RESULTS',
  INFO = 'INFO'
}

export enum Practice {
  PISTE = 'PISTE',
  SANTE = 'SANTE',
  TRAIL = 'TRAIL'
}

export const PRACTICE_COLORS: Record<Practice, string> = {
  [Practice.PISTE]: '#FFB81C',
  [Practice.SANTE]: '#00A650',
  [Practice.TRAIL]: '#FF6600'
};

export const PRACTICE_LABELS: Record<Practice, string> = {
  [Practice.PISTE]: 'PISTE',
  [Practice.SANTE]: 'ATHLÉ SANTÉ - MARCHE NORDIQUE',
  [Practice.TRAIL]: 'ROUTE-TRAIL'
};

export const FORMAT_DIMENSIONS: Record<Format, { width: number; height: number; aspect: string }> = {
  [Format.POST]: { width: 1080, height: 1080, aspect: 'aspect-square' },
  [Format.STORY]: { width: 1080, height: 1920, aspect: 'aspect-[9/16]' }
};

export interface ResultEntry {
  id: string;
  name: string;
  place: string;
  perf: string;
  discipline?: string;
}

export interface Slide {
  id: string;
  specificDiscipline: string;
  results: ResultEntry[];
}
