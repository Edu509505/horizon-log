export function calcularTempo(dataPassada: string) {
    const agora: Date = new Date();
    const difMillissegundos: number = Number(agora - new Date(dataPassada));

    const segundos = Math.floor(difMillissegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (segundos < 60) return "Agora Mesmo";

    if (minutos < 60) return `Há ${minutos} min`;

    if (horas < 24) return `Há ${horas}h`;

    const horasRestantes = horas % 24;

    if (horasRestantes > 0) {
      return `Há ${dias} dia(s) e ${horasRestantes}h`;
    }

    return `Há ${dias} dia(s)`;
  }