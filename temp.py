import glob
import os

# Configura estas variables según tus necesidades
directorio_raiz = "./app/"
patron_exclusion = [
    "migrations",
    "tests",
]  # Este es el patrón del subdirectorio a excluir
archivo_destino = "./archivo_destino.txt"


def es_subdirectorio_a_excluir(directorio):
    return any(subdirectorio in directorio for subdirectorio in patron_exclusion)


def copiar_contenido(archivo_origen, archivo_destino):
    with open(archivo_origen, "r") as origen:
        contenido = origen.read()
    with open(archivo_destino, "a") as destino:
        destino.write(f"# Path: {archivo_origen}\n")
        destino.write(
            contenido + "\n\n"
        )  # Añade una nueva línea entre archivos para mejor legibilidad


# Limpia el archivo destino si ya existe
open(archivo_destino, "w").close()

for directorio_actual, subdirectorios, archivos in os.walk(directorio_raiz):
    # Filtra los subdirectorios a excluir
    subdirectorios[:] = [
        d
        for d in subdirectorios
        if not es_subdirectorio_a_excluir(os.path.join(directorio_actual, d))
    ]

    # Encuentra los archivos .py en el directorio actual, excluyendo los subdirectorios no deseados
    for archivo in glob.glob(os.path.join(directorio_actual, "*.tsx")):
        copiar_contenido(archivo, archivo_destino)

print(f"Se ha completado la copia de archivos .py al archivo {archivo_destino}.")
