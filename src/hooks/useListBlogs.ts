import {useQuery} from "@tanstack/react-query";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import {app} from "../../config";
import {Blog, BlogBuckets} from "./blog";
import {withCoverSizes} from "@/utils/imageSize";

// Re-exported so existing `from "@/hooks/useListBlogs"` imports keep working.
// Prefer importing these from "@/hooks/blog" — that module is firebase-free and
// therefore safe to pull into a client component.
export type {Blog};
export {BlogBuckets};


export async function fetchBlog(path: string, id: string) {
    const db = getFirestore(app)
    const result = await getDoc(doc(db, path, id))
    return {
        id: result.id,
        ...result.data()
    } as Blog
}

export async function fetchBlogs(path: string) {
    const db = getFirestore(app)
    const snapshot = await getDocs(collection(db, path))
    const res = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Blog))

    const sorted = res.sort((a, b) => {
        return +new Date(b.postedAt ?? '2220-05-05T10:51:37.869Z') - +new Date(a.postedAt ?? '2020-05-05T10:51:37.869Z')
    });

    return withCoverSizes(sorted);
}


export const useListBlogs = (path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => fetchBlogs(path),
    })
}
