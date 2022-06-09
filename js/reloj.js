(function(){
  var actualizarHora = function(){
    var fecha = new Date() ,
        horas = fecha.getHours() ,
        minutos = fecha.getMinutes() ,
        segundos = fecha.getSeconds() ,
        diaSemana = fecha.getDay() ,
        dia = fecha.getDate() ,
        mes = fecha.getMonth() ,
        año = fecha.getFullYear() ;
    
    var fechaHora = document.getElementById('fecha-hora')
    
    var semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                
    if (minutos < 10){ minutos = "0" + minutos };
    if (segundos < 10){ segundos = "0" + segundos };
    if (horas < 10){ horas = "0" + horas };
        
    const cfechaHora = semana[diaSemana] + ' ' +  dia + ' de ' + meses[mes] + ' de ' + año + ' - ' + horas +':'+minutos+':'+segundos;
    fechaHora.innerHTML = `<h5 class="hora_estilo text-white">${cfechaHora}</h5>`
  };

  actualizarHora() ;
  var intervalo = setInterval(actualizarHora, 1000);
  
}())