window.onload = function() {
    document.getElementById('valor').value = '';
    document.getElementById('base').value = '';
    document.getElementById('convertido_2').value = '';
    document.getElementById('convertido_5').value = '';
    document.getElementById('convertido_8').value = '';
    document.getElementById('convertido_10').value = '';
    document.getElementById('convertido_16').value = '';
}

document.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        calcularConversao();
    }
})

function calcularConversao() {
    
    const capturaValorInput = document.getElementById('valor').value; 
    
    const capturaBaseInput = document.getElementById('base').value; 
    
    const transformaEmArray = capturaValorInput.split('').reverse(); 
    
    
    function conversorBase10() {
        
        let resultadoBase10 = 0
        
        for(let i = 0; i < transformaEmArray.length; i++) {

            const converterBase10 = transformaEmArray[i] * (capturaBaseInput ** i);

            resultadoBase10 += converterBase10;
            console.log(resultadoBase10)

            document.getElementById('convertido_10').value = resultadoBase10;
            
            
        }
    };

    function conversorBase2() {
        const dividendoBase10 = document.getElementById('convertido_10').value
        const divisor = 2;
        let quociente = dividendoBase10;
        let restos = [];

        while(quociente !== 0) {
            let restoDivisao = quociente % divisor;

            restos.push(restoDivisao);
            quociente = Math.floor(quociente / divisor);
        }

        restos.reverse();
        const ajustaResultado = restos.join('')
        
        document.getElementById('convertido_2').value = ajustaResultado;

    };
    
    function conversorBase5() {
        const dividendoBase10 = document.getElementById('convertido_10').value
        const divisor = 5;
        let quociente = dividendoBase10;
        let restos = [];

        while(quociente !== 0) {
            let restoDivisao = quociente % divisor;

            restos.push(restoDivisao);
            quociente = Math.floor(quociente / divisor);
        }

        restos.reverse();
        const ajustaResultado = restos.join('')
        
        document.getElementById('convertido_5').value = ajustaResultado;

    };

    function conversorBase8() {
        const dividendoBase10 = document.getElementById('convertido_10').value
        const divisor = 8;
        let quociente = dividendoBase10;
        let restos = [];

        while(quociente !== 0) {
            let restoDivisao = quociente % divisor;

            restos.push(restoDivisao);
            quociente = Math.floor(quociente / divisor);
        }

        restos.reverse();
        const ajustaResultado = restos.join('')
        
        document.getElementById('convertido_8').value = ajustaResultado;

    };

    function conversorBase16() {
        const dividendoBase10 = document.getElementById('convertido_10').value
        const divisor = 16;
        let quociente = dividendoBase10;
        let restos = [];

        while(quociente !== 0) {
            let restoDivisao = quociente % divisor;

            if(restoDivisao >= 10 && restoDivisao <= 15) {
                restos.push(String.fromCharCode(55 + restoDivisao));
            } else {
                restos.push(restoDivisao);
            }

            quociente = Math.floor(quociente / divisor);

        }

        restos.reverse();
        const ajustaResultado = restos.join('')
        
        document.getElementById('convertido_16').value = ajustaResultado;
    }

    //^ - Inicio da String. Qualquer coisa inserida que não atenda aos parametros, será rejeitada; [0-9A-Fa-f] - Conjunto de caracteres que define os dígitos hexadecimais permitidos, de 0 a 9, de "A" a "F" e de "a" a "f"; + - Indica que o padrão definido anteriormente [0-9A-Fa-f] pode ocorrer uma ou mais vezes. Ou seja, a string deve conter pelo menos um dígito hexadecimal para ser considerada válida; $ - Indica o fim da string, garantindo que a expressão regular valide toda a string, e nao apenas uma parte dela.   

    if(/^[0-9A-Fa-f]+$/.test(capturaValorInput) && capturaBaseInput == 16) { 
        
        function criaMapeamentoLetrasParaNumeros() {
            return {
                'A': 10,
                'B': 11,
                'C': 12,
                'D': 13,
                'E': 14,
                'F': 15
            };
        }

        function substituiLetrasPorNumeros(array, mapeamento) {
            for(let i = 0; i < array.length; i++) {
                if (isNaN(array[i])) {
                    array[i] = mapeamento[array[i].toUpperCase()];
                }
            }

            return array; //[2, 1, 15, 10]

        }

        const converteLetrasParaNumeros = criaMapeamentoLetrasParaNumeros();
        substituiLetrasPorNumeros(transformaEmArray, converteLetrasParaNumeros);

        conversorBase10();
        conversorBase2();  
        conversorBase5();   
        conversorBase8();
        conversorBase16();

    } else if(/^\d+$/.test(capturaValorInput) && capturaBaseInput >= 10 && capturaBaseInput != 16) { // \d - representa qualquer digito decimal de 0 a 9
        conversorBase10();
        conversorBase2();                                 
        conversorBase5();                          
        conversorBase8();
        conversorBase16();

    } else if(/^\d+$/.test(capturaValorInput) && /^\d+$/.test(capturaBaseInput)) {
        // console.log('Outras bases')
        function verificaBaseValida() {
            for(let i = 0; i < transformaEmArray.length; i++) {
                if(transformaEmArray[i] < capturaBaseInput) {          
                    conversorBase10();                  
                    conversorBase2();                                 
                    conversorBase5();                          
                    conversorBase8();
                    conversorBase16();

                } else {
                    alert('A base não é válida');
                    document.getElementById('base').value = '';
                    document.getElementById('convertido_2').value = '';
                    document.getElementById('convertido_5').value = '';
                    document.getElementById('convertido_8').value = '';
                    document.getElementById('convertido_10').value = '';
                    document.getElementById('convertido_16').value = '';
                    return
                }
            }
        }
        verificaBaseValida();

    } else {
        alert('Insira valores aceitáveis!')
    }   

}
    