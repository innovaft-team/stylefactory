

import type { Blog } from "@/hooks/blog";

export interface ImageSize {
    width: number;
    height: number;
}

const HEADER_BYTES = 64 * 1024;

const PROBE_TIMEOUT_MS = 10000;
const MAX_CONCURRENT_PROBES = 6;
const cache = new Map<string, ImageSize | undefined>();
const inFlight = new Map<string, Promise<ImageSize | undefined>>();

function readUInt16BE(bytes: Uint8Array, offset: number) {
    return (bytes[offset] << 8) | bytes[offset + 1];
}

function readUInt32BE(bytes: Uint8Array, offset: number) {
    return (
        ((bytes[offset] << 24) >>> 0) +
        (bytes[offset + 1] << 16) +
        (bytes[offset + 2] << 8) +
        bytes[offset + 3]
    );
}

function readUInt32LE(bytes: Uint8Array, offset: number) {
    return (
        bytes[offset] +
        (bytes[offset + 1] << 8) +
        (bytes[offset + 2] << 16) +
        ((bytes[offset + 3] << 24) >>> 0)
    );
}

const JPEG_SOF_MARKERS = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function parseJpeg(bytes: Uint8Array): ImageSize | undefined {
    let offset = 2;

    while (offset + 9 < bytes.length) {
        if (bytes[offset] !== 0xff) {
            offset += 1;
            continue;
        }

        const marker = bytes[offset + 1];

        if (JPEG_SOF_MARKERS.has(marker)) {
            return {
                height: readUInt16BE(bytes, offset + 5),
                width: readUInt16BE(bytes, offset + 7),
            };
        }

        if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
            offset += 2;
            continue;
        }

        const segmentLength = readUInt16BE(bytes, offset + 2);
        if (segmentLength < 2) return undefined;
        offset += 2 + segmentLength;
    }

    return undefined;
}

function parsePng(bytes: Uint8Array): ImageSize | undefined {
    if (bytes.length < 24) return undefined;

    return {
        width: readUInt32BE(bytes, 16),
        height: readUInt32BE(bytes, 20),
    };
}

function parseGif(bytes: Uint8Array): ImageSize | undefined {
    if (bytes.length < 10) return undefined;

    return {
        width: bytes[6] | (bytes[7] << 8),
        height: bytes[8] | (bytes[9] << 8),
    };
}

function parseWebp(bytes: Uint8Array): ImageSize | undefined {
    // RIFF....WEBP<fourcc>
    const format = String.fromCharCode(bytes[12], bytes[13], bytes[14], bytes[15]);

    if (format === "VP8 " && bytes.length >= 30) {
        return {
            width: readUInt16BE(bytes, 27) & 0x3fff,
            height: (bytes[29] | (bytes[30] << 8)) & 0x3fff,
        };
    }

    if (format === "VP8L" && bytes.length >= 25) {
        const bits = readUInt32LE(bytes, 21);
        return {
            width: (bits & 0x3fff) + 1,
            height: ((bits >> 14) & 0x3fff) + 1,
        };
    }

    if (format === "VP8X" && bytes.length >= 30) {
        return {
            width: (bytes[24] | (bytes[25] << 8) | (bytes[26] << 16)) + 1,
            height: (bytes[27] | (bytes[28] << 8) | (bytes[29] << 16)) + 1,
        };
    }

    return undefined;
}

function parseIsoBmff(bytes: Uint8Array): ImageSize | undefined {
    for (let i = 0; i + 20 < bytes.length; i += 1) {
        if (
            bytes[i] === 0x69 && // i
            bytes[i + 1] === 0x73 && // s
            bytes[i + 2] === 0x70 && // p
            bytes[i + 3] === 0x65 // e
        ) {
            return {
                width: readUInt32BE(bytes, i + 8),
                height: readUInt32BE(bytes, i + 12),
            };
        }
    }

    return undefined;
}

function parseImageHeader(buffer: ArrayBuffer): ImageSize | undefined {
    const bytes = new Uint8Array(buffer);
    if (bytes.length < 16) return undefined;

    let size: ImageSize | undefined;

    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
        size = parseJpeg(bytes);
    } else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
        size = parsePng(bytes);
    } else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
        size = parseGif(bytes);
    } else if (
        bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
        bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
    ) {
        size = parseWebp(bytes);
    } else if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
        size = parseIsoBmff(bytes);
    }

    if (!size || !Number.isFinite(size.width) || !Number.isFinite(size.height)) return undefined;
    if (size.width <= 0 || size.height <= 0) return undefined;

    return size;
}

async function probe(url: string): Promise<ImageSize | undefined> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            headers: { Range: `bytes=0-${HEADER_BYTES - 1}` },
            signal: controller.signal,
        });

        if (!response.ok) return undefined;

        return parseImageHeader(await response.arrayBuffer());
    } catch {
      
        return undefined;
    } finally {
        clearTimeout(timer);
    }
}

export async function getImageSize(url: string): Promise<ImageSize | undefined> {
    if (cache.has(url)) return cache.get(url);

    const existing = inFlight.get(url);
    if (existing) return existing;

    const pending = probe(url).then((size) => {
        cache.set(url, size);
        inFlight.delete(url);
        return size;
    });

    inFlight.set(url, pending);
    return pending;
}

async function mapWithConcurrency<T, R>(
    items: T[],
    limit: number,
    fn: (item: T) => Promise<R>,
): Promise<R[]> {
    const results = new Array<R>(items.length);
    let cursor = 0;

    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor++;
            results[index] = await fn(items[index]);
        }
    });

    await Promise.all(workers);

    return results;
}


export async function withCoverSizes<T extends Blog>(blogs: T[]): Promise<T[]> {
    return mapWithConcurrency(blogs, MAX_CONCURRENT_PROBES, async (blog) => {
        const cover = blog.images?.[0];
        if (!cover || blog.isVideo) return blog;

        const coverSize = await getImageSize(cover);
        if (!coverSize) return blog;

        return { ...blog, coverSize };
    });
}
