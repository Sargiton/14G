export const determinarIdiomaPorNumero = (numero) => {
    const paises = {
        "+52": "es", // México
        "+1": "en", // Estados Unidos, Canadá
        "+33": "fr", // Francia
        "+44": "en", // Reino Unido
        "+34": "es", // España
        "+55": "pt", // Brasil
        "+54": "es", // Argentina
        "+49": "de", // Alemania
        "+39": "it", // Italia
        "+61": "en", // Australia
        "+81": "ja", // Japón
        "+91": "hi", // India
        "+7": "ru", // Rusia
    };

    for (const prefijo in paises) {
        if (numero.startsWith(prefijo)) {
            return paises[prefijo];
        }
    }

    return "es"; // Idioma por defecto
};
