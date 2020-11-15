var viggenere = viggenere || (function(){

    var campo = function(txt, desp, action){
        var replace = (function(){
            var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                    'l','m','n','ñ','o','p','q','r','s','t','u',
                    'v','w','x','y','z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        pos += desp;
                        pos = (pos >= l) ? pos-l : pos;                                
                    }else{
                        pos -= desp;
                        pos = (pos < 0) ? l+pos : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        var re = (/([a-z-ñÑ])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        encode : function(txt, desp){
            return campo(txt, desp, true);
        },

        decode : function(txt, desp){
            return campo(txt, desp, false);
        }
    };
})();

function codificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = Clave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.encode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}

function decodificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = Clave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.decode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}

function Clave(reco) {
    var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                'l','m','n','ñ','o','p','q','r','s','t','u',
                'v','w','x','y','z'];
    return abc.indexOf(reco.toLowerCase());
}

function camposVacios(){
    var cadena = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (cadena == "") {
        alert(" Texto vacio");
    }if (clave == "") {
        alert("Clave vacia")
    }
}

function validarC() {
    camposVacios();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (clave.length > texto.length) {
        alert("clave es más larga que el texto :,3");
    }else{
        codificar(texto, clave);
    }
}

function validarD() {
    camposVacios();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("posicionamiento").value;
    if (clave.length > texto.length) {
        alert("clave es más larga que el texto :<");
    }else{
        decodificar(texto, clave);
    }
}

function reiniciar(){
    document.getElementById("cadena").value = "";
    document.getElementById("posicionamiento").value = "";
    document.getElementById("res").innerText = "";
}
