import { useEffect, useState } from "react";


export function useMaybeSignedIn() {
    const [maybeSignedIn, setMaybeSignedIn] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const check = async () => {
            if (typeof indexedDB === "undefined") return false;

            // Not universally available; when it's missing we fall back to the
            // old behaviour of loading the SDK and letting it decide.
            if (typeof indexedDB.databases !== "function") return true;

            try {
                const databases = await indexedDB.databases();
                return databases.some((db) => db.name === "firebaseLocalStorageDb");
            } catch {
                return true;
            }
        };

        check().then((result) => {
            if (!cancelled && result) setMaybeSignedIn(true);
        });

        return () => {
            cancelled = true;
        };
    }, []);

    return maybeSignedIn;
}
