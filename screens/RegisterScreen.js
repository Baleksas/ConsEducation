import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableOpacityComponent,
    View,
} from "react-native";
import { auth } from "../firebase";
import Login from "./LoginScreen"
import logo from "../assets/logo1.png";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        auth
            // TODO: ensure password and confirm password match up
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Registered with:", user.email);
            })
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        navigation.replace("Login");
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo}/>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="ConfirmPassword"
                    value={confirm_password}
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0782F9",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 150,
        height: 150,
        padding: 40,
    },
});
