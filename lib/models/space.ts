import * as keys from 'lib/utils/keys';
import * as database from 'lib/utils/database';

import type { UID } from 'worktop/utils';
import type { User, UserID } from './user';

export type SpaceID = UID<11>;

// TODO: Maybe Org
type Owner = {
	type: 'user';
	uid: UserID;
}

export interface Space {
	uid: SpaceID;
	name: string;
	ownerid: Owner;
	created_at: TIMESTAMP;
	last_updated?: Nullable<TIMESTAMP>;
}

export const ID = keys.factory<SpaceID>('spaces', 11);

/**
 * Find a `Space` document by its `uid` value.
 */
export function find(uid: SpaceID) {
	const key = ID.toKID(uid);
	return database.read<Space>(key);
}

/**
 * Save/Overwrite the `Space` document.
 */
export function save(doc: Space): Promise<boolean> {
	return database.write<Space>(ID.toKID(doc.uid), doc);
}

/**
 * Format a `Space` document for public display
 * @NOTE Ensures `ownerid` is never public!
 */
export function output(doc: Space) {
	const { uid, name, created_at, last_updated } = doc;
	return { uid, name, created_at, last_updated };
}