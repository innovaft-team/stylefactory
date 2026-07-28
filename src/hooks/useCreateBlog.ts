import {NewBlogFormFieldValues} from "../components/CreateBlogForm";
import {addDoc, collection, deleteDoc, doc, getFirestore, updateDoc} from "firebase/firestore";
import {deleteObject, getStorage, ref, uploadBytes} from 'firebase/storage';
import {Blog} from "./useListBlogs";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {useToast} from "@chakra-ui/react";
import {app} from "../../config";


async function createBlog({imagesFiles, path, ...blogData}: NewBlogFormFieldValues & {
    imagesFiles: Array<File>,
    path: string
}): Promise<Blog> {
    const db = getFirestore(app)
    const storage = getStorage(app)


    const uploadedImages = await Promise.all(Array.from(imagesFiles).map(async (image) => {
        return uploadBytes(ref(storage, blogData.eng.title + "_" + crypto.randomUUID() + image.name), image)
    }))


    const newBlog = {
        ...blogData,
        postedAt: new Date().toISOString(),
        images: uploadedImages.map(image => `https://firebasestorage.googleapis.com/v0/b/${image.ref.bucket}/o/${image.ref.name}?alt=media&token=e1685135-8d6d-4427-bdcb-01d0a31e79c6`)
    }

    const docRef = await addDoc(collection(db, path), newBlog)

    return {
        ...newBlog,
        id: docRef.id
    };
}

export const useCreateBlog = (path: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path]
            })
        }
    })
}

const updateBlog = async ({path, imagesFiles, ...blogData}: NewBlogFormFieldValues & {
    path: string,
    imagesFiles: Array<File>,
}) => {
    const db = getFirestore(app)
    const storage = getStorage(app)

    const uploadedImages = await Promise.all(Array.from(imagesFiles).map(async (image) => {
        return uploadBytes(ref(storage, blogData.eng.title + "_" + crypto.randomUUID() + image.name), image)
    }))


    const newBlog = {
        ...blogData,
        images: uploadedImages.map(image => `https://firebasestorage.googleapis.com/v0/b/${image.ref.bucket}/o/${image.ref.name}?alt=media&token=e1685135-8d6d-4427-bdcb-01d0a31e79c6`)
    }

    return updateDoc(doc(db, path, blogData.id), newBlog)
}

export const useUpdateBlog = (path: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path]
            })
        },
        onError: (error) => {
            console.log(error)
        }
    })
}


interface DeleteRequest {
    id: string;
    images: string[];
    path: string;
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient()
    const toast = useToast()


    return useMutation({
        mutationFn: async ({id, path, images}: DeleteRequest) => {
            const db = getFirestore(app)

            const storage = getStorage(app)

            await deleteDoc(doc(db, path, id))

            return Promise.all(images.map(image => deleteObject(ref(storage, image))))
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["blogs"]
            })
            toast({
                id: "delete-blog-success",
                title: "Blog obrisan",
                status: "success",
            })
        }
    })
}