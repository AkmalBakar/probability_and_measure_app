import { parseLevel } from '../utils/markdownParser';

import level01 from '@content/level-01.md?raw';
import level02 from '@content/level-02.md?raw';
import level03 from '@content/level-03.md?raw';
import level04 from '@content/level-04.md?raw';
import level05 from '@content/level-05.md?raw';
import level06 from '@content/level-06.md?raw';
import level07 from '@content/level-07.md?raw';
import level08 from '@content/level-08.md?raw';
import level09 from '@content/level-09.md?raw';
import level10 from '@content/level-10.md?raw';
import level11 from '@content/level-11.md?raw';
import level12 from '@content/level-12.md?raw';
import level13 from '@content/level-13.md?raw';
import level14 from '@content/level-14.md?raw';
import level15 from '@content/level-15.md?raw';
import level16 from '@content/level-16.md?raw';
import level17 from '@content/level-17.md?raw';
import level18 from '@content/level-18.md?raw';
import level19 from '@content/level-19.md?raw';
import level20 from '@content/level-20.md?raw';
import level21 from '@content/level-21.md?raw';
import level22 from '@content/level-22.md?raw';
import level23 from '@content/level-23.md?raw';
import level24 from '@content/level-24.md?raw';

const rawLevels = [
  level01, level02, level03, level04, level05, level06,
  level07, level08, level09, level10, level11, level12,
  level13, level14, level15, level16, level17, level18,
  level19, level20, level21, level22, level23, level24,
];

export const levels = rawLevels.map(parseLevel);
export const levelMap = Object.fromEntries(levels.map(l => [l.meta.level, l]));
