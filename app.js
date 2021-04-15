new Vue({
  el: "#app",
  data: {
    monsterAttacked: true,
    saludJugador: 100,
    saludMonstruo: 100,
    hayUnaPartidaEnJuego: false,
    turnos: [], //es para registrar los eventos de la partida
    esJugador: false,
    rangoAtaque: [3, 10],
    rangoAtaqueEspecial: [10, 20],
    rangoAtaqueDelMonstruo: [5, 12],
  },

  methods: {
    getSalud(salud) {
      return `${salud}%`;
    },
    empezarPartida: function () {
      this.hayUnaPartidaEnJuego = true;
      this.saludJugador = 100;
      this.saludMonstruo = 100;
      this.turnos = [];
    },
    atacar: function () {
      const danio = this.calcularHeridas(
        this.rangoAtaque[0],
        this.rangoAtaque[1]
      );
      this.saludMonstruo -= danio;
      this.turnos.unshift({
        esJugador: true,
        text: `El jugador golpea al Monstruo con Ataque Normal: ${danio}%`,
      });
      if (!this.verificarGanador()) {
        this.ataqueDelMonstruo();
      }
    },

    ataqueEspecial: function () {
      const danio = this.calcularHeridas(
        this.rangoAtaqueEspecial[0],
        this.rangoAtaqueEspecial[1]
      );
      this.saludMonstruo -= danio;
      this.turnos.unshift({
        esJugador: true,
        text: `El jugador golpea al Monstruo con Ataque Especial: ${danio}%`,
      });
      if (!this.verificarGanador()) {
        this.ataqueDelMonstruo();
      }
    },

    curar: function () {
      let vida = 10;
      if (this.saludJugador <= 90) {
        this.saludJugador += vida;
      } else {
        vida = 100 - this.saludJugador;

        this.saludJugador = 100;
      }
      this.turnos.unshift({
        esJugador: true,
        text: `El jugador se Cura: ${vida}`,
      });

      this.ataqueDelMonstruo();
      this.verificarGanador();
    },

    registrarEvento(evento) {},
    terminarPartida: function () {
      this.hayUnaPartidaEnJuego = false;
      alert("Te escapaste del combate!");
    },

    ataqueDelMonstruo: function () {
      this.monsterAttacked = false;
      setTimeout(() => {
        const danio = this.calcularHeridas(
          this.rangoAtaqueDelMonstruo[0],
          this.rangoAtaqueDelMonstruo[1]
        );
        console.log(`el BICHO TENDRIA Q ATACAR ${danio}`);
        this.saludJugador -= danio;
        this.turnos.unshift({
          esJugador: false,
          text: `El Monstruo golpea al jugador : ${danio}%`,
        });
        this.verificarGanador();
        this.monsterAttacked = true;
      }, 150);
    },

    calcularHeridas: function (min, max) {
      const total = Math.max(Math.floor(Math.random() * max) + 1, min);
      

      return total;
    },
    verificarGanador: function () {
      let resultado = false;
      if (this.saludJugador <= 0) {
        if (confirm("Perdiste! Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.hayUnaPartidaEnJuego = false;
        }
        resultado = true;
      }

      if (this.saludMonstruo <= 0) {
        if (confirm("Ganaste! Jugar de nuevo?")) {
          this.empezarPartida();
        } else {
          this.hayUnaPartidaEnJuego = false;
        }
        resultado = true;
      }
      return resultado;
    },
    cssEvento(turno) {
      //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
      return {
        "player-turno": turno.esJugador,
        "monster-turno": !turno.esJugador,
      };
    },
  },
});
