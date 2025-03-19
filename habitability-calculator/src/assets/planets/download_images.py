import requests
import os

# URLs de imágenes de dominio público de la NASA
IMAGES = {
    'earth.jpg': 'https://images.nasa.gov/details-PIA18033',
    'mars.jpg': 'https://images.nasa.gov/details-PIA24420',
    'venus.jpg': 'https://images.nasa.gov/details-PIA00271',
    'europa.jpg': 'https://images.nasa.gov/details-PIA19048',
    'kepler442b.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2207_kepler442b_art2.jpg',
    'teegardensb.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2534_teegarden_art.jpg',
    'toi700d.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2486_toi700d_art.jpg',
    'proximab.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2420_proxima_b_art.jpg',
    'trappist1e.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2325_trappist1_art.jpg',
    'kepler186f.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2287_kepler186f_art.jpg',
    'k218b.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2375_k2_18b_art.jpg',
    'kepler62f.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2266_kepler62f_art.jpg',
    'kepler452b.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2288_kepler452b_art.jpg',
    'gliese667cc.jpg': 'https://exoplanets.nasa.gov/system/resources/detail_files/2241_gliese667cc_art.jpg'
}

def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as f:
            f.write(response.content)
        print(f'Descargada imagen: {filename}')
    else:
        print(f'Error al descargar {filename}')

def main():
    for filename, url in IMAGES.items():
        download_image(url, filename)

if __name__ == '__main__':
    main() 