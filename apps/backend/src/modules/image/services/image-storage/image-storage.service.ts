import { Readable } from 'stream';
import { ImageBlob } from '../../domain/image-blob.js';

export interface ImageStorageService {
    save(stream: ImageBlob): Promise<void>;
    get(id: string): Promise<Readable>;
}
