function agregardatos(nombre,apellido,email,telefono){
	cadena="nombre="+nombre+
			"&apellido"+apellido+
			"&email"+email+
			"&telefono"+telefono;


			$.ajax({

				type:"POST",
				url:"php/agregarDatos.php",
				data:cadena,
				success:function(r){
					if (r==1) {
						$('#tabla').load('componentes/tabla.php');
						alerty.success("Agregado con exito");
					}else{
						alertify.error("Fallo servidor");
						}
					}
			});
}
function preguntarSiNo(id){
	alertify.confirm('Eliminar Registro', '¿Eliminar Registro?', function(){ alertify.success('Ok') }
                , function(){ alertify.error('Cancelar')});

}

function{
	cadena="id"+id;


			$.ajax({

				type:"POST",
				url:"php/eliminarDatos.php",
				data:cadena,
				success:function(r){
					if (r==1) {
						$('#tabla').load('componentes/tabla.php');
						alerty.success("Eliminado con exito");
					}else{
						alertify.error("Fallo servidor");
						}
					}
			});
}

function agregarform(datos){
	//alert(datos);
	d=datos.split('||')

	$('#idpersona').val(d[0]);
	$('#nombreu').val(d[1]);
	$('#apellidou').val(d[2]);
	$('#emailu').val(d[3]);
	$('#telefonou').val(d[4]);
}


function actualizaDatos(){


	id=$('#idpersona').val();
	nombre=$('#nombreu').val();
	apellido=$('#apellidou').val();
	email=$('#emailu').val();
	telefono=$('#telefonou').val();

	cadena=	"id="+id+
			"$nombre="+nombre+
			"&apellido"+apellido+
			"&email"+email+
			"&telefono"+telefono;


			$.ajax({

				type:"POST",
				url:"php/actualizaDatos.php",
				data:cadena,
				success:function(r){
					if (r==1) {
						$('#tabla').load('componentes/tabla.php');
						alerty.success("Actualizado con exito");
					}else{
						alertify.error("Fallo servidor");
						}
					}
			});
}