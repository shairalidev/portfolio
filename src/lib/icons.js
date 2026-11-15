import { addCollection } from '@iconify/react';
import collections from './icons.json';

/** Registers every icon the site uses so <Icon> renders offline, with no API fetch. */
collections.forEach((collection) => addCollection(collection));
