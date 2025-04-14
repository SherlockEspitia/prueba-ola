export function buscarPalabrasEnSopa(matriz, palabras) {
	const resultados = {};
	const filas = matriz.length;
	const columnas = matriz[0].length;
	const direcciones = [
		[0, 1],   // Derecha
		[0, -1],  // Izquierda
		[1, 0],   // Abajo
		[-1, 0],  // Arriba
		[1, 1],   // Diagonal abajo-derecha
		[1, -1],  // Diagonal abajo-izquierda
		[-1, 1],  // Diagonal arriba-derecha
		[-1, -1], // Diagonal arriba-izquierda
	];

	palabras.forEach(palabra => {
		const palabraUpper = palabra.toUpperCase();
		let encontrada = false;
		let posiciones = [];

		for (let i = 0; i < filas && !encontrada; i++) {
			for (let j = 0; j < columnas && !encontrada; j++) {
				if (matriz[i][j] === palabraUpper[0]) {
					for (const [dx, dy] of direcciones) {
						let x = i, y = j, k = 0;
						const rutaTemporal = [];

						// Verificar coincidencia y recolectar posiciones
						while (
							x >= 0 && x < filas &&
							y >= 0 && y < columnas &&
							k < palabraUpper.length &&
							matriz[x][y] === palabraUpper[k]
						) {
							rutaTemporal.push({ fila: x, columna: y });
							x += dx;
							y += dy;
							k++;
						}

						// Si la palabra coincide completamente
						if (k === palabraUpper.length) {
							encontrada = true;
							posiciones = rutaTemporal; // Guardar las posiciones
							break;
						}
					}
				}
				if (encontrada) break;
			}
		}

		resultados[palabra] = {
			encontrada: encontrada,
			posiciones: encontrada ? posiciones : []
		};
	});

	return resultados;
}