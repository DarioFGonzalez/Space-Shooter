# 🚀 Space Shooter

> *Un shooter táctico en cuadrícula 9x9 con rotación de nave, proyectiles persistentes y dificultad progresiva. Construido desde cero sin Canvas ni motores externos. Pura lógica grid-based con React y TypeScript.*

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 🎯 ¿Qué es esto?

Space Shooter es un **shooter táctico basado en grilla** donde cada movimiento es discreto pero el peligro es continuo. Controlás una nave en un tablero 9x9, podés rotarla sin moverte, y disparar láseres que viajan celda por celda hasta impactar o llegar al borde.

No es el típico shooter arcade con Canvas y físicas. Es un híbrido entre **acción en tiempo real** y **movimiento táctico por turnos**. Los asteroides aparecen desde bordes aleatorios con frecuencia creciente, y cada decisión cuenta: ¿rotás para disparar mejor o te movés para esquivar?

Construido 100% desde cero, sin motores de juego, sin Canvas, sin librerías externas. Solo React, TypeScript y lógica pura.

---

## 🧠 ¿Qué tiene adentro?

| Feature | Estado |
|---------|--------|
| 🎮 Movimiento WASD + rotación con Shift | ✅ Funcional |
| 🔫 Disparo direccional con espacio | ✅ |
| 🌑 Asteroides desde bordes aleatorios | ✅ |
| 📈 Dificultad progresiva (1s → 0.5s → 0.3s) | ✅ |
| 💥 Colisiones con explosión y respawn | ✅ |
| 🛡️ Invulnerabilidad post-muerte (3-2-1-Go) | ✅ |
| ✨ Animación de láser viajando celda por celda | ✅ |
| 💀 Sistema de puntuación (+10 / -20) | ✅ |
| 🧮 Score acumulado entre partidas | ✅ |

---

## 🛠️ Tecnologías

`TypeScript` · `React` · `CSS3` · `Git` · `GitHub` · `Vercel`

---

## 🎮 Controles

| Acción | Tecla |
|--------|-------|
| Moverse | `W` `A` `S` `D` |
| Rotar (sin mover) | `Shift` + `W` `A` `S` `D` |
| Disparar | `Espacio` |

> 💡 **Pro tip**: Podés rotar la nave hacia donde van a venir los asteroides y disparar sin moverte de tu casilla.

---

## ⚙️ Mecánicas en detalle

### 🔫 Sistema de disparo
El láser no es un "rayo mágico" que impacta al instante. **Viaja celda por celda** con una animación visible, y puede ser detenido por asteroides o llegar al borde del mapa. Cada disparo es un proyectil persistente con su propio `setInterval`.

### 🌑 Spawn de asteroides
Los enemigos aparecen desde los cuatro bordes del mapa en posiciones aleatorias. La frecuencia aumenta con el tiempo de partida:
- 0-5 segundos: cada 1 segundo
- 5-10 segundos: cada 0.5 segundos
- 10+ segundos: cada 0.3 segundos

### 💀 Sistema de muerte y respawn
Si colisionás con un asteroide:
- Perdés 20 puntos
- La nave explota (💥)
- Respawn en el centro del mapa
- **Invulnerabilidad de 2.1 segundos** (la nave parpadea)
- Cuenta regresiva visual `3 → 2 → 1 → Go!`

### 🧮 Puntuación
- Destruir asteroide: `+10` puntos
- Colisión con asteroide: `-20` puntos
- El score se acumula entre partidas (total coins)

---

## 🧱 Estructura del proyecto

```
src/
├── assets/ # Sprites (nave 4 direcciones, láseres 4 direcciones, asteroide, logo)
├── SpaceShooter.tsx # Lógica principal del juego (~500 líneas)
├── SpaceShooter.css # Estilos (incluye animación de parpadeo .titilar)
└── index.tsx # Render de la app
```

---

## 🧪 Estado del proyecto

**Completo y jugable.**  
La lógica central está sólida, el balance es desafiante pero justo, y no hay bugs críticos conocidos.

### 🐞 Lo que aprendí haciendo esto:
- Manejar múltiples `setInterval` sin generar race conditions
- Implementar proyectiles persistentes en un grid 2D
- Sincronizar animaciones con cambios de estado en React
- La diferencia entre `onKeyDown` y `onKeyPress` (y por qué el espacio necesita el segundo)
- Que el `tabIndex={0}` es necesario para que un `<div>` capture eventos de teclado

### 🧭 Posibles mejoras futuras:
- Power-ups (disparo doble, escudo temporal, velocidad)
- Diferentes tipos de enemigos (no solo asteroides)
- Efectos de sonido (con `Howler.js` o similar)
- High scores guardados en `localStorage`

---

## 🔎 Backstage

Este proyecto comenzó como parte de un bundle de juegos básicos. Podés ver su evolución desde la versión alpha hasta acá en el repositorio original:

👉 [Repositorio original con bitácora completa](https://github.com/DarioFGonzalez/Juegos-basicos)

---

## 🚀 Demo en vivo

[![Vercel](https://img.shields.io/badge/Play_Now-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://space-shooter-beryl.vercel.app/)

---

## 📜 Licencia

MIT. Podés leer los detalles en el archivo [LICENSE](./LICENSE).

---

*¿Feedback, bugs o sugerencias? Me sirven para ser mejor dev.  
Este proyecto es de mis favoritos porque representa lo que más me gusta de programar: resolver problemas complejos con herramientas simples, sin depender de motores ni atajos mágicos.*

*Gracias por llegar hasta acá. 🚀*
