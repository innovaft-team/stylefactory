import {Button, Text, useToast, VStack} from "@chakra-ui/react";
import {useCurrentUser, useSignInWithGooglePopup, useSignOut} from "../../../config";
import {useRouter} from "next/router";
import {SeoHead} from "@/components/SeoHead";


export default function Page() {
    const signIn = useSignInWithGooglePopup()
    const toast = useToast()

    const router = useRouter()

    const currentUser = useCurrentUser()

    const signOut = useSignOut()

    return (
        <VStack>
            <SeoHead
                title="Login"
                description="Style Factory administration login."
                path="/login"
                noIndex
            />
            <Text textStyle={"heading5"}>Prijava</Text>
            {
                currentUser ? (
                    <Text>
                        Prijavljeni ste kao {currentUser.displayName} ({currentUser.email})
                    </Text>
                ) : (
                    <Text>
                        Niste prijavljeni
                    </Text>
                )
            }
            {
                !currentUser ? ( <Button onClick={() => {
                    signIn().then(() => {
                        toast({
                            title: "Uspješno ste se prijavili",
                            status: "success",
                            duration: 5000,
                        })
                        router.push("/")
                    }).catch((error) => {
                        toast({
                            title: "Došlo je do greške",
                            description: error.message,
                            status: "error",
                            duration: 5000,
                        })
                    })
                }}>
                    Prijava
                </Button>
                ) : (
                    <Button onClick={() => {
                        signOut().then(() => {
                            toast({
                                title: "Uspješno ste se odjavili",
                                status: "success",
                                duration: 5000,
                            })
                            router.push("/")
                        }).catch((error) => {
                            toast({
                                title: "Došlo je do greške",
                                description: error.message,
                                status: "error",
                                duration: 5000,
                            })
                        })

                    }}>
                        Odjava
                    </Button>
                )
            }



        </VStack>
    )
}
