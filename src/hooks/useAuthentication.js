
import  { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";
import { useState, useEffect, use } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Cleanup function to prevent memory leaks
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

     //logout
    const logout = () => {
        checkIfIsCancelled();
        return signOut(auth);
    }

     const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            setError(systemErrorMessage);
        } finally {
            setLoading(false);
        }
    }
    
    // Register a user
    const register = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const {user} = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {
                displayName: data.displayName,
            });

            return user;

        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "Password must be at least 6 characters long.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email already registered.";
            } else {
                systemErrorMessage = "An error occurred, please try again later.";
            }

            checkIfIsCancelled();
            setError(systemErrorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { error, loading, auth, register, logout, login};
}
