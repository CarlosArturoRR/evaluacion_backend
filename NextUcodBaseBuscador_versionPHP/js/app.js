function openfile(event){
//  event.preventDefault();
  $.ajax({
    url: './openfile.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: {},
    type: 'post',
    success: function(data){
      $('.borrame').remove()
      data.forEach(function(val,i){

            $('.colContenido').append(
              '<div class="card itemMostrado borrame">' +
              '<img class="" src="img/home.jpg" >' +
                  '<div class="card-stacked">' +
                  '<P><strong>Direccion: </strong>' + val.Direccion +'</P>'+
                  '<p><strong>Ciudad: </strong>' + val.Ciudad +'</p>'+
                  '<p><strong>Telefono: </strong>' + val.Telefono + '</p>'+
                  '<p><strong>Codigo Postal: </strong>' + val.Codigo_Postal +'</p>'+
                  '<p><strong>Tipo: </strong>' + val.Tipo +'</p>'+
                  '<p><strong>Precio: </strong> <span class="precioTexto">' + val.Precio + '</span></p>' +
                  '<div class="divider"></div>' +
                  '<div style="text-align:right">' +
                  '<button type="button" class="btn-flat waves-effect">VER MAS</button>'+
                  '</div>' +
                  '</div>' +
              '</div>'
            )
      })
    },
    error: function(){
      alert("error in ajax form submission");
    }
  });
}

function Inicia(event){
//  event.preventDefault();
var valorInicial = ''
  $.ajax({
    url: './openfile.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: {},
    type: 'post',
    success: function(data){

      data.sort(function(a,b){
        return ((a.Ciudad < b.Ciudad) ? -1 : (a.Ciudad > b.Ciudad)? 1 : 0)
      })

      data.forEach(function(val,i){
        if (val.Ciudad !== valorInicial){
          valorInicial=val.Ciudad
          $('#selectCiudad').append('<option value="">'+ valorInicial +'</option>')
        }
      })
      $('#selectCiudad').material_select();

      data.sort(function(a,b){
        return ((a.Ciudad < b.Ciudad) ? -1 : (a.Ciudad > b.Ciudad)? 1 : 0)
      })

      valorInicial=''

      data.sort(function(a,b){
        return ((a.Tipo < b.Tpo) ? -1 : (a.Tipo > b.Tipo)? 1 : 0)
      })
      data.forEach(function(val,i){
        if (val.Tipo !== valorInicial){
          valorInicial=val.Tipo
          $('#selectTipo').append('<option value="">'+ valorInicial +'</option>')
        }
      })
      $('#selectTipo').material_select();
    },
    error: function(){
      alert("error in ajax form submission");
    }
  });
}



function filtro(event){
//  event.preventDefault();
var busca_Ciudad = $("#selectCiudad option:selected").text()
var busca_Tipo = $("#selectTipo option:selected").text()
var rango_precios = $("#rangoPrecio").val()
var min = parseFloat(rango_precios.substr(0, rango_precios.indexOf(';')))
var max = parseFloat(rango_precios.substr(rango_precios.indexOf(';')+1,rango_precios.length))
var filtro_ciudad=''
var filtro_tipo=''
var precio=0

  $.ajax({
    url: './openfile.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: {},
    type: 'post',
    success: function(data){
      $('.borrame').remove()
      data.sort(function(a,b){
        return (a.Precio - b.Precio)
      })
      data.forEach(function(val,i){
        precio=parseFloat((val.Precio.substring(1,val.Precio.length)).replace(",",""))
        if ((parseFloat(precio) >= min) && (parseFloat(precio) <= max)){
          if ((busca_Ciudad=='Elige una ciudad') && (busca_Tipo=='Elige un tipo')){
            $('.colContenido').append(
              '<div class="card itemMostrado borrame">' +
              '<img class="" src="img/home.jpg" >' +
                  '<div class="card-stacked">' +
                  '<P><strong>Direccion: </strong>' + val.Direccion +'</P>'+
                  '<p><strong>Ciudad: </strong>' + val.Ciudad +'</p>'+
                  '<p><strong>Telefono: </strong>' + val.Telefono + '</p>'+
                  '<p><strong>Codigo Postal: </strong>' + val.Codigo_Postal +'</p>'+
                  '<p><strong>Tipo: </strong>' + val.Tipo +'</p>'+
                  '<p><strong>Precio: </strong> <span class="precioTexto">' + val.Precio + '</span></p>' +
                  '<div class="divider"></div>' +
                  '<div style="text-align:right">' +
                  '<button type="button" class="btn-flat waves-effect">VER MAS</button>'+
                  '</div>' +
                  '</div>' +
              '</div>'
            )
          }else{
            if (busca_Ciudad!='Elige una ciudad'){
              filtro_ciudad=busca_Ciudad
            }else {
              filtro_ciudad=val.Ciudad
            }
            if (busca_Tipo!='Elige un tipo'){
              filtro_tipo=busca_Tipo
            }else {
              filtro_tipo=val.Tipo
            }
            if ((val.Ciudad==filtro_ciudad) && (val.Tipo==filtro_tipo)){
              $('.colContenido').append(
                '<div class="card itemMostrado borrame">' +
                '<img class="" src="img/home.jpg" >' +
                    '<div class="card-stacked">' +
                    '<P><strong>Direccion: </strong>' + val.Direccion +'</P>'+
                    '<p><strong>Ciudad: </strong>' + val.Ciudad +'</p>'+
                    '<p><strong>Telefono: </strong>' + val.Telefono + '</p>'+
                    '<p><strong>Codigo Postal: </strong>' + val.Codigo_Postal +'</p>'+
                    '<p><strong>Tipo: </strong>' + val.Tipo +'</p>'+
                    '<p><strong>Precio: </strong> <span class="precioTexto">' + val.Precio + '</span></p>' +
                    '<div class="divider"></div>' +
                    '<div style="text-align:right">' +
                    '<button type="button" class="btn-flat waves-effect">VER MAS</button>'+
                    '</div>' +
                    '</div>' +
                '</div>'
              )
            }
          }
        }
      })
    },
    error: function(){
      alert("error in ajax form submission");
    }
  });
}



$('#mostrarTodos').on("click", function(){
  openfile()
//alert("aaas")
})

$('#formulario').submit(function(event){
  var busca_Ciudad = $("#selectCiudad option:selected").text()
  var busca_Tipo = $("#selectCiudad option:selected").text()
  var rango_precios = $("#rangoPrecio").val()
  var min = parseFloat(rango_precios.substr(0, rango_precios.indexOf(';')))
  var max = parseFloat(rango_precios.substr(rango_precios.indexOf(';')+1,rango_precios.length))
  var filtro_ciudad=''
  var filtro_tipo=''
  event.preventDefault();
  $.ajax(
    {
      url:'./buscador.php',
      type: 'POST',
      data: {busca_Ciudad: busca_Ciudad, busca_Tipo:busca_Tipo, rango_precios:rango_precios}
    }
  ).done(function(data){
  //  alert(data)
    filtro()
  })
})


Inicia()
