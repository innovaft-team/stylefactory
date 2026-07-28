import {useQuery} from "@tanstack/react-query";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import {app, useFirestore} from "../../config";


type PostVariant = 'horizonal' | 'vertical';

export interface Blog {
    id: string;
    slug?: string;
    slugs?: Partial<Record<"en" | "hr", string>>;
    seoTitle?: string;
    seoDescription?: string;
    coverImageAlt?: string;
    images: string[];
    variant: PostVariant;
    titleVariant: PostVariant;
    cro: {
        title: string;
        content: string;
    }
    eng: {
        title: string;
        content: string;
    }
    isVideo?: boolean;
    postedAt?: string;
}


export async function fetchBlog(path: string, id: string) {
    const db = getFirestore(app)
    const result = await getDoc(doc(db, path, id))
    return {
        id: result.id,
        ...result.data()
    } as Blog
}

export const BlogBuckets = {
    blogs: "/blogs",
    trends: "/trends",

    testBlogs: "/testBlogs",
    testTrends: "/testTrends",
} as const;

export async function fetchBlogs(path: string) {
    const db = getFirestore(app)
    const snapshot = await getDocs(collection(db, path))
    const res = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Blog))

    return res.sort((a, b) => {
        return +new Date(b.postedAt ?? '2220-05-05T10:51:37.869Z') - +new Date(a.postedAt ?? '2020-05-05T10:51:37.869Z')
    });
}


export const useListBlogs = (path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: () => fetchBlogs(path),
    })
}
