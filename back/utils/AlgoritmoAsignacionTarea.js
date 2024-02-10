const algoritmoAsignacionTareas = (programadores, dificultad, tiempoEstimado) => {
    const programadoresAdecuados = programadores.filter(programador =>{
        return programador.tareas.length > 0;
    });

    programadoresAdecuados.sort((a, b) => b.tareas.length - a.tareas.length);
    return programadoresAdecuados[0];
}

module.exports = algoritmoAsignacionTareas;