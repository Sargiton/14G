#!/bin/bash

# Colores
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[1;34m"
CYAN="\033[0;36m"
RESET="\033[0m"

# Función para imprimir mensajes con color
function print_color() {
    echo -e "$1$2${RESET}"
}

# Encabezado llamativo
clear
print_color "$CYAN" "##############################################################"
print_color "$CYAN" "#                                                            #"
print_color "$CYAN" "#                     LYNX-AI INSTALLER                     #"
print_color "$CYAN" "#                                                            #"
print_color "$CYAN" "##############################################################"
print_color "$GREEN" "Iniciando instalación..."

# Cargar variables desde el archivo .env
print_color "$BLUE" "Cargando variables desde el archivo .env..."
export $(grep -v '^#' .env | xargs)
print_color "$GREEN" "Variables cargadas con éxito."

# Configurar Git con las credenciales
print_color "$BLUE" "Configurando Git con las credenciales..."
git config --global user.name "$GIT_USERNAME"
git config --global user.email "$GIT_USERNAME@github.com"
git config --global credential.helper store
git remote set-url origin https://$GIT_USERNAME:$GIT_TOKEN@github.com
print_color "$GREEN" "Configuración de Git completada con éxito."

# Instalar dependencias con Yarn
if command -v yarn &> /dev/null; then
    print_color "$YELLOW" "Yarn está instalado. Instalando dependencias..."
    yarn install
    if [ $? -eq 0 ]; then
        print_color "$GREEN" "Instalación de dependencias completada con éxito."
    else
        print_color "$RED" "Ocurrió un error al instalar las dependencias."
    fi
else
    print_color "$RED" "Yarn no está instalado. Por favor, instala Yarn e intenta nuevamente."
fi

# Mensaje final
print_color "$CYAN" "##############################################################"
print_color "$GREEN" "Lynx-AI se ha instalado correctamente."
print_color "$CYAN" "##############################################################"
