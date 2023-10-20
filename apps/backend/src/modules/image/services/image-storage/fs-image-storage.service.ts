import { Readable } from 'stream';
import { ImageStorageService } from './image-storage.service.js';
import { isAbsolute, join } from 'path';
import { cwd } from 'process';
import { createReadStream, createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import { ImageBlob } from '../../domain/image-blob.js';

export class FsImageStorageService implements ImageStorageService {
    private dirPath: string;

    constructor() {
        // const dirPath =  '/usr/storage/';
        const dirPath = process.env.NODE_ENV === 'production' ? '/usr/storage/' : './../../storage';

        if (!dirPath || typeof dirPath !== 'string') {
            throw new Error('Required config param dir-path is invalid or undefined');
        }
        this.dirPath = isAbsolute(dirPath) ? dirPath : join(cwd(), dirPath);

        mkdirSync(this.dirPath, { recursive: true });
    }

    async get(id: string): Promise<Readable> {
        const path = join(this.dirPath, id);

        const stream = createReadStream(path);

        return stream;
    }

    async save(blob: ImageBlob): Promise<void> {
        const path = join(this.dirPath, blob.id);
        await pipeline(blob.stream, createWriteStream(path));
    }
}
